/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "standalone", // Enable standalone output for Docker deployment
  //output: "export", // tells Next.js to generate static HTML
};

export default nextConfig;
