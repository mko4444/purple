"use client";
import React from "react";
import Image from "next/image";
import Badge from "../Badge";

type PurpleMemberProps = {
  member: any;
};

const PurpleMember: React.FC<PurpleMemberProps> = ({ member }) => {
  console.log(member);
  return (
    member && (
      <button
        className="row-fs-c"
        onClick={() => {
          window.open(`https://www.warpcast.com/${member.username}`, "_blank");
        }}
        style={{ maxWidth: "200px" }}
      >
        <Image
          alt={member.farcaster.username}
          src={member.farcaster.pfp?.url}
          height={36}
          width={36}
          style={{ borderRadius: 100 }}
        />
        <div>{member.farcaster.username}</div>
        <Badge>⨉ {member.daoTokenCount}</Badge>
      </button>
    )
  );
};

export default PurpleMember;
