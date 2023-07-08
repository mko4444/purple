/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_ALCHEMY_API: process.env.NEXT_PUBLIC_ALCHEMY_API,
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
    MERKLE_SECRET: process.env.MERKLE_SECRET,
  },
  images: {
    domains: ["dl.airtable.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
