import dayjs from "@/lib/day";
import { time } from "@/svg";
import classNames from "classnames";
export default function ProposalRowButton({ type, name, number, startDate, endDate }: ProposalRowItemProps) {
  return (
    <div className="proposal-row-item row-fs-c">
      <label
        style={{
          width: 54,
        }}
      >
        {number}
      </label>
      <span className="line-1">{name}</span>
      <div className="flex" />
      {type === "pending" && (
        <div className="proposal-row-item--status outline">
          {time} Starts in {dayjs(startDate).fromNow("days")}
        </div>
      )}
      <div
        className={classNames({
          "proposal-row-item--status": true,
          "proposal-row-item--status--pending": type === "pending",
          "proposal-row-item--status--canceled": type === "canceled",
          "proposal-row-item--status--queued": type === "queued",
          "proposal-row-item--status--defeated": type === "defeated",
          "proposal-row-item--status--executed": type === "executed",
        })}
      >
        {type}
      </div>
    </div>
  );
}

interface ProposalRowItemProps {
  type: "pending" | "canceled" | "queued" | "defeated" | "executed";
  name: string;
  number: number;
  startDate: number;
  endDate: number;
}
