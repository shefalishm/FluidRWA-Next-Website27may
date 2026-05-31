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
      { source: "/vendor-ecosystem.html", destination: "/web3vendorecosystem", permanent: true },
      { source: "/vendor-ecosystem", destination: "/web3vendorecosystem", permanent: true },
      { source: "/solutions.html", destination: "/solutions", permanent: true },
      { source: "/team.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/submit-project.html", destination: "/submit-requirement", permanent: true },
      { source: "/submit-project", destination: "/submit-requirement", permanent: true },
      { source: "/apply-as-vendor.html", destination: "/apply-as-vendor", permanent: true },
      { source: "/arcade.html", destination: "/arcade", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/vendors/legal-regulatory", destination: "/vendors/legal-regulatory-vendors", permanent: true },
      { source: "/vendors/kyc-aml", destination: "/vendors/kyc-aml-providers", permanent: true },
      { source: "/vendors/smart-contract-development", destination: "/vendors/smart-contract-development-companies", permanent: true },
      { source: "/vendors/ai-infrastructure", destination: "/vendors/ai-infrastructure-providers", permanent: true },
      { source: "/vendors/custody-solutions", destination: "/vendors/crypto-custody-providers", permanent: true },
      { source: "/vendors/fiat-on-off-ramps", destination: "/vendors/fiat-on-off-ramp-providers", permanent: true },
      { source: "/vendors/compliance-infrastructure", destination: "/vendors/compliance-infrastructure-providers", permanent: true },
      { source: "/vendors/defi-infrastructure", destination: "/vendors/defi-infrastructure-providers", permanent: true },
      { source: "/vendors/payments-stablecoins", destination: "/vendors/stablecoin-infrastructure-providers", permanent: true },
      { source: "/vendors/security-audits", destination: "/vendors/security-audit-companies", permanent: true },
      { source: "/vendors/growth-marketing", destination: "/vendors/growth-marketing-companies", permanent: true },
      { source: "/vendors/identity-solutions", destination: "/vendors/identity-solution-providers", permanent: true },
      { source: "/vendors/blockchain-development", destination: "/vendors/blockchain-development-companies", permanent: true },
      { source: "/vendors/:slug/index.html", destination: "/vendors/:slug", permanent: true },
      { source: "/blog/:slug/index.html", destination: "/blog/:slug", permanent: true }
      ,
      { source: "/submission-success", destination: "/", permanent: true },
      { source: "/lead-board", destination: "/", permanent: true },
      { source: "/unlocked-lead-detail", destination: "/", permanent: true },
      { source: "/service-category-a", destination: "/web3vendorecosystem", permanent: true },
      { source: "/service-category-b", destination: "/web3vendorecosystem", permanent: true },
      { source: "/service-category-c", destination: "/web3vendorecosystem", permanent: true },
      { source: "/groups", destination: "/", permanent: true },
      { source: "/product-page/:slug*", destination: "/", permanent: true },
      { source: "/post/:slug*", destination: "/blog", permanent: true }
    ];
  }
};

module.exports = nextConfig;
