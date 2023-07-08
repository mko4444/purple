import { arrowLeft, arrowRight } from "@/svg";
import dayjs from "lib/day";
import day from "lib/day";

export default function Page() {
  return (
    <div className="auction">
      <div className="auction--grid">
        <div className="auction--token" />
        <div className="auction--info">
          <div className="auction--row">
            <button className="auction--nav-button">{arrowLeft}</button>
            <button className="auction--nav-button">{arrowRight}</button>
            <div />
            <label>{day().format("MMM Do, YYYY")}</label>
          </div>
          <h1 className="auction--title">Purple #1</h1>
          <div />
          <div />
          <div className="auction--row">
            <div className="auction--col">
              <label>Current Bid</label>
              <h4>Ξ 100</h4>
            </div>
            <div />
            <div />
            <div className="auction--divider" style={{ height: 52 }} />
            <div />
            <div />
            <div className="auction--col">
              <label>Auction ends in</label>
              <h4>{dayjs().from(dayjs().subtract(2, "hours"))}</h4>
            </div>
          </div>
          <div />
          <div />
          <div className="auction--row">
            <input className="auction--input" placeholder="1" />
            <button className="auction--bid-button">Place Bid</button>
          </div>
        </div>
      </div>
    </div>
  );
}
