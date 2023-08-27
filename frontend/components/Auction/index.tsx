"use client";

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
import LoadingIndicator from "../LoadingIndicator.tsx";
import dayjs from "lib/day";

export default function Auction({ tokenId }: { tokenId?: number }) {
  const [dialogOpen] = useState<boolean>(false);
  const { auction, isValidating, decrementToken, incrementToken } = useAuctionData(tokenId);
  const { isConnected } = useAccount();
  const endTime = auction?.endTime;
  const { countdownString, isEnded } = useCountdown(endTime, () => {});
  const [currentBid, setCurrentBid] = useState<number>(0);

  const currentDay = dayjs()
    .day(23)
    .month(10)
    .year(2022)
    .add(auction?.tokenId ?? tokenId, "day");
  const todaysDate = dayjs();
  const isToday = dayjs(currentDay).format("MMM Do, YYYY") === dayjs(todaysDate).format("MMM Do, YYYY");

  return (
    <div className="auction">
      {!isValidating && auction ? (
        <div className="auction--grid">
          <div>
            <div className="auction--token" />
          </div>
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
                style={
                  isToday
                    ? {
                        pointerEvents: "none",
                        opacity: 0.5,
                      }
                    : {}
                }
              >
                {arrowRight}
              </button>
              <div />
              <label>{day(currentDay).format("MMM Do, YYYY")}</label>
            </div>
            <h1 className="auction--title" style={londrina.style}>
              Purple #{auction.tokenId ?? tokenId}
            </h1>
            <div />
            <div />
            <div className="auction--row w-100">
              <div className="auction--col flex">
                <label>Current bid</label>
                <h4>Ξ {auction ? auction.highestBid.amount : 0}</h4>
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
                onChange={(e: any) => {
                  console.log(e.target.value);
                  setCurrentBid(e.target.value);
                }}
                type="number"
                className="auction--input"
                placeholder="1"
              />
              <button
                disabled={isEnded}
                onClick={async () => {
                  console.log("bid", currentBid);
                }}
                className="auction--bid-button"
              >
                Place Bid
              </button>
            </div>
            <div />
            <div className="auction--col w-100" style={{ gap: ".33rem" }}>
              {auction ? (
                auction.bids.map((bid: any, i: number) => {
                  return (
                    <>
                      {i > 0 && <div key={`divider-${i}`} className="auction--divider vertical" />}
                      <div key={`bid-${i}`} className="auction--bid">
                        <Image
                          height={24}
                          width={24}
                          src={bid.user.pfp.url ?? "/placeholder.png"}
                          alt="user"
                          style={{ borderRadius: 100 }}
                        />
                        <span>{bid.user.displayName}</span>
                        {bid.user.username !== bid.user.displayName && <label>@{bid.user.username}</label>}
                        {bid.ownedTokens > 0 && <Badge>⨉ {bid.ownedTokens}</Badge>}
                        {isEnded && i === 0 && (
                          <Badge style={{ backgroundColor: "white", color: "#452a83" }}>Winner</Badge>
                        )}
                        <div className="flex" />
                        <b>
                          <span style={{ whiteSpace: "nowrap" }}>Ξ {bid.amount}</span>
                        </b>
                      </div>
                    </>
                  );
                })
              ) : (
                <p>{!isEnded ? "No bids yet!" : "There were no bids today."}</p>
              )}
            </div>
          </div>
        </div>
      ) : isValidating ? (
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
