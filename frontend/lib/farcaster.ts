import farcaster from "@standard-crypto/farcaster-js";

export function generateClient(secret: string) {
  return new farcaster.MerkleAPIClient({ secret });
}

export default generateClient;
