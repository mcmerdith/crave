import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
    turbopack: {
        root: path.join(import.meta.dirname, "..")
    }
};

export default nextConfig;
