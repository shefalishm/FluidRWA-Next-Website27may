"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { changePercent, comparisonForDays, displayUnits, type OnchainSupplyObservation } from "@/lib/onchainSupply";
import styles from "./OnchainSupplyMonitor.module.css";
import initialSnapshot from "@/data/onchain-supply-page-snapshot.json";

type Series = {
  id: string;
  symbol: string;
  assetClass: string;
  referenceAsset?: string;
  issuer: string;
  network: string;
  chainId: number;
  address: string;
  source: string;
  explorer: string;
  observations: OnchainSupplyObservation[];
};
type SupplyResponse = { metric: string; method: string; series: Series[] };

function downloadCsv(series: Series[]) {
  const header = "asset_id,symbol,asset_class,reference_asset,issuer,network,chain_id,contract_address,utc_day,raw_supply,decimals,block_number,block_timestamp,observed_at,issuer_source";
  const rows = series.flatMap(item => item.observations.map(row => [
    item.id, item.symbol, item.assetClass, item.referenceAsset ?? "", item.issuer, item.network, row.chain_id, row.contract_address, row.day,
    row.raw_supply, row.decimals, row.block_number, row.block_timestamp, row.observed_at, item.source
  ].map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")));
  const url = URL.createObjectURL(new Blob([[header, ...rows].join("\r\n")], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "fluidrwa-onchain-supply-observations.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function trend(rows: OnchainSupplyObservation[], days: number) {
  if (rows.length < 2) return null;
  const end = Date.parse(`${rows.at(-1)!.day}T00:00:00Z`);
  const visible = rows.filter(row => Date.parse(`${row.day}T00:00:00Z`) >= end - days * 86400000);
  if (visible.length < 2) return null;
  const values = visible.map(row => Number(BigInt(row.raw_supply)));
  const min = Math.min(...values), max = Math.max(...values);
  const range = max - min || 1;
  const points = visible.map((row, index) => `${24 + index * 752 / (visible.length - 1)},${174 - (values[index] - min) * 136 / range}`).join(" ");
  const first = visible[0], last = visible.at(-1)!;
  return { points, first, last, change: changePercent(last.raw_supply, first.raw_supply) };
}

function previousDailyChange(rows: OnchainSupplyObservation[]) {
  if (rows.length < 2) return null;
  const latest = rows.at(-1)!;
  const previous = rows.at(-2)!;
  if (Date.parse(`${latest.day}T00:00:00Z`) - Date.parse(`${previous.day}T00:00:00Z`) !== 86400000) return null;
  return { previous, latest, percent: changePercent(latest.raw_supply, previous.raw_supply) };
}

export function OnchainSupplyMonitor() {
  const [data, setData] = useState<SupplyResponse | null>(initialSnapshot as SupplyResponse);
  const [error, setError] = useState(false);
  const [period, setPeriod] = useState(7);
  const [assetClass, setAssetClass] = useState("All assets");
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    const controller = new AbortController();
    fetch("/api/network-explorer/onchain-supply", { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("unavailable"); return response.json(); })
      .then((payload: SupplyResponse) => setData(payload))
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, []);

  return <section className={styles.monitor} aria-labelledby="onchain-supply-title">
    <div className={styles.heading}>
      <div><p className={styles.eyebrow}>ORIGINAL ON-CHAIN OBSERVATIONS</p><h2 id="onchain-supply-title">Contract supply monitor</h2><p>Issuer-documented token contracts, measured at recorded blocks. History begins with the first verified capture.</p></div>
      {data?.series.some(item => item.observations.length) && <button type="button" title="Download source observations as CSV" onClick={() => downloadCsv(data.series)}><ArrowDownToLine size={17} /> Download CSV</button>}
    </div>
    <div className={styles.scope}>Metric: ERC-20 <code>totalSupply()</code> in native token units. Stablecoins, notes, fund shares, gold tokens and tokenized securities cannot be added into one value. A security's reference asset identifies its price exposure, not ownership of underlying shares. This does not establish circulating supply, reserves, fund NAV, market value or complete chain coverage.</div>
    <p className={styles.notice}>The initial page includes saved observations captured {initialSnapshot.pageSnapshotCapturedAt.slice(0, 10)} UTC. It checks for newer readings when opened; each measurement retains its own date and block.</p>
    {error && <p className={styles.notice}>The latest measurement feed is temporarily unavailable. Saved dated observations remain visible below; do not treat them as today's readings.</p>}
    {!data && !error && <p className={styles.notice}>Loading dated observations...</p>}
    {data && <>
      <div className={styles.summary} aria-label="Measured coverage">
        <div><strong>{data.series.length}</strong><span>documented contracts</span></div>
        <div><strong>{new Set(data.series.map(item => item.network)).size}</strong><span>networks</span></div>
        <div><strong>{today ? data.series.filter(item => item.observations.at(-1)?.day === today).length : "Checking"}</strong><span>captured today (UTC)</span></div>
        <div><strong>{data.series.filter(item => previousDailyChange(item.observations)).length}</strong><span>with consecutive-day comparison</span></div>
      </div>
      <div className={styles.filters} role="group" aria-label="Filter by asset type">{["All assets", ...new Set(data.series.map(item => item.assetClass))].map(category => <button key={category} type="button" aria-pressed={assetClass === category} onClick={() => setAssetClass(category)}>{category}<span>{category === "All assets" ? data.series.length : data.series.filter(item => item.assetClass === category).length}</span></button>)}</div>
      <div className={styles.periods} role="group" aria-label="Chart period">{[[7, "7D"], [30, "30D"], [365, "1Y"]].map(([days, label]) => <button key={days} type="button" aria-pressed={period === days} onClick={() => setPeriod(Number(days))}>{label}</button>)}</div>
      <div className={styles.seriesList}>{data.series.filter(item => assetClass === "All assets" || item.assetClass === assetClass).map(item => {
        const latest = item.observations.at(-1);
        const chart = trend(item.observations, period);
        const daily = previousDailyChange(item.observations);
        return <article key={item.id} className={styles.series}>
          <div className={styles.seriesTitle}><div><h3>{item.symbol} <span>on {item.network}</span></h3><p>{item.assetClass}{item.referenceAsset ? ` · ${item.referenceAsset} reference` : ""} · {item.issuer} · chain {item.chainId}</p></div><strong>{latest ? displayUnits(latest.raw_supply, latest.decimals, item.assetClass === "Stablecoin" ? 0 : 2) : "Awaiting first capture"}<small>{latest ? "tokens in contract totalSupply" : "No published measurement yet"}</small></strong></div>
          <p className={`${styles.captureStatus} ${today && latest?.day === today ? styles.captureCurrent : styles.capturePending}`}>{!today ? latest ? `Saved capture ${latest.day}` : "First reading pending" : latest?.day === today ? "Captured today" : latest ? `Latest capture ${latest.day}; today's reading pending` : "First reading pending"} · UTC</p>
          {daily && <p className={styles.dailyChange}><strong>{daily.percent === null ? "Change unavailable" : `${daily.percent > 0 ? "+" : ""}${daily.percent.toFixed(2)}%`}</strong> versus the previous daily capture <span>({daily.previous.day} to {daily.latest.day}, UTC)</span></p>}
          {chart ? <svg className={styles.chart} viewBox="0 0 800 210" role="img" aria-label={`${item.symbol} on ${item.network}: contract total supply changed ${chart.change === null ? "an unknown amount" : `${chart.change}%`} between ${chart.first.day} and ${chart.last.day}`}><path d="M24 174H776" stroke="#dce5ed" strokeWidth="1"/><polyline points={chart.points} fill="none" stroke="#276db4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="776" cy={chart.points.split(" ").at(-1)!.split(",")[1]} r="5" fill="#e8be38" /></svg> : <div className={styles.noHistory}>A {period === 365 ? "yearly" : `${period}-day`} chart will appear after enough dated observations. No earlier values have been inferred.</div>}
          {chart && <p className={styles.chartCaption}>Observed range: {chart.first.day} to {chart.last.day}. This may be shorter than the selected {period === 365 ? "one-year" : `${period}-day`} window.</p>}
          <div className={styles.deltas}>{[[7, "7D"], [30, "30D"], [365, "1Y"]].map(([days, label]) => { const value = comparisonForDays(item.observations, Number(days)); return <div key={days}><span>{label} change</span><strong>{value === null ? "Not yet available" : `${value > 0 ? "+" : ""}${value.toFixed(2)}%`}</strong></div>; })}</div>
          <p className={styles.meta}>{latest ? `Observed ${latest.observed_at.slice(0, 16).replace("T", " ")} UTC at block ${latest.block_number.toLocaleString()}.` : "First scheduled reading pending."} <a href={item.source} target="_blank" rel="noopener noreferrer">Issuer contract reference <ArrowUpRight size={13}/></a> <a href={item.explorer} target="_blank" rel="noopener noreferrer">Block explorer <ArrowUpRight size={13}/></a></p>
        </article>;
      })}</div>
      <div className={styles.method}><h3>Calculation and limits</h3><p>{data.method} A daily observation is the first successful reading after 00:00 UTC. If a source is unavailable, the previous dated reading stays visible and scheduled runs retry during the same UTC day. Missed past days are not backfilled or inferred. Previous-capture change requires observations on consecutive UTC dates. The 7-day, 30-day and one-year figures require a dated baseline on the target day or the preceding day; otherwise they are withheld. The exact block, timestamp and raw integer are in the CSV.</p><a href="/network-explorer/methodology">Read the full methodology <ArrowUpRight size={14}/></a></div>
    </>}
  </section>;
}
