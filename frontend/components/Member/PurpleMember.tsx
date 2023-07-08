"use client";
import React from "react";
import Image from "next/image";

type PurpleMemberProps = {
  member: any;
};

const PurpleMember: React.FC<PurpleMemberProps> = ({ member }) => {
  return (
    <button
      onClick={() => {
        window.open(`https://www.warpcast.com/${member.username}`, "_blank");
      }}
      style={{ maxWidth: "200px" }}
    >
      <Image
        alt={member.username}
        src={member.pfp?.url}
        height={36}
        width={36}
        style={{ borderRadius: 100 }}
      />
      <div>{member.username}</div>
    </button>
  );
};

export default PurpleMember;
