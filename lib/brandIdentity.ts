import identity from "@/data/brand-identity.json";

export const brandIdentity = identity;
export const organizationId = `${identity.url}/#organization`;
export const researchTeamId = `${identity.url}/about#research-team`;
export const leadershipNodes = identity.leadership.map((person) => ({
  "@type": "Person",
  "@id": `${identity.url}/about#${person.id}`,
  name: person.name,
  jobTitle: person.title,
  url: `${identity.url}/about#${person.id}`,
  sameAs: [person.linkedin],
  worksFor: { "@id": organizationId }
}));

export const organizationNode = {
  "@type": "Organization",
  "@id": organizationId,
  name: identity.name,
  alternateName: identity.alternateName,
  url: identity.url,
  mainEntityOfPage: { "@id": `${identity.url}/about#webpage` },
  logo: { "@type": "ImageObject", url: `${identity.url}/assets/fluidrwa-small-logo.png` },
  email: identity.email,
  description: identity.description,
  founder: leadershipNodes.map((person) => ({ "@id": person["@id"] })),
  sameAs: identity.socialLinks.map((link) => link.href),
  knowsAbout: ["RWA tokenization", "Web3 infrastructure", "AI tools", "Digital asset custody", "Stablecoin payments", "Vendor selection"],
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${identity.url}/contact`, email: identity.email }
};

export const researchTeamNode = {
  "@type": "Organization",
  "@id": researchTeamId,
  name: "FluidRWA Research Team",
  url: `${identity.url}/about#research-team`,
  parentOrganization: { "@id": organizationId }
};
