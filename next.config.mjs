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
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*", // proxy to API
      },
    ];
  },

  // Conditionally set output based on environment
  ...(process.env.NODE_ENV === "production" &&
  process.env.STATIC_EXPORT === "true"
    ? { output: "export" }
    : {}),
};

export default nextConfig;
