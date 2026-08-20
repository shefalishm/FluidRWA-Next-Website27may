export type FreelancerCategory =
  | "Tokenization"
  | "Smart Contracts"
  | "Compliance"
  | "Legal"
  | "Finance"
  | "Product"
  | "Design"
  | "Growth"
  | "AI Infrastructure"
  | "Research"
  | "Operations";

export type FreelancerProfile = {
  id: string;
  name: string;
  title: string;
  location: string;
  category: FreelancerCategory;
  tags: string[];
  rate: string;
  availability: string;
  experience: string;
  summary: string;
  services: string[];
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl?: string;
  websiteUrl?: string;
  fileNames?: string[];
  verified: boolean;
  freeUntil: string;
  status?: "approved" | "pending_review" | "preview";
};

export const freelancerCategories: FreelancerCategory[] = [
  "Tokenization",
  "Smart Contracts",
  "Compliance",
  "Legal",
  "Finance",
  "Product",
  "Design",
  "Growth",
  "AI Infrastructure",
  "Research",
  "Operations"
];

export const freelancerTags = [
  "RWA",
  "ERC-3643",
  "Solidity",
  "KYC",
  "Tokenized funds",
  "Pitch decks",
  "Go-to-market",
  "DeFi",
  "Legal ops",
  "Data rooms",
  "AI agents",
  "Security review",
  "Fund administration",
  "Investor onboarding",
  "No-code automation",
  "Financial modeling"
];

export const sampleFreelancers: FreelancerProfile[] = [
  {
    id: "sample-tokenization-architect",
    name: "Maya Kapoor",
    title: "Tokenization product architect",
    location: "London, UK",
    category: "Tokenization",
    tags: ["RWA", "Tokenized funds", "Data rooms"],
    rate: "$120/hr",
    availability: "Available for 2 projects",
    experience: "7 years",
    summary:
      "Helps asset managers turn tokenization ideas into implementation briefs, vendor requirements and investor-ready workflows.",
    services: ["Tokenization roadmap", "Vendor requirement docs", "Investor onboarding workflow"],
    portfolioUrl: "https://example.com/portfolio/maya",
    linkedinUrl: "https://linkedin.com",
    verified: true,
    freeUntil: "Free listing until Oct 16, 2026"
  },
  {
    id: "sample-smart-contract-engineer",
    name: "Arjun Mehta",
    title: "Solidity engineer for RWA workflows",
    location: "Bengaluru, India",
    category: "Smart Contracts",
    tags: ["Solidity", "ERC-3643", "Security review"],
    rate: "$85/hr",
    availability: "Part-time this month",
    experience: "5 years",
    summary:
      "Builds permissioned token contracts, investor allowlists, transfer restriction modules and audit-ready documentation.",
    services: ["Smart contract development", "Transfer rules", "Audit preparation"],
    portfolioUrl: "https://example.com/portfolio/arjun",
    linkedinUrl: "https://linkedin.com",
    verified: true,
    freeUntil: "Free listing until Oct 16, 2026"
  },
  {
    id: "sample-compliance-specialist",
    name: "Elena Novak",
    title: "KYC and compliance operations consultant",
    location: "Berlin, Germany",
    category: "Compliance",
    tags: ["KYC", "Legal ops", "Tokenized funds"],
    rate: "$140/hr",
    availability: "Available for audits",
    experience: "9 years",
    summary:
      "Designs onboarding, wallet screening, jurisdiction rules and review processes for tokenized asset products.",
    services: ["KYC workflow design", "Compliance vendor selection", "Policy documentation"],
    portfolioUrl: "https://example.com/portfolio/elena",
    linkedinUrl: "https://linkedin.com",
    verified: true,
    freeUntil: "Free listing until Oct 16, 2026"
  },
  {
    id: "sample-growth-strategist",
    name: "Leo Martinez",
    title: "Web3 growth and content strategist",
    location: "New York, US",
    category: "Growth",
    tags: ["Go-to-market", "Pitch decks", "RWA"],
    rate: "$95/hr",
    availability: "Open to retainers",
    experience: "6 years",
    summary:
      "Turns complex infrastructure products into clear category pages, comparison content, founder posts and launch campaigns.",
    services: ["SEO briefs", "LinkedIn launch content", "Vendor category positioning"],
    portfolioUrl: "https://example.com/portfolio/leo",
    linkedinUrl: "https://linkedin.com",
    verified: false,
    freeUntil: "Free listing until Oct 16, 2026"
  }
];
