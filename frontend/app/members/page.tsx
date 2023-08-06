import PurpleMember from "@/components/Member/PurpleMember";
import { getMembers } from "@/lib/utils";

export default async function Members() {
  const members = await getMembers();

  return (
    <div className="page">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          paddingTop: 100,
        }}
      >
        {members.filter(Boolean).map((member, index) => {
          return member ? <PurpleMember key={index} member={member} /> : null;
        })}
      </div>
    </div>
  );
}
