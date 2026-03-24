import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['recharts', 'react-is'],
};

export default nextConfig;
