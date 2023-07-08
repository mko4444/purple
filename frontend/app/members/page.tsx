import { getMembers } from "@/lib/utils";

export default async function Members() {
  const member = await getMembers();
  return (
    <div className="page">
      <h1>Members</h1>
    </div>
  );
}
