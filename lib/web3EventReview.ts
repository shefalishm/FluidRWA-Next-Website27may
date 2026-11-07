import type { CalendarEvent, EventReview, EventTheme, EventRegion } from "./web3Events";

const checkedDate = "2026-11-07";
const ticket = "Public registration; availability and pass conditions on organizer site";
const application = "Application reviewed by organizer; attendance is not automatic";
const prestel = "https://prestelandpartner.com/";
const tech = "https://events.thetechcapital.com/page/";
const aiSeries = "https://london.theaisummit.com/about/ai-summit-event-series/";

function review(organizerUrl: string, venue: string, access = ticket, extra: Partial<EventReview> = {}): EventReview {
  return { organizerUrl, venue, access, checkedDate, ...extra };
}

// Primary organizer evidence, checked individually. Unknown days stay undefined.
export const eventReviews: Record<string, EventReview> = {
  "ethglobal-mumbai-2026": review("https://ethglobal.com/events/mumbai/sponsor", "Mumbai; confirm venue with organizer", "Hackathon application and organizer admission conditions", {
    updates: { startDate: "2026-11-05", endDate: "2026-11-07", dateLabel: "5-7 Nov 2026" },
    note: "Organizer now lists November 5-7, correcting the previous November 6-8 listing."
  }),
  "cosmoverse-hong-kong-2026": review("https://www.cosmoverse.org/", "Grand Hyatt Hong Kong", "Summit passes; November 4 Business Day separately invitation-only", {
    updates: { startDate: "2026-11-05", endDate: "2026-11-06", dateLabel: "5-6 Nov 2026", status: "Confirmed dates", description: "Institutional finance and digital-asset summit. The public summit ran November 5-6; the separate November 4 Business Day required an invitation." }
  }),
  "solana-breakpoint-2026": review("https://solana.com/news/breakpoint-london-lineup", "Olympia London"),
  "blockchain-life-2026": review("https://blockchain-life.com/", "Festival Arena, Dubai"),
  "bitblockboom-2027": review("https://www.bitblockboom.com/ticket", "Fort Worth; confirm individual programme venues"),
  "dc-blockchain-summit-2027": review("https://www.dcblockchainsummit.com/", "Washington, DC; venue not confirmed in reviewed announcement"),
  "crypto-assets-conference-2027": review("https://crypto-assets-conference.de/", "Frankfurt School of Finance & Management, Adickesallee 32-34"),
  "unchained-summit-dubai-2027": review("https://unchainedsummit.com/dubai/", "W Dubai - The Palm"),
  "token2049-dubai-2027": review("https://www.token2049.com/dubai", "Madinat Jumeirah", ticket, { note: "The Dubai edition was moved from 2026 to April 21-22, 2027; no separate future 2026 edition is listed." }),
  "africa-blockchain-week-2027": review("https://tuaevents.org/events", "Lagos Oriental Hotel", ticket, { updates: { name: "Africa Blockchain, DeFi & Web3 Summit 2027 (Africa Blockchain Week)" } }),
  "vienna-blockchain-week-2027": review("https://viennablockchainweek.org/about", "Vienna; venue pending", ticket),
  "ethconf-2027": review("https://ethconf.com/", "Javits Center, New York"),
  "nzcryptocon-2027": review("https://nzcryptocon.com/", "Auckland; exact venue pending", "Organizer advertises early-bird tickets; exact event days pending", { note: "June 2027 is announced; exact days are pending." }),
  "global-blockchain-crypto-symposium-2027": review("https://blockchaincrypto-symposium.com/", "City of London; exact venue pending", "Attendance enquiries open; confirm 2027 booking conditions", { note: "Header announces June 2027. The retained Wednesday June 24 agenda belongs to 2026 and is not evidence of a 2027 day." }),
  "incrypted-conference-2027": review("https://incryptedconference.com/en/", "Kyiv; venue pending", "Organizer ticket link; exact event days pending", { note: "Organizer announces June 2027; older 2026 headings and speakers are not treated as the 2027 programme." }),
  "family-office-forum-zurich-2026": review(prestel + "familyofficeforumzurich.html", "The Dolder Grand", application),
  "family-office-forum-riyadh-2026": review(prestel + "familyofficeforum-riyadh.html", "Crowne Plaza Riyadh RDC Hotel & Convention", application, {
    updates: { name: "Family Office Forum Riyadh 2027", startDate: "2027-04-06", endDate: "2027-04-07", dateLabel: "6-7 Apr 2027", month: "April", year: 2027 },
    note: "Replaces the unsupported December 2-3, 2026 listing. The organizer currently announces April 6-7, 2027; cancellation of the former listing is not asserted."
  }),
  "family-office-super-summit-2026": review("https://familyoffices.com/super/", "Fort Lauderdale; confirm venue after admission", "Family Office Club membership or qualified investor admission; no summit-only tickets"),
  "digital-family-office-forum-2027": review("https://ukfos.com/family-office-events-uk-2026", "Online", "Register interest with Private Markets Group; 2027 dates not verified", {
    updates: { startDate: undefined, endDate: undefined, dateLabel: "2027 dates pending", status: "Date pending", description: "Private Markets Group lists its digital family-office forum series. The previously listed February 9-10, 2027 dates could not be confirmed and have been withdrawn." },
    note: "The organizer has not confirmed a 2027 edition or exact dates."
  }),
  "family-office-forum-dubai-2027": review(prestel + "familyofficeforumdubai.html", "The Palace Downtown", application, {
    updates: { startDate: "2027-03-16", endDate: "2027-03-17", dateLabel: "16-17 Mar 2027" }, note: "Corrected from March 24-25 to the organizer's March 16-17 announcement."
  }),
  "family-office-forum-singapore-2027": review(prestel + "familyofficeforumsingapore.html", "Raffles Hotel", application),
  "family-office-forum-los-angeles-2027": review(prestel + "family-office-forum-los-angeles.html", "The Maybourne Beverly Hills", application),
  "global-family-office-conference-2027": review("https://www.globalfamilyofficeconference.com/", "London; venue not publicly specified", "Family-office membership gathering; contact organizer for attendance"),
  "family-office-forum-los-cabos-2027": review(prestel + "prestel-and-partner-family-office-forum-los-cabos.html", "The Solaz Resort", application)
};

type Addition = {
  slug: string; name: string; start: string; end: string; city: string; country: string;
  region: EventRegion; theme: EventTheme; url: string; venue: string; focus: string;
  audience: string; access?: string; description: string; note?: string;
};

const additions: Addition[] = [
  { slug: "das-london-2026", name: "Digital Asset Summit London 2026", start: "2026-11-10", end: "2026-11-11", city: "London", country: "United Kingdom", region: "Europe", theme: "Web3 & digital assets", url: "https://blockworks.com/events", venue: "Hilton Park Lane", focus: "Institutional digital assets and market structure", audience: "Allocators, builders, institutions and policymakers", description: "Blockworks' London summit brings institutional capital and digital-asset infrastructure teams together for two days." },
  { slug: "das-new-york-2027", name: "Digital Asset Summit NYC 2027", start: "2027-03-30", end: "2027-04-01", city: "New York", country: "United States", region: "North America", theme: "Web3 & digital assets", url: "https://blockworks.com/events", venue: "Javits North", focus: "Institutional finance and global digital-asset markets", audience: "Allocators, builders, institutions and policymakers", description: "Blockworks confirms March 30-April 1 at Javits North, rather than the March dates projected by some third-party calendars." },
  { slug: "superreturn-africa-2026", name: "SuperReturn Africa 2026", start: "2026-12-01", end: "2026-12-03", city: "Cape Town", country: "South Africa", region: "Africa", theme: "Family offices & private capital", url: "https://informaconnect.com/superreturn-africa/", venue: "The Westin Cape Town", focus: "African private capital, infrastructure and investment", audience: "LPs, GPs, development finance institutions and family offices", description: "A private-capital conference for investors and fund managers active in African markets.", access: "Delegate registration; LP qualification rules apply to LP passes" },
  { slug: "superreturn-north-america-2027", name: "SuperReturn North America 2027", start: "2027-02-01", end: "2027-02-03", city: "Hollywood, Florida", country: "United States", region: "North America", theme: "Family offices & private capital", url: "https://informaconnect.com/superreturn-north-america/", venue: "Signia by Hilton Diplomat Beach Resort", focus: "Private equity, private credit, real assets and AI", audience: "LPs, GPs, institutional investors and family offices", description: "The North American private-markets event includes family-office perspectives and investment discussions across real assets, AI and private credit.", access: "Delegate registration; some family-office sessions have restricted eligibility" },
  { slug: "superreturn-international-2027", name: "SuperReturn International 2027", start: "2027-06-07", end: "2027-06-11", city: "Berlin", country: "Germany", region: "Europe", theme: "Family offices & private capital", url: "https://informaconnect.com/superreturn-international/event-schedule/", venue: "InterContinental Hotel Berlin", focus: "Private capital, private debt, AI and technology investment", audience: "LPs, GPs, family offices and institutional allocators", description: "Specialist summits run June 7-8; the main conference runs June 9-11. Access depends on the selected package.", access: "Separate summit-only, main-conference and combined delegate packages" },
  { slug: "superreturn-asia-2027", name: "SuperReturn Asia 2027", start: "2027-09-27", end: "2027-09-30", city: "Singapore", country: "Singapore", region: "Asia-Pacific", theme: "Family offices & private capital", url: "https://informaconnect.com/superreturnasia/", venue: "Marina Bay Sands Convention Centre", focus: "Asian private equity, credit, infrastructure and private wealth", audience: "LPs, GPs, sovereign funds and family offices", description: "The organizer's announced Asia edition connects international capital with Asian private-market investment opportunities.", access: "Delegate registration; LP qualification rules apply to LP passes" },
  { slug: "consensus-hong-kong-2027", name: "Consensus Hong Kong 2027", start: "2027-02-01", end: "2027-02-03", city: "Hong Kong", country: "Hong Kong", region: "Asia-Pacific", theme: "Web3 & digital assets", url: "https://consensus-hongkong.coindesk.com/", venue: "Hong Kong Convention & Exhibition Centre", focus: "Tokenization, institutional finance, AI and policy", audience: "Institutions, founders, investors and policymakers", description: "CoinDesk's Asia edition covers digital assets and AI. The overall event is February 1-3; the exhibition runs February 2-3." },
  { slug: "consensus-miami-2027", name: "Consensus Miami 2027", start: "2027-05-04", end: "2027-05-06", city: "Miami Beach", country: "United States", region: "North America", theme: "Web3 & digital assets", url: "https://consensus.coindesk.com/", venue: "Miami Beach Convention Center", focus: "Digital assets, institutional integration and agentic commerce", audience: "Finance, technology, policy and digital-asset teams", description: "CoinDesk's North American conference returns to Miami Beach with digital-asset, tokenized-market and AI programming." },
  { slug: "token2049-new-york-2027", name: "TOKEN2049 New York 2027", start: "2027-06-16", end: "2027-06-17", city: "New York", country: "United States", region: "North America", theme: "Web3 & digital assets", url: "https://www.token2049.com/new-york", venue: "New York; confirm venue with organizer", focus: "Crypto markets, institutional adoption and global capital", audience: "Founders, investors, institutions and ecosystem operators", description: "The organizer's announced New York edition brings its crypto conference series to the United States." },
  { slug: "token2049-singapore-2027", name: "TOKEN2049 Singapore 2027", start: "2027-10-06", end: "2027-10-07", city: "Singapore", country: "Singapore", region: "Asia-Pacific", theme: "Web3 & digital assets", url: "https://www.token2049.com/singapore", venue: "Marina Bay Sands", focus: "Global Web3, digital assets and Asian market access", audience: "Founders, investors, institutions and infrastructure teams", description: "The Singapore edition has organizer-announced October dates and a Marina Bay Sands venue; side-event dates are separate." },
  { slug: "ethcc-2027", name: "EthCC[10] 2027", start: "2027-04-12", end: "2027-04-15", city: "Cannes", country: "France", region: "Europe", theme: "Web3 & digital assets", url: "https://ethcc.io/", venue: "Palais des Festivals et des Congrès", focus: "Ethereum, RWA tokenization, stablecoins and applied cryptography", audience: "Builders, researchers, investors and institutions", description: "Ethereum France's tenth conference combines technical and community sessions with digital-economy and institutional topics.", note: "Official organizer dates are April 12-15, not the April 5-8 dates still shown by some third-party calendars." },
  { slug: "signal-week-2027", name: "Signal Week 2027 (formerly Paris Blockchain Week)", start: "2027-07-06", end: "2027-07-07", city: "Versailles", country: "France", region: "Europe", theme: "Web3 & digital assets", url: "https://www.signalweek.com/", venue: "Palais des Congrès, Château de Versailles", focus: "Institutional digital assets and market infrastructure", audience: "Banks, asset managers, investors and digital-asset operators", description: "Paris Blockchain Week continues under the Signal Week name, with the organizer announcing July dates at Versailles." },
  { slug: "ai-summit-new-york-2026", name: "The AI Summit New York 2026", start: "2026-12-09", end: "2026-12-10", city: "New York", country: "United States", region: "North America", theme: "AI & infrastructure", url: "https://newyork.theaisummit.com/", venue: "Javits Center", focus: "Commercial AI, enterprise adoption and investment", audience: "Enterprise leaders, AI teams, founders and investors", description: "Informa's enterprise AI summit examines deployment, security and practical business applications." },
  { slug: "world-ai-cannes-2027", name: "World AI Cannes Festival 2027", start: "2027-02-10", end: "2027-02-11", city: "Cannes", country: "France", region: "Europe", theme: "AI & infrastructure", url: "https://waicf.com/", venue: "Palais des Festivals et des Congrès", focus: "Enterprise AI and applied innovation", audience: "Enterprise buyers, solution providers, founders and investors", description: "A two-day AI festival for enterprise strategy, emerging technologies and commercial partnerships." },
  { slug: "ai-summit-london-2027", name: "The AI Summit London 2027", start: "2027-06-09", end: "2027-06-10", city: "London", country: "United Kingdom", region: "Europe", theme: "AI & infrastructure", url: aiSeries, venue: "Tobacco Dock", focus: "Commercial AI and enterprise transformation", audience: "Enterprise leaders, technology buyers and investors", access: "Register interest; confirm 2027 pass availability", description: "The organizer's series calendar confirms a two-day London edition at Tobacco Dock." },
  { slug: "ai-summit-australia-2027", name: "The AI Summit Australia 2027", start: "2027-08-23", end: "2027-08-25", city: "Melbourne", country: "Australia", region: "Asia-Pacific", theme: "AI & infrastructure", url: "https://australia.theaisummit.com/", venue: "Melbourne Convention and Exhibition Centre", focus: "Commercial AI and data-centre infrastructure", audience: "Enterprise leaders, government, infrastructure and AI teams", access: "Register interest with organizer", description: "Co-located with Data Center World Australia, connecting enterprise AI deployment with its supporting infrastructure." },
  { slug: "world-summit-ai-2027", name: "World Summit AI Amsterdam 2027", start: "2027-10-06", end: "2027-10-07", city: "Amsterdam", country: "Netherlands", region: "Europe", theme: "AI & infrastructure", url: "https://worldsummit.ai/", venue: "Taets Art & Event Park", focus: "AI deployment, governance and investment", audience: "Enterprise leaders, researchers, startups, investors and policymakers", description: "The announced 2027 Amsterdam summit covers applied AI, emerging technology and governance." },
  { slug: "ai-summit-new-york-2027", name: "The AI Summit New York 2027", start: "2027-12-08", end: "2027-12-09", city: "New York", country: "United States", region: "North America", theme: "AI & infrastructure", url: aiSeries, venue: "Javits Convention Center", focus: "Commercial AI and enterprise adoption", audience: "Enterprise decision-makers, AI companies and investors", access: "Dates announced in organizer series calendar; confirm 2027 registration", description: "Informa's series calendar explicitly announces December 8-9, 2027; this listing is not inferred from annual recurrence." },
  { slug: "infraai-global-summit-2027", name: "InfraAI Global Summit 2027", start: "2027-04-19", end: "2027-04-21", city: "Athens", country: "Greece", region: "Europe", theme: "AI & infrastructure", url: tech + "infraai-global-summit-2027", venue: "Asteria Domus, Athens Riviera", focus: "AI infrastructure capital, energy and sovereignty", audience: "Investors, lenders, operators, governments and energy leaders", description: "The Tech Capital's summit addresses financing and building compute, data centres and the energy systems behind AI." },
  { slug: "latam-finance-forum-2027", name: "LATAM Finance Forum 2027", start: "2027-07-15", end: "2027-07-15", city: "São Paulo", country: "Brazil", region: "Latin America", theme: "AI & infrastructure", url: tech + "latam-finance-forum-2027", venue: "São Paulo; confirm venue with organizer", focus: "Digital infrastructure and AI investment", audience: "Infrastructure investors, lenders, operators and advisers", description: "A regional forum for capital allocation and financing the next phase of Latin American digital infrastructure." },
  { slug: "international-finance-forum-2027", name: "International Finance Forum 2027", start: "2027-11-16", end: "2027-11-16", city: "London", country: "United Kingdom", region: "Europe", theme: "AI & infrastructure", url: tech + "international-finance-forum-2027", venue: "One Great George Street", focus: "AI and digital-infrastructure financing", audience: "Investors, infrastructure operators, lenders and advisers", description: "The forum takes place November 16. The separately ticketed Global Awards are November 15.", note: "The registration section distinguishes November 16 forum access from the combined November 15-16 awards experience." },
  { slug: "family-office-forum-london-2027", name: "Family Office Forum London 2027", start: "2027-07-01", end: "2027-07-02", city: "London", country: "United Kingdom", region: "Europe", theme: "Family offices & private capital", url: prestel + "familyofficeforumlondon.html", venue: "The Corinthia London", focus: "Family capital, governance and private investment", audience: "Family principals, single family offices and selected experts", access: application, description: "Prestel & Partner's London forum convenes family capital decision-makers; applicants must meet organizer attendance conditions." },
  { slug: "family-office-forum-frankfurt-2027", name: "Family Office Forum Frankfurt 2027", start: "2027-09-15", end: "2027-09-16", city: "Frankfurt", country: "Germany", region: "Europe", theme: "Family offices & private capital", url: prestel + "familyofficeforumde.html", venue: "Hotel Sofitel Frankfurt Opera", focus: "Private wealth, investment governance and family enterprise", audience: "Family offices, wealth owners and selected advisers", access: application, description: "The German forum's 2027 edition has announced September dates and a Frankfurt Opera hotel venue." },
  { slug: "family-office-forum-new-york-2027", name: "Family Office Forum New York 2027", start: "2027-10-19", end: "2027-10-20", city: "New York", country: "United States", region: "North America", theme: "Family offices & private capital", url: prestel + "family-office-forum-new-york.html", venue: "The Harvard Club New York", focus: "Family capital, direct investing and peer exchange", audience: "Family offices, principals and selected specialists", access: application, description: "The organizer's announced New York forum for private family wealth and investment decision-makers." }
];

export const newReviewedEvents: CalendarEvent[] = additions.map((event) => {
  eventReviews[event.slug] = review(event.url, event.venue, event.access || ticket, { note: event.note });
  const start = new Date(event.start + "T12:00:00Z");
  const end = new Date(event.end + "T12:00:00Z");
  const format = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  return {
    slug: event.slug, name: event.name, startDate: event.start, endDate: event.end,
    dateLabel: event.start === event.end ? format.format(start) : `${format.format(start)} - ${format.format(end)}`,
    month: new Intl.DateTimeFormat("en-GB", { month: "long", timeZone: "UTC" }).format(start), year: start.getUTCFullYear(),
    city: event.city, country: event.country, region: event.region, theme: event.theme,
    focus: event.focus, audience: event.audience, description: event.description,
    status: "Confirmed dates", track: "Institutional"
  };
});

const pending: CalendarEvent = {
  slug: "mea-finance-forum-2028", name: "Middle East & Africa Finance Forum 2028",
  dateLabel: "March 2028 - exact dates pending", month: "March", year: 2028,
  city: "Abu Dhabi", country: "United Arab Emirates", region: "Middle East", theme: "AI & infrastructure",
  focus: "AI and digital-infrastructure investment", audience: "Sovereign funds, investors, lenders, operators and public-sector leaders",
  description: "The Tech Capital announces a return to Abu Dhabi in March 2028. Exact days, venue and participation details have not been announced.",
  status: "Month announced", track: "Institutional"
};
eventReviews[pending.slug] = review(tech + "middle-east-africa-finance-forum-2028", "Venue pending", "Register interest; participation details pending");
newReviewedEvents.push(pending);
