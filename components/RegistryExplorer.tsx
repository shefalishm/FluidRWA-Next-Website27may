"use client";

import { useMemo, useState } from "react";
import type { OpenRegistryVendor } from "@/lib/registry";

type RegistryExplorerProps = {
  vendors: OpenRegistryVendor[];
  categories: string[];
  specificCategories: string[];
  chains: string[];
  updatedAt: string;
};

export function RegistryExplorer({ vendors, categories, specificCategories, chains, updatedAt }: RegistryExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [chain, setChain] = useState("");
  const [tier, setTier] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vendors.filter((vendor) => {
      const categoryMatch = !category || vendor.categories.includes(category) || vendor.specificCategories.includes(category);
      const chainMatch = !chain || vendor.chains.includes(chain);
      const tierMatch = !tier || vendor.verificationTier === tier;
      const queryMatch =
        !q ||
        `${vendor.name} ${vendor.description} ${vendor.longDescription} ${vendor.categories.join(" ")} ${vendor.specificCategories.join(" ")} ${vendor.chains.join(" ")}`
          .toLowerCase()
          .includes(q);
      return categoryMatch && chainMatch && tierMatch && queryMatch;
    });
  }, [vendors, query, category, chain, tier]);

  const combinedCategories = [...new Set([...categories, ...specificCategories])].sort();

  return (
    <section className="registry-explorer" aria-label="Web3 vendor explorer">
      <div className="registry-controls">
        <label>
          <span>Search vendors</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search custody, Ethereum, KYC, tokenization..." />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">All categories</option>
            {combinedCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Chain</span>
          <select value={chain} onChange={(event) => setChain(event.target.value)}>
            <option value="">All chains</option>
            {chains.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Tier</span>
          <select value={tier} onChange={(event) => setTier(event.target.value)}>
            <option value="">All tiers</option>
            <option value="premium-vetted">Premium vetted</option>
            <option value="vetted">Vetted</option>
            <option value="free">Tracked listing</option>
          </select>
        </label>
      </div>

      <div className="registry-toolbar">
        <p>
          <strong>{filtered.length}</strong> vendors shown. Updated {new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.
        </p>
      </div>

      <div className="registry-grid">
        {filtered.map((vendor) => (
          <article className={`registry-card tier-${vendor.verificationTier}`} key={vendor.slug}>
            <div className="registry-card-top">
              <div>
                <p className="registry-card-kicker">{vendor.specificCategories[0] || vendor.categories[0]}</p>
                <h2>{vendor.name}</h2>
              </div>
              <span>{vendor.verificationTier === "free" ? "tracked" : vendor.verificationTier.replace("-", " ")}</span>
            </div>
            <p>{vendor.description}</p>
            <div className="registry-tags">
              {vendor.categories.slice(0, 2).map((item) => (
                <span key={item}>{item}</span>
              ))}
              {vendor.chains.slice(0, 3).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a href={`/registry/${vendor.slug}`}>View vendor profile</a>
          </article>
        ))}
      </div>
    </section>
  );
}
