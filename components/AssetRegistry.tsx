"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { assetRegistry, dated, infrastructureRelationships, issuerListSelection, money, registryUpdated, registryValueStatus, type RegistryAsset } from "@/lib/network-intelligence";
import styles from "./IntelligenceExplorer.module.css";

const classes = [...new Set(assetRegistry.map(asset => asset.assetClass))];
const statuses = ["All value states", "Current disclosure", "Historical value", "Value not verified"];

export function RegistryCoverage({ now }: { now: number }) {
  const current = assetRegistry.filter(asset => registryValueStatus(asset, now) === "Current disclosure").length;
  const historical = assetRegistry.filter(asset => registryValueStatus(asset, now) === "Historical value").length;
  return <section className={styles.registryCoverage} aria-label="Asset registry coverage">
    <div className={styles.sectionHead}><div><h2>Network coverage</h2><p>Research profiles and a dated issuer token-list sample, counted separately.</p></div><a href="/network-explorer/registry">Open asset registry <ArrowUpRight size={15} /></a></div>
    <div className={styles.coverageStats}>
      <div><strong>{assetRegistry.length}</strong><span>Identified assets</span></div>
      <div><strong>{assetRegistry.filter(asset => asset.cohort === "Research profile").length}</strong><span>Research profiles</span></div>
      <div><strong>{assetRegistry.filter(asset => asset.cohort === "Issuer token list").length}</strong><span>Issuer-list sample</span></div>
      <div><strong>{infrastructureRelationships.length}</strong><span>Documented service roles</span></div>
      <div><strong>{current}</strong><span>Current disclosed values</span></div>
      <div><strong>{historical}</strong><span>Historical values</span></div>
      <div><strong>{assetRegistry.length-current-historical}</strong><span>Values not verified</span></div>
      <div><strong>{assetRegistry.filter(asset => asset.contractEvidence).length}</strong><span>Source-listed contract links</span></div>
    </div>
    <div className={styles.coverageRows}>{classes.map(assetClass => {
      const records = assetRegistry.filter(asset => asset.assetClass === assetClass);
      const valued = records.filter(asset => asset.reportedValueUsd !== null).length;
      return <div key={assetClass}><span>{assetClass}</span><div className={styles.coverageTrack} role="img" aria-label={`${valued} of ${records.length} ${assetClass} records have a dated value`}><span style={{width:`${100*valued/records.length}%`}} /></div><strong>{valued}/{records.length}</strong></div>;
    })}</div>
    <p className={styles.disclosure}>The 100 issuer-list rows are an alphabetical sample of Ondo Ethereum securities, not a census of RWA products or independent validation of active trading. Coverage counts describe this registry only; values with different metrics and reporting dates are never added together.</p>
  </section>;
}

export function AssetRegistry({ query, now, onDownload }: { query: string; now: number; onDownload: (rows: RegistryAsset[]) => void }) {
  const [assetClass, setAssetClass] = useState("All asset classes");
  const [cohort, setCohort] = useState("All cohorts");
  const [status, setStatus] = useState("All value states");
  const [visible, setVisible] = useState(30);
  const [citationCopied, setCitationCopied] = useState(false);
  useEffect(() => setVisible(30), [query, assetClass, cohort, status]);
  const rows = assetRegistry.filter(asset =>
    (cohort === "All cohorts" || asset.cohort === cohort) &&
    (assetClass === "All asset classes" || asset.assetClass === assetClass) &&
    (status === "All value states" || registryValueStatus(asset, now) === status) &&
    `${asset.name} ${asset.issuer} ${asset.assetClass} ${asset.structure}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  const displayedRows = rows.slice(0, visible);
  const relationships = infrastructureRelationships.filter(row => `${row.assetId} ${row.provider} ${row.role}`.toLowerCase().includes(query.trim().toLowerCase()));
  const assetName = (id: string) => assetRegistry.find(asset => asset.id === id)?.name || id;
  const citation = `FluidRWA Research Team, Network Explorer: Source-linked asset and infrastructure registry, updated ${dated(registryUpdated)}, https://www.fluidrwa.com/network-explorer/registry`;
  return <>
    <RegistryCoverage now={now} />
    <section className={styles.section}>
      <div className={styles.sectionHead}><div><h2>Asset registry</h2><p>Named assets found in official issuer or platform material. Research profiles and issuer-list rows carry different evidence depth.</p></div><button className={styles.iconButton} aria-label="Download registry CSV" title="Download filtered registry CSV" onClick={() => onDownload(rows)}><ArrowDownToLine size={18} /></button></div>
      <p><a href="/assets/datasets/network-asset-registry.json" download>Download complete registry JSON <ArrowDownToLine size={15} /></a></p>
      <div className={styles.controls}><label>Cohort<select value={cohort} onChange={event => setCohort(event.target.value)}><option>All cohorts</option><option>Research profile</option><option>Issuer token list</option></select></label><label>Asset class<select value={assetClass} onChange={event => setAssetClass(event.target.value)}><option>All asset classes</option>{classes.map(value => <option key={value}>{value}</option>)}</select></label><label>Value status<select value={status} onChange={event => setStatus(event.target.value)}>{statuses.map(value => <option key={value}>{value}</option>)}</select></label><span>{rows.length} of {assetRegistry.length} records</span></div>
      <div className={`${styles.tableWrap} ${styles.registryTable}`}><table><caption className={styles.sr}>Source-linked asset registry and value coverage</caption><thead><tr><th>Asset / organization</th><th>Class and structure</th><th>Value coverage</th><th>Reviewed evidence</th></tr></thead><tbody>{displayedRows.map(asset => <tr key={asset.id}><td><strong>{asset.name}</strong><small>{asset.issuer} · {asset.cohort}</small></td><td>{asset.assetClass}<small>{asset.structure}</small></td><td><strong>{registryValueStatus(asset,now)}</strong><small>{asset.reportedValueUsd === null ? "No comparable figure recorded" : `${money(asset.reportedValueUsd)} · ${asset.reportedMetric} · ${dated(asset.reportedAsOf)}`}</small></td><td><a href={asset.source} target="_blank" rel="noopener noreferrer">{asset.sourceLabel} <ArrowUpRight size={13} /></a><small>{asset.sourcePublished ? `List dated ${dated(asset.sourcePublished)} · ` : ""}Reviewed {dated(asset.sourceReviewed)}</small><small>{asset.contractEvidence ? <a href={asset.contractEvidence} target="_blank" rel="noopener noreferrer">Issuer-listed contract <ArrowUpRight size={13} /></a> : "Contract map not verified"}</small><small>{asset.notes}</small></td></tr>)}</tbody></table></div>
      <div className={styles.registryCards}>{displayedRows.map(asset => <article key={asset.id}><div><h3>{asset.name}</h3><span>{asset.assetClass}</span></div><p>{asset.issuer} · {asset.cohort} · {asset.structure}</p><strong>{registryValueStatus(asset,now)}</strong><p>{asset.reportedValueUsd === null ? "No comparable figure recorded" : `${money(asset.reportedValueUsd)} · ${asset.reportedMetric} · ${dated(asset.reportedAsOf)}`}</p><a href={asset.source} target="_blank" rel="noopener noreferrer">{asset.sourceLabel} <ArrowUpRight size={13} /></a><small>{asset.sourcePublished ? `List dated ${dated(asset.sourcePublished)} · ` : ""}Reviewed {dated(asset.sourceReviewed)}</small>{asset.contractEvidence && <a href={asset.contractEvidence} target="_blank" rel="noopener noreferrer">Issuer-listed contract <ArrowUpRight size={13} /></a>}</article>)}</div>
      {visible < rows.length && <button className={styles.button} type="button" onClick={() => setVisible(visible + 30)}>Show 30 more</button>}
      {!rows.length && <p className={styles.empty}>No asset records match these filters.</p>}
      <p className={styles.disclosure}>{issuerListSelection} Identification confirms the cited material was reviewed; the source list is not an independent live-contract audit. It does not imply FluidRWA vetting, current fund size, investor eligibility or a complete market map. Missing figures are not zeros.</p>
    </section>
    <section className={styles.section} aria-labelledby="infrastructure-map-title">
      <div className={styles.sectionHead}><div><h2 id="infrastructure-map-title">Who powers these assets?</h2><p>{relationships.length} source-linked service roles in reviewed issuer, platform and regulatory material. Roles are not endorsements or market-share estimates.</p></div></div>
      <p className={styles.downloads}><a href="/assets/datasets/network-infrastructure-relationships.csv" download>Download roles CSV <ArrowDownToLine size={15} /></a><a href="/assets/datasets/network-infrastructure-relationships.json" download>Download roles JSON <ArrowDownToLine size={15} /></a></p>
      <div className={`${styles.tableWrap} ${styles.registryTable}`}><table><caption className={styles.sr}>Documented relationships between assets and service providers</caption><thead><tr><th>Asset</th><th>Provider</th><th>Documented role</th><th>Evidence and scope</th></tr></thead><tbody>{relationships.map(row => <tr key={row.id}><td><strong>{assetName(row.assetId)}</strong></td><td>{row.provider}</td><td>{row.role}</td><td><a href={row.source} target="_blank" rel="noopener noreferrer">{row.sourceLabel} <ArrowUpRight size={13} /></a><small>{row.sourceDate ? `Document dated ${dated(row.sourceDate)} · ` : ""}Reviewed {dated(row.reviewed)}</small><small>{row.scope}</small></td></tr>)}</tbody></table></div>
      <div className={styles.registryCards}>{relationships.map(row => <article key={row.id}><div><h3>{assetName(row.assetId)}</h3><span>{row.role}</span></div><p>{row.provider}</p><a href={row.source} target="_blank" rel="noopener noreferrer">{row.sourceLabel} <ArrowUpRight size={13} /></a><small>{row.sourceDate ? `Document dated ${dated(row.sourceDate)} · ` : ""}Reviewed {dated(row.reviewed)}</small><p>{row.scope}</p></article>)}</div>
      {!relationships.length && <p className={styles.empty}>No documented roles match this search.</p>}
      <p className={styles.disclosure}>A named role can change. Launch announcements are labeled with their original date; check current offering documents before procurement.</p>
    </section>
    <section className={styles.section} aria-labelledby="cite-registry-title"><h2 id="cite-registry-title">How to cite this edition</h2><p>{citation}</p><button className={styles.button} type="button" onClick={async () => { try { await navigator.clipboard.writeText(citation); setCitationCopied(true); } catch { setCitationCopied(false); } }}>{citationCopied ? "Copied" : "Copy citation"}</button></section>
    <section className={styles.section} aria-labelledby="submit-evidence-title"><h2 id="submit-evidence-title">Add or correct an asset</h2><p>Issuers and service providers can send an official product page, issuer and legal-vehicle name, symbol, chain and contract, and dated documents naming any service providers. If submitting a value, include its exact metric, currency, reporting date and calculation source. We review evidence before updating the public dataset; submission does not confer a vetting badge.</p><a href="mailto:contact@fluidrwa.com?subject=Network%20Explorer%20asset%20evidence">Send asset evidence to contact@fluidrwa.com <ArrowUpRight size={15} /></a></section>
  </>;
}
