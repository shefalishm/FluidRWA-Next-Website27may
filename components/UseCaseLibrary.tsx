"use client";

import { useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
type LibraryItem = { slug: string; title: string; group: string; industry: string; image: string; imageAlt: string; summary: string; stack: string[] };

const groups = ["All use cases", "Financial services", "Enterprise operations", "Consumer applications"];

export function UseCaseLibrary({ items }: { items: LibraryItem[] }) {
  const [group, setGroup] = useState(groups[0]);
  const [query, setQuery] = useState("");
  const visible = items.filter((item) => (group === groups[0] || item.group === group)
    && `${item.title} ${item.industry} ${item.summary} ${item.stack.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="uc-library" id="library"><div className="uc-container">
    <div className="uc-library-toolbar"><div className="uc-filters" role="group" aria-label="Use case sector">{groups.map((label) => <button key={label} aria-pressed={group === label} onClick={() => setGroup(label)}>{label}</button>)}</div>
      <div className="uc-search"><Search size={18} aria-hidden="true" /><input aria-label="Search use cases" placeholder="Search use cases" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button aria-label="Clear search" title="Clear search" onClick={() => setQuery("")}><X size={16} /></button>}</div></div>
    <p className="uc-result-count" role="status">{visible.length} use cases</p>
    <div className="uc-library-grid">{visible.map((item) => <a className="uc-library-item" href={`/use-cases/${item.slug}`} key={item.slug}>
      <div className="uc-item-image"><img src={item.image} alt={item.imageAlt} width={900} height={600} loading="lazy" decoding="async" /></div>
      <div className="uc-item-copy"><p className="uc-kicker">{item.industry}</p><h2>{item.title}</h2><p>{item.summary}</p><span className="uc-item-link">Explore use case <ArrowRight size={17} aria-hidden="true" /></span></div>
    </a>)}</div>
    {!visible.length && <div className="uc-empty"><h2>No matching use cases</h2><button onClick={() => { setQuery(""); setGroup(groups[0]); }}>Reset filters</button></div>}
  </div></section>;
}
