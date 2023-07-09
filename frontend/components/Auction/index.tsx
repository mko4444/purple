import { arrowLeft, arrowRight } from "@/svg";
import day from "lib/day";
import { auctionAbi as abi } from "data/contract/abis";
import { useContractRead } from "wagmi";
import { useCountdown } from "@/hooks/useCountdown";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/Badge";
import { londrina } from "@/util/fonts";
import classNames from "classnames";

export default function Auction({
  tokenId,
  isLastToken = false,
  endTime,
  onEnd = () => {},
}: {
  tokenId: string;
  isLastToken?: boolean;
  endTime: number;
  onEnd?: () => void;
}) {
  const { countdownString } = useCountdown(endTime, onEnd);
  return (
    <div className="auction">
      <div className="auction--grid">
        <div className="auction--token" />
        <div className="auction--info">
          <div className="auction--row">
            <Link href={`/${parseInt(tokenId, 10) - 1}`}>
              <button className="auction--nav-button">{arrowLeft}</button>
            </Link>
            <Link
              className={classNames({
                disabled: isLastToken,
              })}
              href={`/${parseInt(tokenId, 10) + 1}`}
            >
              <button className="auction--nav-button">{arrowRight}</button>
            </Link>
            <div />
            <label>{day().format("MMM Do, YYYY")}</label>
          </div>
          <h1 className="auction--title" style={londrina.style}>
            Purple #{tokenId}
          </h1>
          <div />
          <div />
          <div className="auction--row w-100">
            <div className="auction--col flex">
              <label>Current bid</label>
              <h4>Ξ 100</h4>
            </div>
            <div />
            <div />
            <div className="auction--divider" style={{ height: 52 }} />
            <div />
            <div />
            <div className="auction--col flex">
              <label>Auction ends in</label>
              <h4>{countdownString ?? "---"}</h4>
            </div>
          </div>
          <div />
          <div />
          <div className="auction--row w-100">
            <input className="auction--input" placeholder="1" />
            <button className="auction--bid-button">Place Bid</button>
          </div>
          <div />
          <div className="auction--col w-100" style={{ gap: ".33rem" }}>
            <div className="auction--bid">
              <Image height={24} width={24} src="/placeholder.png" alt="user" style={{ borderRadius: 100 }} />
              <span>Matthew</span>
              <label>@matthew</label>
              <Badge>⨉ 5</Badge>
              <div className="flex" />
              <b>
                <span>Ξ 1</span>
              </b>
            </div>
            <div className="auction--divider vertical" />
            <div className="auction--bid">
              <Image height={24} width={24} src="/placeholder.png" alt="user" style={{ borderRadius: 100 }} />
              <span>Kevin</span>
              <label>@kevinoconnell</label>
              <Badge>⨉ 3</Badge>
              <div className="flex" />
              <b>
                <span>Ξ .5</span>
              </b>
            </div>
            <div className="auction--divider vertical" />
            <div className="auction--bid">
              <Image height={24} width={24} src="/placeholder.png" alt="user" style={{ borderRadius: 100 }} />
              <span>Chris</span>
              <label>@ccarella</label>
              <Badge>⨉ 17</Badge>
              <div className="flex" />
              <b>
                <span>Ξ .33</span>
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
