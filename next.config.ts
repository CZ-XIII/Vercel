import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/names": ["./dev.db"],
    "/api/names/[id]": ["./dev.db"],
  },
};

export default nextConfig;
