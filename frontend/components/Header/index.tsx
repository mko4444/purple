"use client";
import Link from "next/link";
import SignInButton from "../SignInButton";
import { useBalance } from "wagmi";
import { treasuryAddress } from "@/lib/consts";
import { utils } from "ethers";
import { useState, useEffect } from "react";

export default function Header() {
  const { data } = useBalance({ address: treasuryAddress });
  const [balance, setBalance] = useState("0");
  useEffect(() => {
    if (data) {
      let numStr = utils.formatUnits(data.value, data.decimals);

      // Parse the number string to a JavaScript number
      let num = parseFloat(numStr);
      let roundedNum = num.toFixed(3);
      setBalance(roundedNum);
    }
  }, [data]);

  return (
    <header className="header">
      <div className="header--inner">
        <div className="header--row">
          <Link href="/" className="header--logo">
            <div />
            Purple
          </Link>
          <div />
          <div />
          <button
            onClick={() => {
              window.open(
                `https://etherscan.io/address/0xeB5977F7630035fe3b28f11F9Cb5be9F01A9557D`,
                "_blank"
              );
            }}
          >
            <label>Treasury</label>
            <span>
              {balance} ETH
              {
                // TODO: Treasury balance
              }
            </span>
          </button>
        </div>
        <div className="header--row">
          {pages.map((page) => (
            <Link href={page.toLowerCase()}>
              <button>{page}</button>
            </Link>
          ))}
          <SignInButton />
        </div>
      </div>
    </header>
  );
}

const pages = ["DAO", "Members", "Discourse", "About"];
