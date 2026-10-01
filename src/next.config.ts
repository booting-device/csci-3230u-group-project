import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Tells Next.js to generate static HTML/CSS/JS assets
  trailingSlash: true, // Optional: Ensures clean URL mapping on static hosts
};

export default nextConfig;
