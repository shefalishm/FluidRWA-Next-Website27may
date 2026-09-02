export type Web3Event = {
  slug: string;
  name: string;
  startDate?: string;
  endDate?: string;
  dateLabel: string;
  month: string;
  year: number;
  city: string;
  country: string;
  focus: string;
  audience: string;
  description: string;
  status: "Confirmed dates" | "Month announced";
  track: "Builders" | "Institutional" | "Policy" | "Ecosystem";
};

// Dates are based on organizer announcements reviewed on 2 September 2026.
// No event or ticket links are included here: check the organizer before making travel plans.
export const web3Events: Web3Event[] = [
  {
    slug: "ethonline-2026",
    name: "ETHOnline 2026",
    startDate: "2026-09-04",
    endDate: "2026-09-16",
    dateLabel: "4-16 Sep 2026",
    month: "September",
    year: 2026,
    city: "Online",
    country: "Global",
    focus: "Ethereum builder hackathon",
    audience: "Developers, protocol teams and product builders",
    description: "An online ETHGlobal hackathon for teams building and testing Ethereum applications.",
    status: "Confirmed dates",
    track: "Builders"
  },
  {
    slug: "avalanche-summit-new-york-2026",
    name: "Avalanche Summit New York",
    startDate: "2026-09-16",
    endDate: "2026-09-17",
    dateLabel: "16-17 Sep 2026",
    month: "September",
    year: 2026,
    city: "New York",
    country: "United States",
    focus: "Enterprise onchain finance and ecosystem infrastructure",
    audience: "Institutions, enterprises, builders and investors",
    description: "A two-day Avalanche ecosystem gathering focused on enterprise deployment, institutional finance and onchain markets.",
    status: "Confirmed dates",
    track: "Institutional"
  },
  {
    slug: "eth-tokyo-week-2026",
    name: "ETHTokyo Week 2026",
    startDate: "2026-09-19",
    endDate: "2026-09-27",
    dateLabel: "19-27 Sep 2026",
    month: "September",
    year: 2026,
    city: "Tokyo",
    country: "Japan",
    focus: "Ethereum community week",
    audience: "Builders, communities, founders and researchers",
    description: "A city-wide programme of community-led Ethereum conferences, workshops, meetups and build sessions.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "ethglobal-tokyo-2026",
    name: "ETHGlobal Tokyo 2026",
    startDate: "2026-09-25",
    endDate: "2026-09-27",
    dateLabel: "25-27 Sep 2026",
    month: "September",
    year: 2026,
    city: "Tokyo",
    country: "Japan",
    focus: "Ethereum hackathon",
    audience: "Developers, early-stage teams and protocol builders",
    description: "An in-person ETHGlobal hackathon, accompanied by the Pragma Tokyo builder and leader summit.",
    status: "Confirmed dates",
    track: "Builders"
  },
  {
    slug: "korea-blockchain-week-2026",
    name: "Korea Blockchain Week 2026",
    startDate: "2026-09-29",
    endDate: "2026-10-01",
    dateLabel: "29 Sep-1 Oct 2026",
    month: "September / October",
    year: 2026,
    city: "Seoul",
    country: "South Korea",
    focus: "Digital assets, policy and Asian market access",
    audience: "Institutional leaders, founders, investors and ecosystem teams",
    description: "A major Asia-Pacific Web3 week with an institutional forum, main conference and partner events.",
    status: "Confirmed dates",
    track: "Institutional"
  },
  {
    slug: "token2049-singapore-2026",
    name: "TOKEN2049 Singapore",
    startDate: "2026-10-07",
    endDate: "2026-10-08",
    dateLabel: "7-8 Oct 2026",
    month: "October",
    year: 2026,
    city: "Singapore",
    country: "Singapore",
    focus: "Global crypto, Web3 and digital-asset leadership",
    audience: "Founders, investors, exchanges, institutions and ecosystem leaders",
    description: "A large two-day global crypto and Web3 conference at Marina Bay Sands, within a wider Singapore event week.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "brains-2026",
    name: "BRAINS 2026",
    startDate: "2026-10-13",
    endDate: "2026-10-16",
    dateLabel: "13-16 Oct 2026",
    month: "October",
    year: 2026,
    city: "Florence",
    country: "Italy",
    focus: "Blockchain research and applied distributed systems",
    audience: "Researchers, engineers, academics and applied-technology teams",
    description: "A research conference covering blockchain applications, distributed storage and compute, identity, networks and AI.",
    status: "Confirmed dates",
    track: "Builders"
  },
  {
    slug: "india-blockchain-week-2026",
    name: "India Blockchain Week Conference",
    startDate: "2026-11-01",
    endDate: "2026-11-02",
    dateLabel: "1-2 Nov 2026",
    month: "November",
    year: 2026,
    city: "Mumbai",
    country: "India",
    focus: "Indian Web3 ecosystem and real-world applications",
    audience: "Founders, builders, investors and global ecosystem teams",
    description: "The flagship conference anchoring a wider India Blockchain Week programme of independent ecosystem events.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "cosmoverse-hong-kong-2026",
    name: "Cosmoverse Hong Kong Digital Asset Summit",
    dateLabel: "Nov 2026",
    month: "November",
    year: 2026,
    city: "Hong Kong",
    country: "Hong Kong",
    focus: "Institutional digital assets, policy and market infrastructure",
    audience: "Banks, regulators, asset managers, infrastructure providers and investors",
    description: "An institutional digital-asset summit scheduled alongside Hong Kong FinTech Week; the organizer has announced the month, with session detail to follow.",
    status: "Month announced",
    track: "Institutional"
  },
  {
    slug: "ethglobal-mumbai-2026",
    name: "ETHGlobal Mumbai 2026",
    startDate: "2026-11-06",
    endDate: "2026-11-08",
    dateLabel: "6-8 Nov 2026",
    month: "November",
    year: 2026,
    city: "Mumbai",
    country: "India",
    focus: "Ethereum hackathon",
    audience: "Developers, students, startup teams and protocol builders",
    description: "An in-person ETHGlobal hackathon, preceded by Pragma Mumbai for Web3 builders and leaders.",
    status: "Confirmed dates",
    track: "Builders"
  },
  {
    slug: "solana-breakpoint-2026",
    name: "Solana Breakpoint 2026",
    startDate: "2026-11-15",
    endDate: "2026-11-17",
    dateLabel: "15-17 Nov 2026",
    month: "November",
    year: 2026,
    city: "London",
    country: "United Kingdom",
    focus: "Solana ecosystem and onchain applications",
    audience: "Solana developers, founders, investors and ecosystem operators",
    description: "Solana's flagship conference, announced for Olympia London with a multi-day ecosystem programme.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "blockchain-life-2026",
    name: "Blockchain Life 2026",
    startDate: "2026-12-01",
    endDate: "2026-12-02",
    dateLabel: "1-2 Dec 2026",
    month: "December",
    year: 2026,
    city: "Dubai",
    country: "United Arab Emirates",
    focus: "Crypto markets, mining, Web3 and AI",
    audience: "Founders, investors, exchanges, traders and operators",
    description: "A Dubai forum with a broader side-event week for global crypto, Web3, mining and AI communities.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "bitblockboom-2027",
    name: "BitBlockBoom 2027",
    startDate: "2027-04-01",
    endDate: "2027-04-04",
    dateLabel: "1-4 Apr 2027",
    month: "April",
    year: 2027,
    city: "Fort Worth",
    country: "United States",
    focus: "Bitcoin education and community",
    audience: "Bitcoin-focused operators, investors and builders",
    description: "A Bitcoin-focused conference and networking programme with workshops, talks and community events.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "dc-blockchain-summit-2027",
    name: "DC Blockchain Summit 2027",
    startDate: "2027-04-06",
    endDate: "2027-04-07",
    dateLabel: "6-7 Apr 2027",
    month: "April",
    year: 2027,
    city: "Washington, DC",
    country: "United States",
    focus: "Blockchain policy, regulation and US competitiveness",
    audience: "Policymakers, regulators, institutions and industry leaders",
    description: "A policy-led summit connecting government and business leaders around digital-asset and blockchain adoption.",
    status: "Confirmed dates",
    track: "Policy"
  },
  {
    slug: "crypto-assets-conference-2027",
    name: "Crypto Assets Conference 2027",
    startDate: "2027-04-07",
    endDate: "2027-04-07",
    dateLabel: "7 Apr 2027",
    month: "April",
    year: 2027,
    city: "Frankfurt",
    country: "Germany",
    focus: "Tokenization, digital assets, stablecoins and regulation",
    audience: "Banks, financial institutions, regulators and digital-asset teams",
    description: "A Frankfurt School conference focused on the institutional and regulatory development of digital assets.",
    status: "Confirmed dates",
    track: "Institutional"
  },
  {
    slug: "unchained-summit-dubai-2027",
    name: "Unchained Summit Dubai 2027",
    startDate: "2027-04-19",
    endDate: "2027-04-20",
    dateLabel: "19-20 Apr 2027",
    month: "April",
    year: 2027,
    city: "Dubai",
    country: "United Arab Emirates",
    focus: "Web3 deal flow, founders and investor networking",
    audience: "Founders, investors, operators and ecosystem partners",
    description: "A focused Dubai conference and pitch programme for builders, investors and deal-making teams.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "token2049-dubai-2027",
    name: "TOKEN2049 Dubai 2027",
    startDate: "2027-04-21",
    endDate: "2027-04-22",
    dateLabel: "21-22 Apr 2027",
    month: "April",
    year: 2027,
    city: "Dubai",
    country: "United Arab Emirates",
    focus: "Global crypto, Web3 and digital-asset leadership",
    audience: "Founders, institutions, investors, exchanges and ecosystem leaders",
    description: "A global crypto and Web3 event at Madinat Jumeirah, scheduled during a busy Dubai digital-asset week.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "africa-blockchain-week-2027",
    name: "Africa Blockchain Week 2027",
    startDate: "2027-04-28",
    endDate: "2027-05-01",
    dateLabel: "28 Apr-1 May 2027",
    month: "April / May",
    year: 2027,
    city: "Lagos",
    country: "Nigeria",
    focus: "Blockchain, DeFi, Web3 and African market development",
    audience: "Founders, investors, regulators, builders and enterprise teams",
    description: "A four-day Lagos programme of conference sessions, exhibitions, investor activity and ecosystem gatherings.",
    status: "Confirmed dates",
    track: "Ecosystem"
  },
  {
    slug: "vienna-blockchain-week-2027",
    name: "Vienna Blockchain Week 2027",
    startDate: "2027-06-02",
    endDate: "2027-06-03",
    dateLabel: "2-3 Jun 2027",
    month: "June",
    year: 2027,
    city: "Vienna",
    country: "Austria",
    focus: "Institutional digital assets and AI",
    audience: "Banks, asset managers, regulators, investors and technology leaders",
    description: "A two-day European meeting point for institutional digital assets, infrastructure and AI.",
    status: "Confirmed dates",
    track: "Institutional"
  },
  {
    slug: "nzcryptocon-2027",
    name: "NZCryptoCon 2027",
    dateLabel: "Jun 2027",
    month: "June",
    year: 2027,
    city: "Auckland",
    country: "New Zealand",
    focus: "Crypto, blockchain and Web3 education",
    audience: "Builders, investors, developers, founders and community members",
    description: "A New Zealand blockchain and crypto conference with talks, workshops, an expo and community sessions.",
    status: "Month announced",
    track: "Ecosystem"
  },
  {
    slug: "ethconf-2027",
    name: "ETHConf 2027",
    startDate: "2027-06-14",
    endDate: "2027-06-16",
    dateLabel: "14-16 Jun 2027",
    month: "June",
    year: 2027,
    city: "New York",
    country: "United States",
    focus: "Institutional Ethereum and product launches",
    audience: "Founders, researchers, protocol teams, operators and institutions",
    description: "A large Ethereum conference at Javits Center for builders, researchers, operators and institutional participants.",
    status: "Confirmed dates",
    track: "Institutional"
  },
  {
    slug: "global-blockchain-crypto-symposium-2027",
    name: "Global Blockchain & Crypto Symposium 2027",
    dateLabel: "Jun 2027",
    month: "June",
    year: 2027,
    city: "London",
    country: "United Kingdom",
    focus: "Law, policy, financial markets and digital assets",
    audience: "Legal, compliance, regulatory and institutional leaders",
    description: "A London policy and commercial forum on blockchain, crypto, tokenization, financial crime and cross-border regulation.",
    status: "Month announced",
    track: "Policy"
  },
  {
    slug: "incrypted-conference-2027",
    name: "Incrypted Conference 2027",
    dateLabel: "Jun 2027",
    month: "June",
    year: 2027,
    city: "Kyiv",
    country: "Ukraine",
    focus: "Eastern European Web3 and blockchain ecosystem",
    audience: "Founders, executives, builders and regional ecosystem teams",
    description: "A major Eastern European Web3 gathering held within Ukrainian Blockchain Week.",
    status: "Month announced",
    track: "Ecosystem"
  }
];

export const web3EventTracks = ["All", "Builders", "Institutional", "Policy", "Ecosystem"] as const;

export type EventTheme = "Web3 & digital assets" | "Family offices & private capital";
export type EventRegion = "North America" | "Europe" | "Asia-Pacific" | "Middle East" | "Africa" | "Global / online";

export type CalendarEvent = Web3Event & {
  theme: EventTheme;
  region: EventRegion;
  imageUrl?: string;
};

const regionForCountry = (country: string): EventRegion => {
  if (country === "Global") return "Global / online";
  if (["United States", "Canada"].includes(country)) return "North America";
  if (["United Kingdom", "Germany", "Italy", "Austria", "Ukraine", "Switzerland"].includes(country)) return "Europe";
  if (["Singapore", "Japan", "South Korea", "India", "Hong Kong", "New Zealand"].includes(country)) return "Asia-Pacific";
  if (["United Arab Emirates", "Saudi Arabia"].includes(country)) return "Middle East";
  if (country === "Mexico") return "North America";
  return "Africa";
};

// Official event imagery is used where an organizer has supplied a stable public visual.
// Remaining cards retain an intentional location-led treatment instead of hotlinking uncertain assets.
const officialEventImages: Partial<Record<string, string>> = {
  "avalanche-summit-new-york-2026": "https://irp.cdn-website.com/02019734/dms3rep/multi/opt/868a330c-4545-461a-bb39-78e9473ba81b-2880w.jpg",
  "token2049-singapore-2026": "https://token2049.nyc3.cdn.digitaloceanspaces.com/Singapore/OG/T2049%20Singapore%20-%20OpenGraph%20(2026)%202%20OCT%202025.avif"
};

export const familyOfficeEvents: CalendarEvent[] = [
  {
    slug: "family-office-forum-frankfurt-2026",
    name: "Family Office Forum Frankfurt",
    startDate: "2026-09-22",
    endDate: "2026-09-23",
    dateLabel: "22-23 Sep 2026",
    month: "September",
    year: 2026,
    city: "Frankfurt",
    country: "Germany",
    focus: "Private capital, governance and direct-investment conversations",
    audience: "Family principals, single family office executives and select partners",
    description: "A private-capital forum for family office decision-makers and investment partners in continental Europe.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "Europe",
    imageUrl: "https://prestelandpartner.com/images/prestel_and_partner_meta_image.jpg"
  },
  {
    slug: "family-office-forum-new-york-2026",
    name: "Family Office Forum New York",
    startDate: "2026-10-13",
    endDate: "2026-10-14",
    dateLabel: "13-14 Oct 2026",
    month: "October",
    year: 2026,
    city: "New York",
    country: "United States",
    focus: "Private markets, direct investments and family capital",
    audience: "Family offices, principals, private investors and selected advisers",
    description: "A family-office focused meeting for US private capital allocators and investment specialists.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "North America",
    imageUrl: "https://prestelandpartner.com/images/prestel_and_partner_meta_image.jpg"
  },
  {
    slug: "family-office-forum-zurich-2026",
    name: "Family Office Forum Zurich",
    startDate: "2026-11-10",
    endDate: "2026-11-11",
    dateLabel: "10-11 Nov 2026",
    month: "November",
    year: 2026,
    city: "Zurich",
    country: "Switzerland",
    focus: "European family capital and investment governance",
    audience: "Family office principals, executives and investment partners",
    description: "A closed-door European forum for family office leaders, wealth owners and selected experts.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "Europe",
    imageUrl: "https://prestelandpartner.com/images/prestel_and_partner_meta_image.jpg"
  },
  {
    slug: "family-office-forum-riyadh-2026",
    name: "Family Office Forum Riyadh",
    startDate: "2026-12-02",
    endDate: "2026-12-03",
    dateLabel: "2-3 Dec 2026",
    month: "December",
    year: 2026,
    city: "Riyadh",
    country: "Saudi Arabia",
    focus: "MENA private wealth, co-investment and long-term capital",
    audience: "Family offices, wealth owners and select regional partners",
    description: "A focused Riyadh event for family capital, private markets and regional investment relationships.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "Middle East",
    imageUrl: "https://prestelandpartner.com/images/prestel_and_partner_meta_image.jpg"
  },
  {
    slug: "family-office-super-summit-2026",
    name: "Family Office Super Summit",
    startDate: "2026-12-15",
    endDate: "2026-12-17",
    dateLabel: "15-17 Dec 2026",
    month: "December",
    year: 2026,
    city: "Fort Lauderdale",
    country: "United States",
    focus: "Private investing, co-investment and family-office networking",
    audience: "Family offices, investors, fund managers and deal sponsors",
    description: "A large family-office investor gathering with capital-allocation and relationship-building programming.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "North America"
  },
  {
    slug: "digital-family-office-forum-2027",
    name: "Digital Family Office Forum",
    startDate: "2027-02-09",
    endDate: "2027-02-10",
    dateLabel: "9-10 Feb 2027",
    month: "February",
    year: 2027,
    city: "Online",
    country: "Global",
    focus: "Long-term capital, governance and private-market strategy",
    audience: "Family office principals, wealth owners and institutional investors",
    description: "A live global forum on capital allocation, governance, succession and the operating realities of family enterprise.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "Global / online"
  },
  {
    slug: "family-office-forum-dubai-2027",
    name: "Family Office Forum Dubai",
    startDate: "2027-03-24",
    endDate: "2027-03-25",
    dateLabel: "24-25 Mar 2027",
    month: "March",
    year: 2027,
    city: "Dubai",
    country: "United Arab Emirates",
    focus: "MENA family capital, private wealth and direct investment",
    audience: "Single family offices, principals, wealth owners and select partners",
    description: "A MENA private-capital forum designed for family office decision-makers and invited specialists.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "Middle East",
    imageUrl: "https://prestelandpartner.com/images/prestel_and_partner_meta_image.jpg"
  },
  {
    slug: "family-office-forum-singapore-2027",
    name: "Family Office Forum Singapore",
    startDate: "2027-04-20",
    endDate: "2027-04-21",
    dateLabel: "20-21 Apr 2027",
    month: "April",
    year: 2027,
    city: "Singapore",
    country: "Singapore",
    focus: "Asian family capital, investment strategy and private markets",
    audience: "South-East Asian family offices, principals and selected advisers",
    description: "A Singapore meeting point for family office decision-makers and private-capital partners in the region.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "Asia-Pacific",
    imageUrl: "https://prestelandpartner.com/images/prestel_and_partner_meta_image.jpg"
  },
  {
    slug: "family-office-forum-los-angeles-2027",
    name: "Family Office Forum Los Angeles",
    startDate: "2027-06-02",
    endDate: "2027-06-03",
    dateLabel: "2-3 Jun 2027",
    month: "June",
    year: 2027,
    city: "Los Angeles",
    country: "United States",
    focus: "Family capital, private markets and investment partnerships",
    audience: "Family offices, wealth owners and private investment specialists",
    description: "A West Coast private-capital forum for family office leaders and carefully selected investment partners.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "North America",
    imageUrl: "https://prestelandpartner.com/images/prestel_and_partner_meta_image.jpg"
  },
  {
    slug: "global-family-office-conference-2027",
    name: "Global Family Office Conference",
    startDate: "2027-06-08",
    endDate: "2027-06-08",
    dateLabel: "8 Jun 2027",
    month: "June",
    year: 2027,
    city: "London",
    country: "United Kingdom",
    focus: "Family enterprise, direct investing and long-term wealth",
    audience: "Family office principals, next-generation leaders and executives",
    description: "A member-led annual gathering for family-office principals, next-gens and executives from around the world.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "Europe",
    imageUrl: "https://www.globalfamilyofficeconference.com/s/img/emotionheader.png"
  },
  {
    slug: "family-office-forum-los-cabos-2027",
    name: "Family Office Forum Los Cabos",
    startDate: "2027-06-09",
    endDate: "2027-06-10",
    dateLabel: "9-10 Jun 2027",
    month: "June",
    year: 2027,
    city: "Los Cabos",
    country: "Mexico",
    focus: "Private investing, family capital and peer exchange",
    audience: "Family office principals, executives and invited specialists",
    description: "A private-capital meeting for family office leaders and investment partners in North America.",
    status: "Confirmed dates",
    track: "Institutional",
    theme: "Family offices & private capital",
    region: "North America",
    imageUrl: "https://prestelandpartner.com/images/prestel_and_partner_meta_image.jpg"
  }
];

export const calendarEvents: CalendarEvent[] = [
  ...web3Events.map((event) => ({
    ...event,
    theme: "Web3 & digital assets" as const,
    region: regionForCountry(event.country),
    imageUrl: officialEventImages[event.slug]
  })),
  ...familyOfficeEvents
];

export const eventRegions: Array<"All locations" | EventRegion> = [
  "All locations",
  "North America",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "Africa",
  "Global / online"
];
