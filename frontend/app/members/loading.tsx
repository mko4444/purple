import Shimmer from "@/components/Shimmer";
import { londrina } from "@/util/fonts";

export default async function Members() {
  return (
    <div className="members">
      <h1 style={londrina.style}>Members</h1>
      <div className="members--grid">
        {["", "", "", "", "", "", "", "", ""].map(() => (
          <Shimmer height={52} />
        ))}
      </div>
    </div>
  );
}
