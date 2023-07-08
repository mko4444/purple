import { generateClient } from "@/lib/farcaster";
import { User } from "@standard-crypto/farcaster-js";

export async function getMembers(): Promise<(User | undefined)[]> {
  const client = generateClient("aisjadj9fj"); // TODO: get key from server
  const members: string[] = []; // TODO: get members from alchemy
  return Promise.all(members.map(client.lookupUserByVerification));
}

export default async function Members() {
  const member = await getMembers();
  return <div>members! {member.length}</div>;
}
