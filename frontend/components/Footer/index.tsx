import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <Link target="_blank" href="https://warpcast.com/purple">
        Farcaster
      </Link>
      <Link target="_blank" href="https://www.alphacaster.xyz/feed/purple-publicgoods">
        Alphacaster
      </Link>
      <Link target="_blank" href="https://eventcaster.xyz/communities/purple">
        Eventcaster
      </Link>
    </footer>
  );
}
