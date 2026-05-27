const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/vendor-ecosystem.html", destination: "/vendor-ecosystem", permanent: true },
      { source: "/solutions.html", destination: "/solutions", permanent: true },
      { source: "/team.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/submit-project.html", destination: "/submit-project", permanent: true },
      { source: "/apply-as-vendor.html", destination: "/apply-as-vendor", permanent: true },
      { source: "/arcade.html", destination: "/arcade", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/vendors/:slug/index.html", destination: "/vendors/:slug", permanent: true },
      { source: "/blog/:slug/index.html", destination: "/blog/:slug", permanent: true }
    ];
  }
};

module.exports = nextConfig;
