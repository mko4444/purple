import { User } from "@standard-crypto/farcaster-js";
import { DAOAddress, nounsBuilderGraphURL } from "./consts";

import farcaster from "./farcaster";
import abbreviateAddress from "@/util/abbreviateAddress";
import { BigNumber, utils } from "ethers";

interface FarcasterUser {
  id: string;
  address: string;
  daoTokenCount: number;
}

export const tap = async <T>(value: T, cb: (value: T) => Promise<unknown>): Promise<T> => {
  await cb(value);
  return value;
};

export const getMembers = async (): Promise<(User | undefined)[]> => {
  const members = await getPurpleMembers();
  return await Promise.all(
    members.map(async (member: any) => {
      let farcasterUser = null;

      farcasterUser = await farcaster.lookupUserByVerification(member.address);
      if (!farcasterUser) {
        let username = member.address;

        const ens = await getEns(member.address);

        if (ens?.ens) {
          farcasterUser = {
            username: ens?.ens,
            pfp: { url: ens?.avatar },
          };
        }

        if (username.length > 10) {
          username = abbreviateAddress(username);
        }
        farcasterUser = {
          username,
          pfp: { url: "/placeholder.png" },
        };
      }
      return {
        ...member,
        farcaster: farcasterUser,
      };
    })
  );
};

export const getEns = async (address: `0x${string}`) => {
  return fetch(`https://ensdata.net/${address.toLowerCase()}`).then((res) => res.json());
};

type Bid = {
  amount: string;
  bidTime: string;
  bidder: `0x${string}`;
  id: `${string}:${string}`;
  user?: any;
  ownedTokens?: number;
};

export const getAuction = async (tokenId?: number) => {
  const body = JSON.stringify({ query: query(tokenId) });
  // call the subgraph
  const auctions = await fetch(nounsBuilderGraphURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((r) => r.json());

  // parse the data
  const { auction, ...data } = auctions?.data?.dao?.tokens?.[0] ?? null;
  const owners = auctions?.data?.dao?.owners ?? null;
  const lastTokenId = parseInt(auctions?.data?.dao?.lastToken?.[0]?.tokenId, 10) ?? null;
  // if there is no auction, return null
  if (!auction) return null;
  // format the bids
  const bids = await Promise.all(auction.bids.map((b: Bid) => getBid(b, owners)));
  // format the highest bid
  const highestBid = await getBid(auction.highestBid, owners);
  // return the auction data

  return {
    ...data,
    ...auction,
    bids,
    highestBid,
    owners,
    lastTokenId,
  };
};

async function getBid(bid: Bid, owners: string[]) {
  // get the bid amount
  let bidAmount = BigNumber.from(bid.amount);
  // format the bid amount
  bid.amount = utils.formatEther(bidAmount);
  // get the number of owned tokens
  const ownedTokens = getNumberOfOwnedTokens(bid.bidder.toLowerCase(), owners);
  // add the number of owned tokens to the bid
  bid.ownedTokens = ownedTokens;
  // get the user data for the bidder
  const user = await farcaster.lookupUserByVerification(bid.bidder);
  // add the user data to the bid
  if (user) {
    bid.user = user;
  } else {
    // if no farcaster user found, try to get ens data
    const ens = await getEns(bid.bidder);
    // if ens data found, use it
    if (ens?.ens) {
      bid.user = {
        username: ens?.ens,
        pfp: { url: ens?.avatar },
      };
    } else {
      // if no ens data found, use the bidder address
      let bidderUsername = abbreviateAddress(bid.bidder);
      bid.user = {
        pfp: { url: "/placeholder.png" },
        username: bidderUsername,
        displayName: bidderUsername,
      };
    }
  }
  // return the bid
  return bid;
}

export const getPurpleMembers = async (): Promise<FarcasterUser[]> => {
  try {
    const query = `{
      dao(id: "${DAOAddress}") {
        owners(orderBy: daoTokenCount, orderDirection: desc) {
          id
          daoTokenCount
        }
      }
      }`;
    const response = await fetch(nounsBuilderGraphURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    let owners = [] as FarcasterUser[];
    try {
      owners = data.data.dao.owners;
      owners = owners.map((owner: any) => {
        //format is DAOAddress:ownerAddress
        const address = getGraphOwnerAddress(owner.id);
        return { ...owner, address };
      });
      return owners;
    } catch (e) {
      console.log("error", e);
      return owners;
    }
  } catch (error) {
    console.error("Error:", error);
    return [] as FarcasterUser[];
  }
};
/*
@param owner: string
@return string
Takes in the format of a DAO owner address and returns the owner address, which is the second part of the string after :
*/
export const getGraphOwnerAddress = (owner: string) => {
  //format is DAOAddress:ownerAddress
  return owner.split(":")[1].toLowerCase();
};

/*
@param owner: string
//TODO make type for owner
@param owners: any
@return number
Takes in an address and returns how many tokens they own
*/
export const getNumberOfOwnedTokens = (owner: string, owners: any[]): number => {
  let ownedTokens = 0;
  const ownerIndex = owners.findIndex((o) => getGraphOwnerAddress(o.id) === owner);
  if (ownerIndex !== -1) {
    ownedTokens = owners[ownerIndex].daoTokenCount;
  }
  return ownedTokens;
};

const query = (tokenId?: number) => `
{
  dao(id: "${DAOAddress}") {
    id
    owners(orderBy: daoTokenCount, orderDirection: desc) {
      id
      daoTokenCount
    }
    lastToken: tokens(first: 1, orderDirection: desc, orderBy: tokenId) {
      tokenId
    }
    tokens(${
      tokenId ? `where: {tokenId: ${tokenId ?? undefined}}` : `first: 1, orderDirection: desc, orderBy: tokenId`
    }) {
      tokenId 
      id
      name
      image
      auction {
        id
        highestBid {
          id
          bidder
          bidTime
          amount
        }
        startTime
        settled
        endTime
        bids(orderBy: amount, orderDirection: desc) {
          id
          bidder
          amount
          bidTime
        }
      }
    }
  }
}
`;
