import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header--inner">
        <Link href="/" className="header--logo">
          <div />
          Purple
        </Link>
        <div className="row-c-c">
          <button>
            <label>Treasury</label>
            <span>
              {
                // TODO: Treasury balance
              }
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
