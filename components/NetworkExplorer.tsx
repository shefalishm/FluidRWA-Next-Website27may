"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NetworkLandscape } from "./NetworkLandscape";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Building2,
  Check,
  ChevronRight,
  Columns3,
  Globe2,
  Layers3,
  Network,
  Plus,
  Search,
  Share2,
  CircleAlert,
  Target,
  X,
} from "lucide-react";
import {
  Entity,
  EntityType,
  activeRelationships,
  entities,
  facets,
  matchesSearch,
  networkViews,
  relatedEntities,
  selectNetwork,
} from "@/lib/network-preview";
import styles from "./NetworkExplorer.module.css";

type Mode = "ecosystem" | "shortlist" | "compare" | "geography";
const modes = [
  { id: "ecosystem", label: "Explore", icon: Network },
  { id: "shortlist", label: "Shortlist", icon: Bookmark },
  { id: "compare", label: "Compare", icon: Columns3 },
  { id: "geography", label: "Markets", icon: Globe2 },
] as const;
const byId = (id: string) => entities.find((e) => e.id === id);
const names = (id: string, type: EntityType) =>
  relatedEntities(id, type)
    .map((e) => e.name)
    .join(", ") || "Not documented";
function track(event: string, detail: unknown) {
  window.dispatchEvent(
    new CustomEvent("fluidrwa:network-preview", { detail: { event, detail } }),
  );
}

function Logo({ entity, large = false }: { entity: Entity; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`${styles.logo} ${large ? styles.logoLarge : ""}`}>
      {entity.image && !failed ? (
        <img
          src={entity.image}
          alt={`${entity.name} logo`}
          onError={() => setFailed(true)}
        />
      ) : (
        <Building2 size={large ? 28 : 18} aria-hidden="true" />
      )}
    </span>
  );
}

export function NetworkExplorer({ initialView }: { initialView: string }) {
  const [mode, setMode] = useState<Mode>("ecosystem"),
    [filters, setFilters] = useState<Record<string, string>>({}),
    [query, setQuery] = useState(""),
    [searchOpen, setSearchOpen] = useState(false),
    [layerFocus, setLayerFocus] = useState(""),
    [selected, setSelected] = useState(""),
    [focus, setFocus] = useState(""),
    [compared, setCompared] = useState<string[]>([]),
    [ready, setReady] = useState(false),
    [notice, setNotice] = useState("");
  const searchBox = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setMode(
      modes.some((m) => m.id === p.get("mode"))
        ? (p.get("mode") as Mode)
        : "ecosystem",
    );
    setQuery(p.get("q") || "");
    setSelected(p.get("entity") || "");
    setFocus(p.get("focus") || p.get("entity") || "");
    setLayerFocus(p.get("layer") || "");
    setCompared(
      (p.get("compare") || "")
        .split(",")
        .filter((id) => byId(id)?.entity_type === "Company")
        .slice(0, 5),
    );
    setFilters(
      Object.fromEntries(facets.map((f) => [f.key, p.get(f.key) || ""])),
    );
    setReady(true);
    track("page_view", initialView);
  }, [initialView]);
  useEffect(() => {
    if (!ready) return;
    const p = new URLSearchParams();
    Object.entries({
      ...filters,
      q: query,
      entity: selected,
      focus,
      layer: layerFocus,
      mode: mode === "ecosystem" ? "" : mode,
      compare: compared.join(","),
    }).forEach(([k, v]) => {
      if (v) p.set(k, v);
    });
    history.replaceState(null, "", location.pathname + (p.size ? "?" + p : ""));
  }, [ready, filters, query, selected, focus, layerFocus, mode, compared]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected("");
        setSearchOpen(false);
      }
    };
    const outside = (e: PointerEvent) => {
      if (!searchBox.current?.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  const data = useMemo(
    () => selectNetwork(initialView, filters, query),
    [initialView, filters, query],
  );
  const current = byId(selected);
  const baseFilter =
    networkViews.find((v) => v.id === initialView)?.filter || "";
  const category = filters.category || baseFilter;
  const categoryEntity = byId(category);
  const searchResults = useMemo(
    () =>
      query.trim()
        ? entities.filter((e) => e.active && matchesSearch(e, query))
        : [],
    [query],
  );
  const selectedCompanies = compared.map(byId).filter((e): e is Entity => !!e);
  function toggleShortlist(id: string) {
    setCompared((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 5) {
        setNotice("A shortlist can contain up to five companies.");
        return prev;
      }
      return [...prev, id];
    });
    track("shortlist_company", id);
  }
  const choose = useCallback((id: string) => {
    if (id === "blockchains") {
      setLayerFocus("blockchains");
      setQuery("");
      setSelected("");
      setFocus("");
      setMode("ecosystem");
      track("layer_open", id);
      return;
    }
    const e = byId(id);
    if (!e) return;
    setSearchOpen(false);
    if (e.entity_type === "Company") {
      setLayerFocus("");
      setSelected(id);
      setFocus(id);
      track("company_open", id);
    } else {
      const facet = facets.find((f) => f.type === e.entity_type);
      if (facet) {
        setLayerFocus("");
        setFilters((prev) => ({ ...prev, [facet.key]: id }));
        setQuery("");
        setMode("ecosystem");
        setSelected("");
        setFocus("");
        track("category_open", id);
      }
    }
  }, []);
  function reset() {
    setLayerFocus("");
    setFilters({});
    setQuery("");
    setSelected("");
    setFocus("");
    setSearchOpen(false);
    setNotice("");
    setMode("ecosystem");
  }
  function Row({
    entity,
    compact = false,
  }: {
    entity: Entity;
    compact?: boolean;
  }) {
    return (
      <div className={`${styles.companyRow} ${compact ? styles.compact : ""}`}>
        <button
          className={styles.companyOpen}
          onClick={() => choose(entity.id)}
        >
          <Logo entity={entity} />
          <span>
            <strong>{entity.name}</strong>
            {!compact && <small>{entity.short_description}</small>}
          </span>
          <ArrowUpRight size={15} />
        </button>
        {!compact && (
          <button
            className={styles.addCompare}
            title={`${compared.includes(entity.id) ? "Remove" : "Add"} ${entity.name} ${compared.includes(entity.id) ? "from" : "to"} shortlist`}
            aria-label={`${compared.includes(entity.id) ? "Remove" : "Shortlist"} ${entity.name}`}
            aria-pressed={compared.includes(entity.id)}
            onClick={() => toggleShortlist(entity.id)}
          >
            {compared.includes(entity.id) ? (
              <Check size={16} />
            ) : (
              <Plus size={16} />
            )}
          </button>
        )}
      </div>
    );
  }
  const companyGrid = (
    <div className={styles.companyGrid}>
      {data.companies.map((e) => (
        <Row key={e.id} entity={e} />
      ))}
    </div>
  );
  const requirementCount =
    Object.values(filters).filter(Boolean).length + (query.trim() ? 1 : 0);
  const verifiedClaimCount = activeRelationships.filter(
    (relationship) => relationship.verification_status === "verified",
  ).length;
  return (
    <main className={styles.explorer}>
      <header className={styles.heading}>
        <div>
          <div className={styles.eyebrow}>
            FLUIDRWA <span>/</span> EXPLORER LAB
          </div>
          <h1 id="network-explorer-title">RWA Network Explorer</h1>
          <p>
            Understand who does what, how the market connects and what is
            relevant to your need.
          </p>
        </div>
        <div className={styles.headerMetrics}>
          <div>
            <b>{data.total}</b>
            <span>matches</span>
          </div>
          <div>
            <b>{requirementCount}</b>
            <span>requirements</span>
          </div>
          <div>
            <b>{verifiedClaimCount}</b>
            <span>verified claims</span>
          </div>
          <span className={styles.preview}>
            Private preview
            <br />
            Illustrative data
          </span>
        </div>
      </header>
      <section className={styles.projectBar} aria-label="Project requirements">
        <div className={styles.projectIntro}>
          <Target size={19} />
          <span>
            <strong>Start with anything you know</strong>
            <small>Search freely or construct a specific ecosystem</small>
          </span>
        </div>
        {facets
          .filter((f) =>
            ["asset", "region", "category", "chain"].includes(f.key),
          )
          .map((f) => (
            <label key={f.key}>
              <span>{f.type}</span>
              <select
                aria-label={`Project ${f.type}`}
                value={filters[f.key] || ""}
                onChange={(e) => {
                  setLayerFocus("");
                  setFilters((prev) => ({ ...prev, [f.key]: e.target.value }));
                  track("requirement", { [f.key]: e.target.value });
                }}
              >
                <option value="">Any {f.type.toLowerCase()}</option>
                {entities
                  .filter((e) => e.entity_type === f.type)
                  .map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </label>
          ))}
        {requirementCount > 0 && (
          <button className={styles.clearBrief} onClick={reset}>
            Clear
          </button>
        )}
      </section>
      <div className={styles.quickStarts} aria-label="Example starting points">
        <span>Try a starting point</span>
        {[
          ["Company", "fireblocks"],
          ["Asset", "private-credit"],
          ["Technology", "ethereum"],
          ["Geography", "uae"],
        ].map(([label, id]) => (
          <button key={id} onClick={() => choose(id)}>
            <small>{label}</small>
            {byId(id)?.name}
            <ArrowUpRight size={12} />
          </button>
        ))}
      </div>
      <div className={styles.toolbar}>
        <div className={styles.exploreLabel}>
          <Layers3 size={15} />
          <strong>RWA</strong>
        </div>
        <div className={styles.modes} role="tablist" aria-label="Presentation">
          {modes.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => {
                setMode(m.id);
                setSearchOpen(false);
                track("mode", m.id);
              }}
            >
              <m.icon size={16} />
              <span>{m.label}</span>
              {(m.id === "compare" || m.id === "shortlist") &&
                compared.length > 0 && <b>{compared.length}</b>}
            </button>
          ))}
        </div>
        <div ref={searchBox} className={styles.searchWrap}>
          <form
            className={styles.search}
            onSubmit={(e) => {
              e.preventDefault();
              setSearchOpen(false);
              setMode("ecosystem");
              track("search", query);
            }}
          >
            <Search size={17} />
            <input
              aria-label="Search the ecosystem"
              placeholder="Try “private credit UAE” or “Fireblocks”"
              value={query}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <X size={14} />
              </button>
            )}
          </form>
          {searchOpen && query && (
            <div className={styles.searchResults}>
              <div className={styles.searchResultsHead}>
                Search results{" "}
                <button
                  aria-label="Close search results"
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={15} />
                </button>
              </div>
              {[
                "Company",
                "Category",
                "Blockchain",
                "Asset Class",
                "Region",
              ].map((type) => {
                const results = searchResults
                  .filter((e) => e.entity_type === type)
                  .slice(0, 5);
                return results.length ? (
                  <section key={type}>
                    <h3>{type === "Company" ? "Companies" : type}</h3>
                    {results.map((e) => (
                      <button key={e.id} onClick={() => choose(e.id)}>
                        <Logo entity={e} />
                        <span>{e.name}</span>
                        <ChevronRight size={14} />
                      </button>
                    ))}
                  </section>
                ) : null;
              })}
              {!searchResults.length && <p>No matches for this combination.</p>}
            </div>
          )}
        </div>
        <button
          className={styles.iconButton}
          aria-label="Share view"
          title="Share view"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(location.href);
              setNotice("Preview link copied");
            } catch {
              setNotice("Share the current browser address.");
            }
          }}
        >
          <Share2 size={17} />
        </button>
      </div>
      <div className={styles.context}>
        <div className={styles.breadcrumb}>
          <button onClick={reset}>Real-world assets</button>
          {(categoryEntity || layerFocus || initialView === "blockchains") && (
            <>
              <ChevronRight size={13} />
              <span>{categoryEntity?.name || "Blockchain infrastructure"}</span>
            </>
          )}
          {query && (
            <>
              <ChevronRight size={13} />
              <span>Search: {query}</span>
            </>
          )}
        </div>
        <div className={styles.counts}>
          {data.total} matching companies <span>·</span> Sample dataset
        </div>
      </div>
      {Object.entries(filters).some(([, v]) => v) && (
        <div className={styles.activeFilters}>
          {Object.entries(filters)
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <button
                key={k}
                onClick={() => setFilters({ ...filters, [k]: "" })}
              >
                {byId(v)?.name || v}
                <X size={12} />
              </button>
            ))}
        </div>
      )}
      {notice && (
        <div className={styles.notice} role="status">
          {notice}
          <button aria-label="Dismiss notice" onClick={() => setNotice("")}>
            <X size={14} />
          </button>
        </div>
      )}
      <div
        className={`${styles.workspace} ${current ? (mode === "ecosystem" ? styles.floatingProfile : styles.withProfile) : ""}`}
      >
        <section className={styles.content} aria-label={`${mode} view`}>
          {mode === "ecosystem" && (
            <NetworkLandscape
              data={data}
              category={layerFocus || category}
              selected={focus}
              onChoose={choose}
              onReset={reset}
            />
          )}
          {mode === "shortlist" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.eyebrow}>PROJECT SHORTLIST</span>
                  <h2>Providers worth investigating</h2>
                  <p>
                    Keep candidates together with the questions that still need
                    answers.
                  </p>
                </div>
                {compared.length >= 2 && (
                  <button
                    className={styles.primaryAction}
                    onClick={() => setMode("compare")}
                  >
                    Compare {compared.length}
                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
              {selectedCompanies.length ? (
                <div className={styles.shortlistGrid}>
                  {selectedCompanies.map((e) => (
                    <article key={e.id}>
                      <div className={styles.shortlistTop}>
                        <Logo entity={e} large />
                        <button
                          aria-label={`Remove ${e.name} from shortlist`}
                          title={`Remove ${e.name}`}
                          onClick={() => toggleShortlist(e.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <h3>{e.name}</h3>
                      <p>{e.short_description}</p>
                      <dl>
                        <div>
                          <dt>Relevant for</dt>
                          <dd>{names(e.id, "Category")}</dd>
                        </div>
                        <div>
                          <dt>Evidence</dt>
                          <dd>Illustrative record · validation required</dd>
                        </div>
                      </dl>
                      <button
                        className={styles.inspectAction}
                        onClick={() => choose(e.id)}
                      >
                        Inspect provider
                        <ArrowUpRight size={14} />
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.shortlistEmpty}>
                  <Bookmark size={25} />
                  <h3>Your shortlist is empty</h3>
                  <p>
                    Explore the landscape and bookmark providers to evaluate.
                  </p>
                  <button onClick={() => setMode("ecosystem")}>
                    Explore providers
                  </button>
                </div>
              )}
              {selectedCompanies.length > 0 && (
                <div className={styles.openQuestions}>
                  <CircleAlert size={19} />
                  <div>
                    <strong>Questions to validate before choosing</strong>
                    <p>
                      Confirm product-level chain support, target-market
                      availability, implementation scope, pricing and documented
                      integrations.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
          {mode === "compare" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.eyebrow}>SHORTLIST COMPARISON</span>
                  <h2>Compare shortlisted providers</h2>
                  <p>{compared.length} of 5 providers selected</p>
                </div>
                {compared.length > 0 && (
                  <button
                    className={styles.textButton}
                    onClick={() => setCompared([])}
                  >
                    Clear selection
                  </button>
                )}
              </div>
              {compared.length >= 2 ? (
                <div className={styles.tableScroll}>
                  <table className={styles.comparison}>
                    <thead>
                      <tr>
                        <th>Company intelligence</th>
                        {selectedCompanies.map((e) => (
                          <th key={e.id}>
                            <Logo entity={e} />
                            <strong>{e.name}</strong>
                            <button
                              title={`Remove ${e.name}`}
                              aria-label={`Remove ${e.name}`}
                              onClick={() => toggleShortlist(e.id)}
                            >
                              <X size={14} />
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          label: "Overview",
                          value: (e: Entity) => e.short_description,
                        },
                        ...(
                          [
                            { label: "Categories", type: "Category" },
                            { label: "Products", type: "Product" },
                            { label: "Supported chains", type: "Blockchain" },
                            { label: "Asset classes", type: "Asset Class" },
                            { label: "Geographies", type: "Region" },
                          ] as { label: string; type: EntityType }[]
                        ).map((f) => ({
                          label: f.label,
                          value: (e: Entity) => names(e.id, f.type),
                        })),
                        {
                          label: "Integrations",
                          value: () => "Not documented",
                        },
                        {
                          label: "Target customers",
                          value: () => "Not documented",
                        },
                        {
                          label: "Verification",
                          value: () => "Sample · not verified",
                        },
                      ].map((row) => (
                        <tr key={row.label}>
                          <th>{row.label}</th>
                          {selectedCompanies.map((e) => (
                            <td key={e.id}>{row.value(e)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className={styles.comparePrompt}>
                  Add at least two providers to your shortlist to compare them.
                </p>
              )}
              <div className={styles.listHeading}>
                <h3>Add providers to the shortlist</h3>
                <span>{data.total} matches</span>
              </div>
              <div className={styles.comparePicker}>
                {data.companies.map((e) => (
                  <label key={e.id}>
                    <input
                      type="checkbox"
                      checked={compared.includes(e.id)}
                      disabled={
                        compared.length >= 5 && !compared.includes(e.id)
                      }
                      onChange={() => toggleShortlist(e.id)}
                    />
                    <Logo entity={e} />
                    <span>{e.name}</span>
                  </label>
                ))}
              </div>
            </>
          )}
          {mode === "geography" && (
            <>
              <div className={styles.sectionHeading}>
                <div>
                  <span className={styles.eyebrow}>GEOGRAPHIC COVERAGE</span>
                  <h2>Markets & regional presence</h2>
                  <p>
                    Illustrative market associations, not headquarters or
                    licensing claims.
                  </p>
                </div>
                <Globe2 size={28} />
              </div>
              <div className={styles.geography}>
                {entities
                  .filter((e) => e.entity_type === "Region")
                  .map((region) => {
                    const members = data.companies.filter((e) =>
                      relatedEntities(e.id, "Region").some(
                        (r) => r.id === region.id,
                      ),
                    );
                    return (
                      <button
                        key={region.id}
                        className={
                          filters.region === region.id
                            ? styles.regionActive
                            : ""
                        }
                        onClick={() =>
                          setFilters({
                            ...filters,
                            region:
                              filters.region === region.id ? "" : region.id,
                          })
                        }
                      >
                        <span>
                          <Globe2 size={18} />
                          {region.name}
                          <ArrowUpRight size={15} />
                        </span>
                        <strong>
                          {members.length}
                          <small>companies</small>
                        </strong>
                        <div className={styles.bar}>
                          <i
                            style={{
                              width: `${(members.length / Math.max(1, data.total)) * 100}%`,
                            }}
                          />
                        </div>
                        <div className={styles.regionLogos}>
                          {members.slice(0, 4).map((e) => (
                            <Logo key={e.id} entity={e} />
                          ))}
                        </div>
                      </button>
                    );
                  })}
              </div>
              <div className={styles.listHeading}>
                <h3>{byId(filters.region)?.name || "Companies by market"}</h3>
                <span>{data.total} results</span>
              </div>
              {companyGrid}
            </>
          )}
          {!data.total && mode !== "compare" && (
            <div className={styles.empty}>
              <Search size={25} />
              <h3>No matching companies</h3>
              <p>No sample records match all selected criteria.</p>
              <button onClick={reset}>Clear filters</button>
            </div>
          )}
        </section>
        {current && (
          <>
            <button
              className={styles.mobileScrim}
              aria-label="Close company profile"
              onClick={() => setSelected("")}
            />
            <aside className={styles.profile} aria-label="Company intelligence">
              <div className={styles.profileTop}>
                <span>COMPANY INTELLIGENCE</span>
                <button
                  className={styles.iconButton}
                  aria-label="Close profile"
                  onClick={() => setSelected("")}
                >
                  <X size={18} />
                </button>
              </div>
              <Logo entity={current} large />
              <h2>{current.name}</h2>
              <span className={styles.verification}>
                <CircleAlert size={13} />
                Illustrative record · validation required
              </span>
              <p className={styles.profileDescription}>
                {current.short_description}
              </p>
              <div className={styles.profileActions}>
                {current.entity_type === "Company" && (
                  <button onClick={() => toggleShortlist(current.id)}>
                    {compared.includes(current.id) ? (
                      <Check size={15} />
                    ) : (
                      <Plus size={15} />
                    )}
                    {compared.includes(current.id)
                      ? "Shortlisted"
                      : "Add to shortlist"}
                  </button>
                )}
                <button
                  onClick={() => {
                    setMode("ecosystem");
                    setSelected("");
                  }}
                >
                  <Network size={15} />
                  View relationships
                </button>
              </div>
              <dl className={styles.profileFacts}>
                {(
                  [
                    { label: "Categories", type: "Category" },
                    { label: "Products", type: "Product" },
                    { label: "Supported chains", type: "Blockchain" },
                    { label: "Asset classes", type: "Asset Class" },
                    { label: "Geographies", type: "Region" },
                  ] as { label: string; type: EntityType }[]
                ).map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>
                      {relatedEntities(current.id, f.type).length ? (
                        relatedEntities(current.id, f.type).map((e) => (
                          <button key={e.id} onClick={() => choose(e.id)}>
                            {e.name}
                            <ArrowUpRight size={11} />
                          </button>
                        ))
                      ) : (
                        <span>Not documented</span>
                      )}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt>Integrations</dt>
                  <dd>
                    <span>Not documented</span>
                  </dd>
                </div>
              </dl>
              <section className={styles.related}>
                <h3>Other providers in this category</h3>
                {entities
                  .filter(
                    (e) =>
                      e.entity_type === "Company" &&
                      e.id !== current.id &&
                      relatedEntities(e.id, "Category").some((c) =>
                        relatedEntities(current.id, "Category").some(
                          (n) => n.id === c.id,
                        ),
                      ),
                  )
                  .slice(0, 3)
                  .map((e) => (
                    <Row key={e.id} entity={e} compact />
                  ))}
              </section>
              {current.profile_url && (
                <a className={styles.profileLink} href={current.profile_url}>
                  View full profile on FluidRWA
                  <ArrowUpRight size={15} />
                </a>
              )}
              <div className={styles.evidence}>
                <strong>Evidence status</strong>
                <p>
                  Relationships are illustrative. No capability, integration or
                  regional presence has been verified in this preview.
                </p>
                <span>Updated 10 Sep 2026</span>
              </div>
            </aside>
          </>
        )}
      </div>
      {compared.length > 0 && mode !== "compare" && mode !== "shortlist" && (
        <div className={styles.compareTray}>
          <div className={styles.trayLogos}>
            {selectedCompanies.map((e) => (
              <button
                key={e.id}
                onClick={() => toggleShortlist(e.id)}
                title={`Remove ${e.name}`}
              >
                <Logo entity={e} />
                <span>{e.name}</span>
                <X size={12} />
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setMode("shortlist");
              setSelected("");
            }}
          >
            View shortlist ({compared.length})
            <ArrowRight size={15} />
          </button>
        </div>
      )}
      <footer className={styles.dataNote}>
        <span>PREVIEW DATASET</span>
        <p>
          Workflow paths are conceptual. Company relationships are sample data,
          not verified integrations.
        </p>
        <a href="/vendor-membership">Provider? Apply for a vetted listing</a>
        <span>Updated 10 Sep 2026</span>
      </footer>
    </main>
  );
}
