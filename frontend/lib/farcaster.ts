import { MerkleAPIClient } from "@standard-crypto/farcaster-js";

export function generateClient(secret: string) {
  const client = new MerkleAPIClient({ secret });
  return client;
}

export default generateClient;
