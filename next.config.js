/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALCHEMY_ID: process.env.ALCHEMY_ID,
  },
};

module.exports = nextConfig;
