import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: '.next',
  images: {
    unoptimized: true,
  },
  // Disable features not supported on Cloudflare Pages
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
