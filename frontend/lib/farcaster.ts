import { MerkleAPIClient } from "@standard-crypto/farcaster-js";

export default new MerkleAPIClient({ secret: process.env.MERKLE_SECRET ?? "" });
