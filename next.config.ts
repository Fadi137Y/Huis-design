import type { NextConfig } from "next";

// Leeg op een eigen domein, "/Huis-design" op GitHub Pages.
// Wordt bij het publiceren automatisch ingevuld.
const basisPad = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // Statische export: de site kan zowel op Vercel als gratis op GitHub Pages draaien.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basisPad ? { basePath: basisPad, assetPrefix: basisPad } : {}),
};

export default nextConfig;
