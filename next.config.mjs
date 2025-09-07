// Remove static import of 'path' and use dynamic import in webpack function
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build optimizations (swcMinify is default in Next.js 15)
  poweredByHeader: false,

  // Compression and performance
  compress: true,
  generateEtags: true,

  // ESLint and TypeScript settings
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    unoptimized: false, // Enable optimization for better performance
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
  },

  // Experimental features for better performance
  experimental: {
    webpackMemoryOptimizations: true,
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*", // forward to an API route
      },
    ];
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=30",
          },
        ],
      },
      {
        source: "/(.*\\.(?:jpg|jpeg|png|webp|avif|svg|gif))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // URL rewrites

  // Conditionally set output based on environment
  ...(process.env.NODE_ENV === "production" &&
  process.env.STATIC_EXPORT === "true"
    ? {
        output: "export",
        trailingSlash: true,
        images: {
          unoptimized: true, // Required for static export
        },
      }
    : {}),

  webpack: async (config) => {
    const path = await import("path");
    config.resolve.alias["@"] = path.resolve(process.cwd());
    return config;
  },
};

export default nextConfig;
