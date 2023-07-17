"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <div className="row-fs-c" style={{ gap: ".5rem", margin: "1rem 0", padding: "0 .66rem" }}>
      {["", "/proposals", "/casts", "/events"].map((path) => (
        <Link key={path} href={`/dao/${path}`}>
          <button
            className={classNames({
              filled: ("/dao" + path).toLowerCase() === pathname,
            })}
            style={{ textTransform: "capitalize" }}
          >
            {path === "" ? "Activity" : path.slice(1)}
          </button>
        </Link>
      ))}
    </div>
  );
}
