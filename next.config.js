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
  async headers() {
    return [
      {
        source: "/vendor-membership",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet"
          }
        ]
      }
    ];
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
      { source: "/team", destination: "/about", permanent: true },
      { source: "/tools/tokenization-readiness-assessment", destination: "/tokenization-readiness-assessment-tool", permanent: true },
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
      // Preserve authority and citations earned by the previous Wix website.
      { source: "/legal-bison-crypto-licensing-regulatory-review", destination: "/vendors/legal-regulatory-vendors", permanent: true },
      { source: "/vetted-institutional-digital-asset-custody-providers", destination: "/vendors/crypto-custody-providers", permanent: true },
      { source: "/post/the-essential-guide-to-vetting-institutional-digital-asset-custodians-in-2026", destination: "/blog/choose-custody-provider-tokenized-assets", permanent: true },
      { source: "/vetted-smart-contract-auditing-security-firms", destination: "/vendors/security-audit-companies", permanent: true },
      { source: "/vetted-web-3-marketing-digital-asset-pr-agencies", destination: "/vendors/growth-marketing-companies", permanent: true },
      { source: "/vetted-web-3-legal-regulatory-advisory", destination: "/vendors/legal-regulatory-vendors", permanent: true },
      { source: "/vetted-smart-contract-development-web-3-engineering", destination: "/vendors/smart-contract-development-companies", permanent: true },
      { source: "/vetted-real-world-asset-rwa-tokenization-providers", destination: "/vendors/tokenization-platforms", permanent: true },
      { source: "/vetted-digital-asset-web-3-service-providers", destination: "/web3vendorecosystem", permanent: true },
      { source: "/vetted-web-3-kyc-aml-identity-solutions", destination: "/vendors/kyc-aml-providers", permanent: true },
      { source: "/cryptolawfirms", destination: "/vendors/legal-regulatory-vendors", permanent: true },
      { source: "/blockchain-development-companies", destination: "/vendors/blockchain-development-companies", permanent: true },
      { source: "/tokeny-vendor-review", destination: "/vendors/tokenization-platforms", permanent: true },
      { source: "/securitize-vendor-review", destination: "/vendors/tokenization-platforms", permanent: true },
      { source: "/t-zero-vendor-review", destination: "/vendors/tokenization-platforms", permanent: true },
      { source: "/fireblocks-vendor-review", destination: "/vendors/crypto-custody-providers", permanent: true },
      { source: "/sumsub-vendor-review", destination: "/vendors/kyc-aml-providers", permanent: true },
      { source: "/parallel-markets-investor-accreditation", destination: "/vendors/identity-solution-providers", permanent: true },
      { source: "/halborn-institutional-grade-security-smart-contract-audits-for-rwa", destination: "/vendors/security-audit-companies", permanent: true },
      { source: "/zoniqx-tokenization-flow-explainer", destination: "/fluidrwa/zoniqx", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/for-vendors-landing-page", destination: "/apply-as-vendor", permanent: true },
      { source: "/get-listed", destination: "/apply-as-vendor", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/my-unlocked-leads", destination: "/", permanent: true },
      { source: "/deal-room", destination: "/", permanent: true },
      { source: "/vendor-account-settings", destination: "/apply-as-vendor", permanent: true },
      { source: "/client-lead-capture-form", destination: "/submit-requirement", permanent: true },
      { source: "/the-strategic-blueprint", destination: "/blog", permanent: true },
      { source: "/submission-success", destination: "/", permanent: true },
      { source: "/book-online", destination: "/contact", permanent: true },
      { source: "/plans-pricing", destination: "/apply-as-vendor", permanent: true },
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
