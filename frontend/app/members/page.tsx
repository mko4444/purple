import PurpleMember from "@/components/Member/PurpleMember";
import { getMembers } from "@/lib/utils";

export default async function Members() {
  const members = await getMembers();
  console.log(members);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          width: "40%",
        }}
      >
        {members.filter(Boolean).map((member, index) => {
          return member ? <PurpleMember key={index} member={member} /> : null;
        })}
      </div>
    </div>
  );
}
