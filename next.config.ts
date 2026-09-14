import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Prevent Next.js from bundling swr through the react-server condition,
  // which breaks sanity's default import of useSWR in server context.
  serverExternalPackages: ["swr"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: "/margin-vs-markup-calculator",
        destination: "/margin-markup-converter",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // X-Frame-Options is handled in middleware (skips /studio which uses iframes)
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        source: "/(.*)\\.(png|jpg|jpeg|gif|ico|svg|webp|avif|woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
