"use client";

import { useRouter } from "next/navigation";
import { getAuction } from "@/lib/utils";
import useSWR from "swr";

export const useAuctionData = (tokenId?: number) => {
  const { push } = useRouter();
  // get the auction data
  const { data: auction, isValidating } = useSWR(`/auction/${tokenId}`, () => getAuction(tokenId), {
    refreshInterval: 5000,
  });
  // define increment function
  const incrementToken = () =>
    tokenId && auction?.lastTokenId > tokenId && push(`/${parseInt(auction?.tokenId, 10) + 1}`);
  const decrementToken = () => tokenId && tokenId > 0 && push(`/${parseInt(auction?.tokenId) - 1}`);
  // return the auction data
  return {
    auction,
    incrementToken,
    decrementToken,
    isValidating,
  };
};
