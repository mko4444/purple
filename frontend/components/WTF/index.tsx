"use client";

import InfoSection from "@/components/InfoSection";
import { londrina } from "@/util/fonts";
import { useState } from "react";

export default function WTF() {
  const [openTab, setOpenTab] = useState<string | null>(null);

  return (
    <div className="page w-100 col" style={{ padding: "4rem 1rem", gap: ".5rem", maxWidth: 640 }}>
      <h1 style={londrina.style}>Wtf?</h1>
      <div />
      <span>
        Purple is a DAO whose goal is to proliferate and expand the Farcaster protocol and ecosystem. We will fund small
        grants via Prop House and larger on-chain proposals which proliferate Farcaster and/or build on top of the
        protocol.
      </span>
      <div />
      <div />
      <InfoSection title="How do I participate?" tabId="participate" openTab={openTab} setOpenTab={setOpenTab}>
        {[
          "There are two levels of participation: DAO Members & the Purple Community.",
          "You become a DAO Member by purchasing a Purple token at Auction. DAO members have a governance vote, can submit proposals, and can vote on Prop House grants.",
          "You are a Purple Community member if you join our Discord, build on the protocol, cast about the DAO or help propose, organize, and execute on small grants and proposals.",
          "Purple is a permissionless DAO – all you need to do is organize your squad and make something happen.",
        ].map((text: string, i: number) => (
          <>
            {i > 0 && <div />}
            <span>{text}</span>
          </>
        ))}
      </InfoSection>
      <InfoSection title="Summary" tabId="summary" openTab={openTab} setOpenTab={setOpenTab}>
        {[
          "Purples artwork is based on Farcaster purple.",
          "One Purple token is auctioned off every 24 hours, forever.",
          "100% of Purple auction proceeds are automatically sent to the Purple treasury.",
          "Purple uses a nouns.build, a protocol for building Nouns DAO forks.",
          "One Purple token is equal to one vote.",
          "The treasury is controlled exclusively by Purple token holders.",
          "PurpDAO.eth receive rewards in the form of Purple (10% of supply until 2050). More on this under “How does Founder Allocation work?” below.",
          "Farcaster.eth receives rewards in the form of Purple (10% of supply until 2050).",
          "NounsDAO receives rewards in the form of Purple (1% of supply until 2050).",
        ].map((text: string, i: number) => (
          <>
            {i > 0 && <div />}
            <li key={text}>
              <span>{text}</span>
            </li>
          </>
        ))}
      </InfoSection>
      <InfoSection title="How do auctions work?" tabId="auctions" openTab={openTab} setOpenTab={setOpenTab}>
        {[
          "Once the auction was started on October 25, 2022, it will run forever. A new Purple token is put up for auction every 24 hours.",
          "100% of auction sales go to the DAO Treasury and is governed by the community",
        ].map((text: string, i: number) => (
          <>
            {i > 0 && <div />}
            <span>{text}</span>
          </>
        ))}
      </InfoSection>
      <InfoSection title="How does founder allocation work?" tabId="founders" openTab={openTab} setOpenTab={setOpenTab}>
        {[
          "Allocation gives a custom % of tokens over a custom period of time to specified wallet addresses. In NounsDAO, this is 10% of tokens for 5 years (token 0,10,20 etc) for the DAO founders. In Purple, 10% of tokens until 2050 are allocated to Farcaster.eth and 1% is allocated to NounsDAO.",
          "Founder distributions don't interfere with the cadence of auctions. Tokens are sent directly to the founder multisig and auctions continue on schedule with the next available ID.",
        ].map((text: string, i: number) => (
          <>
            {i > 0 && <div />}
            <span>{text}</span>
          </>
        ))}
      </InfoSection>
      <InfoSection title="Governance Slow Start" tabId="governance" openTab={openTab} setOpenTab={setOpenTab}>
        {[
          "PurpDAO.eth have given themselves a special veto right to ensure that no malicious proposals can be passed while the Purple supply is low. This veto right will only be used if an obviously harmful governance proposal has been passed, and is intended as a last resort.",
          "Purple will revoke this veto right when they deem it safe to do so. This decision will be based on a healthy Purple distribution and a community that is engaged in the governance process.",
        ].map((text: string, i: number) => (
          <>
            {i > 0 && <div />}
            <span>{text}</span>
          </>
        ))}
      </InfoSection>
      <InfoSection
        title="What is the relationship between Farcaster & Purple"
        tabId="relationship"
        openTab={openTab}
        setOpenTab={setOpenTab}
      >
        {[
          "Purple is an independent ecosystem DAO. Our goal is to proliferate and expand the Farcaster protocol and ecosystem. Our treasury will be used to fund those kinds of projects. We have no governance rights to the Farcaster protocol or client.",
          "Merkle Manufactory is the company behind the Farcaster protocol and official client.",
          "We have (permissionlessly) allocated 10% of our token to farcaster.eth, which is owned by Merkle Manufactory, as a good stewards of both the Farcaster protocol and Purple.",
          "tldr; there is no official connection to the company that makes Farcaster, this is a permissionless builder DAO on top of an open protocol.",
        ].map((text: string, i: number) => (
          <>
            {i > 0 && <div />}
            <span>{text}</span>
          </>
        ))}
      </InfoSection>
    </div>
  );
}
