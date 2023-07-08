import { User } from "@standard-crypto/farcaster-js";
import { purpleNFTTokenAddress } from "./consts";
export const tap = async <T>(
  value: T,
  cb: (value: T) => Promise<unknown>
): Promise<T> => {
  await cb(value);
  return value;
};

export const getMembers = async (
  client: any
): Promise<(User | undefined)[]> => {
  const members = await getPurpleMembers();
  return await Promise.all(members.map(client.lookupUserByVerification));
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
