import { useState, useEffect, useCallback } from "react";
import { auctionHouseContractAddress } from "@/lib/consts";
import { getAuction, getNumberOfOwnedTokens } from "@/lib/utils";
import farcaster from "./../lib/farcaster";
import { BigNumber, utils } from "ethers";
import abbreviateAddress from "@/util/abbreviateAddress";

export const useAuctionData = () => {
  //TODO add types
  const [auctionData, setAuctionData] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [currentToken, setCurrentToken] = useState(null as any);

  const findToken = () => {
    return auctionData.findIndex((token: any) => {
      return token.tokenId === currentToken.tokenId;
    });
  };
  const incrementToken = () => {
    if (currentToken === null) return;
    const curr = findToken();

    if (curr === 0) {
      setCurrentToken(auctionData[auctionData.length - 1]);
    } else {
      setCurrentToken(auctionData[curr - 1]);
    }
  };
  const decrementToken = () => {
    if (currentToken === null) return;
    const curr = findToken();
    if (curr === auctionData.length - 1) {
      setCurrentToken(auctionData[0]);
    } else {
      setCurrentToken(auctionData[curr + 1]);
    }
  };

  const fetchAuctionData = useCallback(async () => {
    setLoading(true);
    try {
      let purpleInfo = await getAuction();
      let tokens = purpleInfo.tokens;
      let owners = purpleInfo.owners;
      //convert bid amounts to eth
      tokens = await Promise.all(
        await tokens.map(async (token: any) => {
          if (!token.auction) return token;
          let auction = token.auction;

          try {
            if (auction.highestBid && auction.highestBid.amount) {
              let bid = BigNumber.from(auction.highestBid.amount);
              auction.highestBid.amount = utils.formatEther(bid);
              const ownedTokens = getNumberOfOwnedTokens(
                auction.highestBid.bidder.toLowerCase(),
                owners
              );
              auction.highestBid.ownedTokens = ownedTokens;
              try {
                auction.highestBid.username =
                  await farcaster.lookupUserByVerification(
                    auction.highestBid.bidder
                  );
                if (!auction.highestBid.username) {
                  let bidderUsername = abbreviateAddress(
                    auction.highestBid.bidder
                  );
                  auction.highestBid.username = {
                    pfp: { url: token.image },
                    username: bidderUsername,
                    displayName: bidderUsername,
                  };
                }
              } catch (e) {
                console.log("error", e);
                auction.highestBid.username = {
                  pfp: { url: token.image },
                  username: auction.highestBid.bidder,
                  displayName: auction.highestBid.bidder,
                };
              }
            }
            if (auction.bids) {
              auction.bids = await Promise.all(
                auction.bids.map(async (bid: any) => {
                  let bidAmount = BigNumber.from(bid.amount);
                  bid.amount = utils.formatEther(bidAmount);
                  const ownedTokens = getNumberOfOwnedTokens(
                    bid.bidder.toLowerCase(),
                    owners
                  );

                  bid.ownedTokens = ownedTokens;
                  try {
                    bid.username = await farcaster.lookupUserByVerification(
                      bid.bidder
                    );
                    if (!bid.username) {
                      let bidder = abbreviateAddress(bid.bidder);
                      bid.username = {
                        pfp: { url: token.image },
                        username: bidder,
                        displayName: bidder,
                      };
                    }
                  } catch (e) {
                    console.log("error", e);
                    bid.username = {
                      pfp: { url: token.image },
                      username: bid.bidder,
                      displayName: bid.bidder,
                    };
                  }
                  return bid;
                })
              );
            }
            return { ...token, auction: auction };
          } catch (e) {
            console.log("error", e);
            return token;
          }
        })
      );
      setAuctionData(tokens);
      const currentToken = tokens[0];

      setCurrentToken(currentToken);
      setLoading(false);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
    setLoading(false);
  }, [auctionHouseContractAddress]);

  useEffect(() => {
    fetchAuctionData();
  }, [fetchAuctionData]);

  return [auctionData, currentToken, loading, incrementToken, decrementToken];
};
