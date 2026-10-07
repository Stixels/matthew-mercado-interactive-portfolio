import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**", // This allows any path under the hostname
      },
    ],
  },
  output: "standalone",
  transpilePackages: ["motion"],
  // Retired pages: send any old links to their homepage equivalents.
  async redirects() {
    return [
      { source: "/hub", destination: "/", permanent: true },
      { source: "/projects/contact", destination: "/#about", permanent: true },
      { source: "/puzzles/:id*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
