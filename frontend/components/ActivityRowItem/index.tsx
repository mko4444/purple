import dayjs from "@/lib/day";
import { bought, proposed, sold, voted } from "@/svg";

export default function ActivityRowItem({ type, name, item, timestamp }: ActivityRowItemProps) {
  const boughtText = ` bought Purple `;
  const soldText = ` sold Purple `;
  const votedText = ` voted on proposal `;
  const proposedText = ` made a new proposal `;

  return (
    <div className="activity-row-item row-fs-c">
      <div className="activity-row-item--icon">
        {type === "bought" ? bought : type === "sold" ? sold : type === "voted" ? voted : proposed}
      </div>
      <div className="activity-row-item--text">
        <span className="line-1">
          <span>{name}</span>
          <label>
            {type === "bought" ? boughtText : type === "sold" ? soldText : type === "voted" ? votedText : proposedText}
          </label>
          <span>#{item}</span>
        </span>
        <label>{dayjs(timestamp).fromNow()}</label>
      </div>
    </div>
  );
}

interface ActivityRowItemProps {
  type: "bought" | "sold" | "voted" | "proposed";
  name: string;
  item: number;
  timestamp: number;
}
