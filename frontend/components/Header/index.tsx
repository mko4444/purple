import Link from "next/link";
import SignInButton from "../SignInButton";

export default function Header() {
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
          <button>
            <label>Treasury</label>
            <span>
              1,000 ETH
              {
                // TODO: Treasury balance
              }
            </span>
          </button>
        </div>
        <div className="header--row">
          {pages.map((page) => (
            <Link href={page}>
              <button>{page}</button>
            </Link>
          ))}
          <SignInButton />
        </div>
      </div>
    </header>
  );
}

const pages = ["proposals", "members", "discourse", "about"];
