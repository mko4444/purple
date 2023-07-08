import { User } from "@standard-crypto/farcaster-js";
import { purpleNFTTokenAddress } from "./consts";
import farcaster from "./farcaster";

export const tap = async <T>(
  value: T,
  cb: (value: T) => Promise<unknown>
): Promise<T> => {
  await cb(value);
  return value;
};

export const getMembers = async (): Promise<(User | undefined)[]> => {
  const members = await getPurpleMembers();
  return await Promise.all(
    members.map(async (member: string) => {
      return await farcaster.lookupUserByVerification(member);
    })
  );
};

export const getPurpleMembers = async () => {
  try {
    const response = await fetch(
      `https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API}/getOwnersForContract?contractAddress=${purpleNFTTokenAddress}&withTokenBalances=false`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error:", response.statusText);
      return [];
    }

    const data = await response.json();

    return data.owners;
  } catch (error) {
    console.error("Error:", error);
  }
};
