import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    '/gallery': ['./public/images/**/*'],
  },
};

export default nextConfig;
