"use client";
import React from "react";
import Image from "next/image";
import Badge from "../Badge";
import Link from "next/link";

type PurpleMemberProps = {
  member: any;
};

const PurpleMember: React.FC<PurpleMemberProps> = ({ member }) => {
  const username = member.farcaster.username;
  const hasFCUser = !username.startsWith("0x");

  return (
    member && (
      <Link
        className="w-100"
        href={hasFCUser ? `https://warpcast.com/${username}` : `https://etherscan.io/address/${member.address}`}
      >
        <button className="row-fs-c w-100">
          <Image
            alt={member.farcaster.username}
            src={member.farcaster.pfp?.url}
            height={36}
            width={36}
            style={{ borderRadius: 100 }}
          />
          <div className="flex line-1" style={{ textAlign: "left" }}>
            {member.farcaster.username}
          </div>
          <Badge>⨉ {member.daoTokenCount}</Badge>
        </button>
      </Link>
    )
  );
};

export default PurpleMember;
