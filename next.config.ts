import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wdxgcnz08a.ufs.sh"
      }
    ]
  }
};

export default nextConfig;
