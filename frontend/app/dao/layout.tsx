import { londrina } from "@/util/fonts";
import Nav from "./nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-100" style={{ maxWidth: 840 }}>
      <div style={{ height: 100 }} />
      <div className="w-100 row-sb-c" style={{ padding: "0 .66rem" }}>
        <h1 style={londrina.style}>DAO</h1>
        <button className="filled">New Proposal</button>
      </div>
      <Nav />
      <div style={{ height: "1rem" }} />
      {children}
      <div style={{ height: 1000 }} />
    </section>
  );
}
