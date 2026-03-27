/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "itsrajaniket.github.io",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ── Fix cross-origin warning when accessing via network IP ─────────────
  // Add your local network IP here if accessing from another device
  // allowedDevOrigins: ["http://10.73.23.61:3000"],

  async headers() {
    return [
      {
        source: "/content/pdfs/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self';" },
        ],
      },
    ];
  },
  // Removed custom headers to let framework defaults/middleware handle security.
};

export default nextConfig;
