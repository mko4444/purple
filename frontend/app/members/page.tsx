import PurpleMember from "@/components/Member/PurpleMember";
import { getMembers } from "@/lib/utils";
import { londrina } from "@/util/fonts";

export default async function Members() {
  const members = await getMembers();

  return (
    <div className="members">
      <h1 style={londrina.style}>Members</h1>
      <div className="members--grid">
        {members.filter(Boolean).map((member, index) => {
          return member ? <PurpleMember key={index} member={member} /> : null;
        })}
      </div>
    </div>
  );
}
