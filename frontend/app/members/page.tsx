import { getMembers } from "@/lib/utils";

export default async function Members() {
  const member = await getMembers();
  return <div>members! {member.length}</div>;
}
