import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statische export: de site kan zowel op Vercel als gratis op GitHub Pages draaien.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
