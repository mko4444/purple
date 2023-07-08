import axios from "axios";

import { User } from "@standard-crypto/farcaster-js";
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
    const response = await axios({
      method: "get",
      url: `https://eth-mainnet.g.alchemy.com/nft/v3/${
        process.env.NEXT_PUBLIC_ALCHEMY_API as string
      }/getOwnersForContract`,
      params: {
        contractAddress: "0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60",
        withTokenBalances: false,
      },
      headers: {
        accept: "application/json",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
