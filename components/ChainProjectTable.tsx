"use client";

import { useMemo, useState } from "react";
import type { ChainProject } from "@/lib/chainEcosystem";

type ChainProjectTableProps = {
  projects: ChainProject[];
  chainName: string;
};

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
      const searchMatch =
        !search ||
        `${project.name} ${project.category} ${project.description} ${project.status} ${project.region}`.toLowerCase().includes(search);
      return searchMatch && (!category || project.category === category) && (!status || project.status === status) && (!region || project.region === region);
    });
  }, [projects, query, category, status, region]);

  return (
    <section className="chain-table-section" aria-label={`${chainName} projects`}>
      <div className="chain-table-controls">
        <label>
          Search projects
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by project, use case, category" />
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

      <p className="chain-table-count">{filtered.length} projects shown</p>

      <div className="chain-table-wrap">
        <table className="chain-project-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Category</th>
              <th>What it does</th>
              <th>Status</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project) => (
              <tr key={`${project.name}-${project.category}`}>
                <td>{project.name}</td>
                <td>{project.category}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>{project.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
