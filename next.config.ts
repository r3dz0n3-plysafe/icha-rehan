import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "icha-rehan";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

