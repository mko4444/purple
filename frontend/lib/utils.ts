import { User } from "@standard-crypto/farcaster-js";
import { DAOAddress, nounsBuilderGraphURL } from "./consts";

import farcaster from "./farcaster";
import abbreviateAddress from "@/util/abbreviateAddress";

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

export const getAuction = async () => {
  const query = `{
      dao(id: "${DAOAddress}") {
        id
        owners(orderBy: daoTokenCount, orderDirection: desc) {
          id
          daoTokenCount
        }
        tokens(orderBy: tokenId, orderDirection: desc, first: 10) {
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
      }`;
  const res = await fetch(nounsBuilderGraphURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const auctions = await res.json();

  if (!auctions || !auctions.data || !auctions.data.dao) return [];

  const token = auctions.data.dao.tokens;

  return { tokens: token, owners: auctions.data.dao.owners };
};

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
