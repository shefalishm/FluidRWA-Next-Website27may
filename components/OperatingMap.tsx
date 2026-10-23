"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Building2, CircleHelp, Link2 } from "lucide-react";
import { assetRegistry, dated, infrastructureRelationships } from "@/lib/network-intelligence";
import { providerGroup } from "@/lib/fund-comparison";
import styles from "./OperatingMap.module.css";

const mappedIds = [...new Set(infrastructureRelationships.map(edge => edge.assetId))];
const mappedAssets = mappedIds.map(id => assetRegistry.find(asset => asset.id === id)).filter(asset => asset !== undefined);

export function OperatingMap() {
  const [selectedId, setSelectedId] = useState(mappedIds[0]);
  const asset = mappedAssets.find(row => row.id === selectedId) || mappedAssets[0];
  const edges = infrastructureRelationships.filter(edge => edge.assetId === asset.id);
  const sources = [...new Set(edges.map(edge => edge.source))];

  return <section className={styles.section} aria-labelledby="operating-map-heading">
    <div className={styles.intro}>
      <div>
        <p className={styles.eyebrow}>THE OPERATING MAP</p>
        <h2 id="operating-map-heading">Who makes a tokenized asset work?</h2>
        <p>Choose an asset to see the organizations named in its public documents. Each connection says what role was documented and when. An empty role is an unanswered question, not proof that nobody performs it.</p>
      </div>
      <a href="/network-explorer/registry">Explore the registry <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>
    <div className={styles.scope} aria-label="Current operating-map scope">
      <div><strong>{mappedAssets.length}</strong><span>assets with documented roles</span></div>
      <div><strong>{infrastructureRelationships.length}</strong><span>source-linked connections</span></div>
      <div><strong>{new Set(infrastructureRelationships.map(edge => providerGroup(edge.provider))).size}</strong><span>provider name groups</span></div>
    </div>
    <p className={styles.groupNote}>{new Set(infrastructureRelationships.map(edge => edge.provider)).size} source-name labels; BNY and Anchorage variants are grouped for browsing. This is not a count of distinct legal entities. Separate CACEIS and Superstate entities remain separate; other unresolved names have not been merged.</p>
    <label className={styles.selector}>Choose an asset
      <select value={selectedId} onChange={event => setSelectedId(event.target.value)}>
        {mappedAssets.map(row => <option key={row.id} value={row.id}>{row.name}</option>)}
      </select>
    </label>
    <div className={styles.map}>
      <div className={styles.asset}>
        <span>ASSET</span>
        <h3>{asset.name}</h3>
        <p>{asset.issuer}</p>
        <p>{asset.assetClass}</p>
        <a href={asset.source} target="_blank" rel="noopener noreferrer">Asset evidence <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
      <div className={styles.connections}>
        {edges.map(edge => <div className={styles.edge} key={edge.id}>
          <div className={styles.role}><Link2 size={15} aria-hidden="true" /><span>{edge.role}</span></div>
          <div className={styles.provider}><Building2 size={17} aria-hidden="true" /><div><strong>{edge.provider}</strong><small>{edge.scope}</small><a href={edge.source} target="_blank" rel="noopener noreferrer">{edge.sourceLabel} <ArrowUpRight size={12} aria-hidden="true" /></a><small>{edge.sourceDate ? `Document dated ${dated(edge.sourceDate)} · ` : ""}Reviewed {dated(edge.reviewed)}</small></div></div>
        </div>)}
      </div>
    </div>
    <div className={styles.foot}><CircleHelp size={17} aria-hidden="true" /><p><strong>What this does not tell you:</strong> The {edges.length} documented roles for {asset.name} come from {sources.length} reviewed source{sources.length === 1 ? "" : "s"}. They do not establish every current service provider, commercial arrangement, investor eligibility or vendor endorsement. Confirm material roles in current offering documents.</p></div>
    <div className={styles.actions}><a href="/api/network-explorer/v1/relationships" target="_blank" rel="noopener noreferrer">Open the public data <ArrowUpRight size={15} aria-hidden="true" /></a><a href="/assets/datasets/network-infrastructure-relationships.csv" download>Download connections <ArrowDownToLine size={15} aria-hidden="true" /></a></div>
  </section>;
}
