"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { assetRegistry, dated, money, registryValueStatus, type RegistryAsset } from "@/lib/network-intelligence";
import styles from "./IntelligenceExplorer.module.css";

const classes = [...new Set(assetRegistry.map(asset => asset.assetClass))];
const statuses = ["All value states", "Current disclosure", "Historical value", "Value not verified"];

export function RegistryCoverage({ now }: { now: number }) {
  const current = assetRegistry.filter(asset => registryValueStatus(asset, now) === "Current disclosure").length;
  const historical = assetRegistry.filter(asset => registryValueStatus(asset, now) === "Historical value").length;
  return <section className={styles.registryCoverage} aria-label="Asset registry coverage">
    <div className={styles.sectionHead}><div><h2>Market coverage</h2><p>Progress within the FluidRWA registry. No global market denominator is claimed.</p></div><a href="/network-explorer/registry">Open asset registry <ArrowUpRight size={15} /></a></div>
    <div className={styles.coverageStats}>
      <div><strong>{assetRegistry.length}</strong><span>Identified assets</span></div>
      <div><strong>{classes.length}</strong><span>Asset classes</span></div>
      <div><strong>{current}</strong><span>Current disclosed values</span></div>
      <div><strong>{historical}</strong><span>Historical values</span></div>
      <div><strong>{assetRegistry.length-current-historical}</strong><span>Values not verified</span></div>
      <div><strong>{assetRegistry.filter(asset => asset.contractEvidence).length}</strong><span>Source-linked contract maps</span></div>
    </div>
    <div className={styles.coverageRows}>{classes.map(assetClass => {
      const records = assetRegistry.filter(asset => asset.assetClass === assetClass);
      const valued = records.filter(asset => asset.reportedValueUsd !== null).length;
      return <div key={assetClass}><span>{assetClass}</span><div className={styles.coverageTrack} role="img" aria-label={`${valued} of ${records.length} ${assetClass} records have a dated value`}><span style={{width:`${100*valued/records.length}%`}} /></div><strong>{valued}/{records.length}</strong></div>;
    })}</div>
    <p className={styles.disclosure}>A source-linked asset can be listed without a verified value. Coverage counts describe this registry only; values with different metrics and reporting dates are never added together.</p>
  </section>;
}

export function AssetRegistry({ query, now, onDownload }: { query: string; now: number; onDownload: (rows: RegistryAsset[]) => void }) {
  const [assetClass, setAssetClass] = useState("All asset classes");
  const [status, setStatus] = useState("All value states");
  const rows = assetRegistry.filter(asset =>
    (assetClass === "All asset classes" || asset.assetClass === assetClass) &&
    (status === "All value states" || registryValueStatus(asset, now) === status) &&
    `${asset.name} ${asset.issuer} ${asset.assetClass} ${asset.structure}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  return <>
    <RegistryCoverage now={now} />
    <section className={styles.section}>
      <div className={styles.sectionHead}><div><h2>Asset registry</h2><p>Named assets found in official issuer or platform material. Every row links to its reviewed source.</p></div><button className={styles.iconButton} aria-label="Download registry CSV" title="Download filtered registry CSV" onClick={() => onDownload(rows)}><ArrowDownToLine size={18} /></button></div>
      <p><a href="/assets/datasets/network-asset-registry.json" download>Download complete registry JSON <ArrowDownToLine size={15} /></a></p>
      <div className={styles.controls}><label>Asset class<select value={assetClass} onChange={event => setAssetClass(event.target.value)}><option>All asset classes</option>{classes.map(value => <option key={value}>{value}</option>)}</select></label><label>Value status<select value={status} onChange={event => setStatus(event.target.value)}>{statuses.map(value => <option key={value}>{value}</option>)}</select></label><span>{rows.length} of {assetRegistry.length} records</span></div>
      <div className={`${styles.tableWrap} ${styles.registryTable}`}><table><caption className={styles.sr}>Source-linked asset registry and value coverage</caption><thead><tr><th>Asset / organization</th><th>Class and structure</th><th>Value coverage</th><th>Reviewed evidence</th></tr></thead><tbody>{rows.map(asset => <tr key={asset.id}><td><strong>{asset.name}</strong><small>{asset.issuer}</small></td><td>{asset.assetClass}<small>{asset.structure}</small></td><td><strong>{registryValueStatus(asset,now)}</strong><small>{asset.reportedValueUsd === null ? "No comparable figure recorded" : `${money(asset.reportedValueUsd)} · ${asset.reportedMetric} · ${dated(asset.reportedAsOf)}`}</small></td><td><a href={asset.source} target="_blank" rel="noopener noreferrer">{asset.sourceLabel} <ArrowUpRight size={13} /></a><small>Source reviewed {dated(asset.sourceReviewed)}</small><small>{asset.contractEvidence ? <a href={asset.contractEvidence} target="_blank" rel="noopener noreferrer">Deployment evidence <ArrowUpRight size={13} /></a> : "Contract map not verified"}</small><small>{asset.notes}</small></td></tr>)}</tbody></table></div>
      <div className={styles.registryCards}>{rows.map(asset => <article key={asset.id}><div><h3>{asset.name}</h3><span>{asset.assetClass}</span></div><p>{asset.issuer} · {asset.structure}</p><strong>{registryValueStatus(asset,now)}</strong><p>{asset.reportedValueUsd === null ? "No comparable figure recorded" : `${money(asset.reportedValueUsd)} · ${asset.reportedMetric} · ${dated(asset.reportedAsOf)}`}</p><a href={asset.source} target="_blank" rel="noopener noreferrer">{asset.sourceLabel} <ArrowUpRight size={13} /></a><small>Source reviewed {dated(asset.sourceReviewed)} · {asset.contractEvidence ? "Deployment evidence linked in dataset" : "Contract map not verified"}</small></article>)}</div>
      {!rows.length && <p className={styles.empty}>No asset records match these filters.</p>}
      <p className={styles.disclosure}>Identification confirms the cited product documentation was reviewed. It does not imply FluidRWA vetting, current fund size, investor eligibility or a complete contract map. Missing figures are not zeros.</p>
    </section>
  </>;
}
