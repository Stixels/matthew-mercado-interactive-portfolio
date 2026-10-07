import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output: "standalone",
  transpilePackages: ["motion"],
  // Retired pages: send any old links to their homepage equivalents.
  async redirects() {
    return [
      { source: "/hub", destination: "/", permanent: true },
      { source: "/projects/contact", destination: "/#about", permanent: true },
      {
        source: "/projects/:id(escape-this-frederick|level-up-vr)",
        destination: "/projects/web-design",
        permanent: true,
      },
      { source: "/puzzles/:id*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
