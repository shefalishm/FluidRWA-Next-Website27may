export const investorAssets = ["Private credit", "Real estate", "Tokenized treasuries and funds", "Commodities and gold", "Infrastructure and energy", "Art and collectibles", "Carbon and environmental assets", "Other"] as const;
export const investorTypes = ["Family office", "Crypto fund or hedge fund", "Venture or private equity fund", "DAO or crypto treasury", "Wealth manager or advisor", "High net worth individual", "Corporate or institutional treasury", "Other"] as const;
export const investorRegions = ["North America", "Europe", "Middle East", "Asia Pacific", "Africa", "Latin America", "Other"] as const;
export const investorTickets = ["Under 50,000 USD", "50,000 to 250,000 USD", "250,000 to 1 million USD", "1 million to 5 million USD", "Above 5 million USD", "Prefer not to say"] as const;

export function validateInvestorInterest(value: unknown) {
  const p = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
  const text = (key: string, max: number) => typeof p[key] === "string" ? (p[key] as string).trim().slice(0, max) : "";
  const data = { firstName: text("firstName", 100), email: text("email", 254).toLowerCase(), investorType: text("investorType", 100), region: text("region", 100), ticketSize: text("ticketSize", 100), companyName: text("companyName", 200), assetClasses: Array.isArray(p.assetClasses) ? [...new Set(p.assetClasses.filter((x): x is string => typeof x === "string"))] : [], consent: p.consent === true, websiteUrl: text("websiteUrl", 200), sourcePage: text("sourcePage", 500) };
  const errors: Record<string, string> = {};
  if (!data.firstName) errors.firstName = "Please enter your first name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address";
  if (!investorTypes.includes(data.investorType as typeof investorTypes[number])) errors.investorType = "Please select an investor type";
  if (!investorRegions.includes(data.region as typeof investorRegions[number])) errors.region = "Please select your region";
  if (data.ticketSize && !investorTickets.includes(data.ticketSize as typeof investorTickets[number])) errors.ticketSize = "Please select a ticket size or leave it blank";
  if (!data.assetClasses.length || data.assetClasses.some(x => !investorAssets.includes(x as typeof investorAssets[number]))) errors.assetClasses = "Please choose at least one asset class";
  if (!data.consent) errors.consent = "Please agree to receive updates before submitting";
  return { data, errors };
}
