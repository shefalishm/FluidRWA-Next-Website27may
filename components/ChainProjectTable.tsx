"use client";

import { useMemo, useState } from "react";
import type { ChainProject } from "@/lib/chainEcosystem";

type ChainProjectTableProps = {
  projects: ChainProject[];
  chainName: string;
};

const reviewDate = "2026-06-29";

function inferBuyerFit(project: ChainProject) {
  const category = project.category.toLowerCase();
  if (project.targetUsers?.length) return project.targetUsers.join(", ");
  if (category.includes("defi")) return "Liquidity, yield, lending and trading teams";
  if (category.includes("payment") || category.includes("stablecoin")) return "Payment, treasury and settlement operators";
  if (category.includes("wallet")) return "Consumer onboarding and self-custody users";
  if (category.includes("rwa") || category.includes("real world")) return "Tokenized asset issuers and institutional allocators";
  if (category.includes("developer") || category.includes("infrastructure") || category.includes("oracle")) return "Protocol teams and application developers";
  if (category.includes("gaming") || category.includes("nft") || category.includes("consumer")) return "Consumer app, gaming and creator economy teams";
  return `${project.category} evaluators and ecosystem researchers`;
}

function inferMarketRole(project: ChainProject) {
  const category = project.category.toLowerCase();
  if (project.useCases?.length) return project.useCases.join(" / ");
  if (category.includes("defi")) return "Capital markets primitive";
  if (category.includes("payment")) return "Payment and settlement rail";
  if (category.includes("stablecoin")) return "Stablecoin liquidity layer";
  if (category.includes("wallet")) return "Access and onboarding layer";
  if (category.includes("interoperability")) return "Cross-chain connectivity layer";
  if (category.includes("oracle")) return "Data and price infrastructure";
  if (category.includes("developer")) return "Builder infrastructure layer";
  if (category.includes("rwa") || category.includes("real world")) return "Tokenized asset distribution";
  if (category.includes("depin")) return "Physical infrastructure network";
  return "Ecosystem application";
}

function inferSignals(project: ChainProject) {
  if (project.keySignals?.length) return project.keySignals.slice(0, 3);
  const signals = [project.status === "Live" ? "Live ecosystem activity" : `${project.status} status`];
  if (project.region === "Global") signals.push("Global coverage");
  if (/stablecoin|payment|treasury|yield|lending|liquidity|oracle|wallet|rwa|tokenized/i.test(project.description)) {
    signals.push("Commercially relevant use case");
  } else {
    signals.push("Category fit mapped");
  }
  return signals;
}

function verificationLabel(project: ChainProject) {
  if (project.verificationStatus) return project.verificationStatus;
  if (project.status === "Historical") return "Historical";
  return "Directory research";
}

export function ChainProjectTable({ projects, chainName }: ChainProjectTableProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [region, setRegion] = useState("");

  const categories = useMemo(() => [...new Set(projects.map((project) => project.category))].sort(), [projects]);
  const statuses = useMemo(() => [...new Set(projects.map((project) => project.status))].sort(), [projects]);
  const regions = useMemo(() => [...new Set(projects.map((project) => project.region))].sort(), [projects]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return projects.filter((project) => {
      const signals = inferSignals(project).join(" ");
      const searchMatch =
        !search ||
        `${project.name} ${project.category} ${project.description} ${project.status} ${project.region} ${inferMarketRole(project)} ${inferBuyerFit(project)} ${signals}`.toLowerCase().includes(search);
      return searchMatch && (!category || project.category === category) && (!status || project.status === status) && (!region || project.region === region);
    });
  }, [projects, query, category, status, region]);

  return (
    <section className="chain-table-section" aria-label={`${chainName} projects`}>
      <div className="chain-table-heading">
        <div>
          <p className="public-eyebrow">Project intelligence table</p>
          <h2>{chainName} project landscape</h2>
        </div>
        <p>
          Built for buyer research, sponsor-ready listings and future verified profile upgrades while keeping the page easy to scan.
        </p>
      </div>

      <div className="chain-table-controls">
        <label>
          Search projects
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search project, buyer fit, signal or category" />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="">All categories</option>
            {categories.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label>
          Region
          <select value={region} onChange={(event) => setRegion(event.target.value)}>
            <option value="">All regions</option>
            {regions.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="chain-table-count">
        <span>{filtered.length} projects shown</span>
        <span>{categories.length} categories</span>
        <span>Reviewed {reviewDate}</span>
      </div>

      <div className="chain-table-wrap">
        <table className="chain-project-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>Market role</th>
              <th>Buyer fit</th>
              <th>Listing signal</th>
              <th>Due diligence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project) => (
              <tr key={`${project.name}-${project.category}`}>
                <td>
                  <div className="chain-project-name">
                    <strong>{project.name}</strong>
                    {project.listingTier ? <span>{project.listingTier}</span> : null}
                  </div>
                  <p>{project.description}</p>
                </td>
                <td>
                  <span className="chain-pill">{project.category}</span>
                </td>
                <td>{inferMarketRole(project)}</td>
                <td>{inferBuyerFit(project)}</td>
                <td>
                  <div className="chain-signal-list">
                    {inferSignals(project).map((signal) => (
                      <span key={signal}>{signal}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="chain-diligence-cell">
                    <span className={`chain-status-badge status-${project.status.toLowerCase().replaceAll(" ", "-")}`}>{project.status}</span>
                    <span>{project.region}</span>
                    <span>{verificationLabel(project)}</span>
                    <span>Reviewed {project.lastReviewed ?? reviewDate}</span>
                    {project.website ? <a href={project.website}>Website</a> : <span>Profile expandable</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
