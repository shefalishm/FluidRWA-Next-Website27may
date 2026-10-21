"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import report from "@/data/research/tokenized-fund-infrastructure-2026-10-v1.json";
import styles from "./FundResearch.module.css";

type Fund = typeof report.funds[number];
function RoleEvidence({ fund, role }: { fund: Fund; role: string }) {
  const claim = fund.claims.find(c => c.role === role);
  if (!claim) return <span className={styles.unknown}>Not identified here</span>;
  const source = report.sources.find(s => s.id === claim.source)!;
  return <><strong>{claim.provider}</strong><small>{claim.scope}</small><a href={source.url} target="_blank" rel="noopener noreferrer">Source</a><small>{source.published ? `Document: ${source.published}` : "Document undated"}</small></>;
}
function Product({ fund }: { fund: Fund }) {
  return <><strong>{fund.ticker}</strong><span>{fund.name}</span><small>{fund.structure}</small><details><summary>Research notes and sources</summary><p>{fund.note}</p><ul>{fund.sources.map(id => { const source=report.sources.find(s=>s.id===id)!; return <li key={id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a><small>{source.locator}</small></li>; })}</ul></details></>;
}
export default function FundResearchTable() {
  const [ready,setReady]=useState(false);
  useEffect(()=>setReady(true),[]);
  const [query,setQuery]=useState("");
  const [structure,setStructure]=useState("");
  const funds=report.funds.filter(f => (!structure || f.structure===structure) && `${f.ticker} ${f.name} ${f.family} ${f.claims.map(c=>c.provider).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div>
    <div className={styles.filters} aria-busy={!ready}><label><span>Find a fund or provider</span><div><Search size={18} aria-hidden="true"/><input type="search" disabled={!ready} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Fund, ticker or provider"/></div></label><label><span>Product structure</span><select disabled={!ready} value={structure} onChange={e=>setStructure(e.target.value)}><option value="">All structures</option>{[...new Set(report.funds.map(f=>f.structure))].map(s=><option key={s}>{s}</option>)}</select></label></div>
    <p aria-live="polite">{funds.length} of {report.funds.length} products</p>
    <div className={styles.tableWrap}><table><caption>Service providers identified in public documents. Reviewed 21 October 2026.</caption><thead><tr><th>Fund</th>{report.roles.map(r=><th key={r.id}>{r.label}</th>)}</tr></thead><tbody>{funds.map(fund=><tr key={fund.id}><th scope="row"><Product fund={fund}/></th>{report.roles.map(role=><td key={role.id}><RoleEvidence fund={fund} role={role.id}/></td>)}</tr>)}</tbody></table></div>
    <div className={styles.mobileRows}>{funds.map(fund=><article key={fund.id}><Product fund={fund}/><dl>{report.roles.map(role=><div key={role.id}><dt>{role.label}</dt><dd><RoleEvidence fund={fund} role={role.id}/></dd></div>)}</dl></article>)}</div>
    {!funds.length && <p>No products match these filters.</p>}
  </div>;
}
