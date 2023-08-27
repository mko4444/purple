import { arrowLeft, arrowRight } from "@/svg";
import day from "lib/day";

import { useAccount, useConnect, useContractWrite } from "wagmi";
import { useCountdown } from "@/hooks/useCountdown";

import Image from "next/image";
import Badge from "@/components/Badge";
import { londrina } from "@/util/fonts";

import { useAuctionData } from "@/hooks/useAuctionData";
import { useEffect, useState } from "react";

import Dialog from "../Dialog";
import { ConnectKitButton } from "connectkit";
import { utils } from "ethers";
import LoadingIndicator from "../LoadingIndicator.tsx";
import {
  createBid,
  settleCurrentAndCreateNewAuction,
} from "@/lib/builderDAOMethods";

export default function Auction({}: {}) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [auctionData, currentToken, loading, incrementToken, decrementToken] =
    useAuctionData();

  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const [endTime, setEndTime] = useState<number>(0);
  const { countdownString, isEnded } = useCountdown(endTime, () => {});
  const [currentBid, setCurrentBid] = useState<number>(0);

  useEffect(() => {
    if (currentToken && currentToken.auction) {
      setEndTime(parseInt(currentToken.auction.endTime, 10));
    }
  }, [currentToken]);

  return (
    <div className="auction">
      {!loading && currentToken ? (
        <div className="auction--grid">
          <div className="auction--token" />
          <div className="auction--info">
            <div className="auction--row">
              <button
                onClick={() => {
                  decrementToken();
                }}
                className="auction--nav-button"
              >
                {arrowLeft}
              </button>

              <button
                onClick={() => {
                  incrementToken();
                }}
                className="auction--nav-button"
              >
                {arrowRight}
              </button>

              <div />
              <label>{day().format("MMM Do, YYYY")}</label>
            </div>
            <h1 className="auction--title" style={londrina.style}>
              Purple #{currentToken.tokenId}
            </h1>
            <div />
            <div />
            <div className="auction--row w-100">
              <div className="auction--col flex">
                <label>Current bid</label>
                <h4>
                  Ξ{" "}
                  {currentToken.auction
                    ? currentToken.auction.highestBid.amount
                    : 0}
                </h4>
              </div>
              <div />
              <div />
              <div className="auction--divider" style={{ height: 52 }} />
              <div />
              <div />
              <div className="auction--col flex">
                <label>Auction ends in</label>
                <h4>{isEnded ? "---" : countdownString}</h4>
              </div>
            </div>
            <div />
            <div />
            <div className="auction--row w-100">
              <input
                value={currentBid}
                onChange={(e) => {
                  console.log(e.target.value);
                  setCurrentBid(e.target.value);
                }}
                type="number"
                className="auction--input"
                placeholder="1"
              />
              <button
                disabled={
                  isEnded || !currentToken
                  //||
                  // (currentToken.auction &&
                  //   currentToken.auction.highestBid &&
                  //   currentToken.auction.highestBid.amount &&
                  //   currentBid <= currentToken.auction.highestBid.amount)
                }
                onClick={async () => {
                  console.log("bid", currentBid);
                  console.log("address", address);
                  console.log("tokenId", currentToken.tokenId);
                  if (!address) {
                    connect({ connector: connectors[0] });
                  } else {
                    if (false) {
                      const bid = await createBid(
                        address as string,
                        currentBid,
                        currentToken.tokenId
                      );
                      console.log("bid", bid);
                    } else {
                      const settle = await settleCurrentAndCreateNewAuction(
                        address as string
                      );
                      console.log("settle", settle);
                    }
                  }
                }}
                className="auction--bid-button"
              >
                Place Bid
              </button>
            </div>
            <div />
            <div className="auction--col w-100" style={{ gap: ".33rem" }}>
              {currentToken.auction ? (
                currentToken.auction.bids.map((bid: any) => {
                  return (
                    <div className="w-100">
                      <div className="auction--bid">
                        <Image
                          height={24}
                          width={24}
                          src={bid.username.pfp.url}
                          alt="user"
                          style={{ borderRadius: 100 }}
                        />
                        <span>{bid.username.displayName}</span>
                        <label>@{bid.username.username}</label>
                        <Badge>⨉ {bid.ownedTokens}</Badge>
                        <div className="flex" />
                        <b>
                          <span>Ξ {bid.amount}</span>
                        </b>
                      </div>
                      <div className="auction--divider vertical" />
                    </div>
                  );
                })
              ) : (
                <p>{!isEnded ? "No bids yet!" : "There were no bids today."}</p>
              )}
            </div>
          </div>
        </div>
      ) : loading ? (
        <LoadingIndicator />
      ) : null}
      {dialogOpen ? (
        <Dialog
          style={{
            height: 280,
            width: 280,
            borderRadius: "1rem",
            padding: "1rem",
          }}
          trigger="Connect Wallet"
          triggerClassName="filled"
          disabled={isConnected}
        >
          <ConnectKitButton />
        </Dialog>
      ) : null}
    </div>
  );
}
