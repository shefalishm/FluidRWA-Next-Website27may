"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./ConversionAnalyticsDashboard.module.css";

type AnalyticsData = {
  generatedAt: string;
  days: number;
  summary: { submissions: number; vendorIntros: number; openBriefs: number; uniqueCategories: number; changePercent: number };
  daily: Array<{ date: string; count: number }>;
  profiles: Array<{ name: string; category: string; count: number; lastSubmittedAt: string }>;
  categories: Array<{ name: string; count: number; vendorSpecific: number; openBriefs: number }>;
  sources: Array<{ name: string; count: number }>;
  recent: Array<{ createdAt: string; status: string; vendor: string; category: string; originPath: string; originTitle: string; source: string }>;
};

const ranges = [7, 30, 90];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

export function ConversionAnalyticsDashboard() {
  const [accessKey, setAccessKey] = useState("");
  const [days, setDays] = useState(30);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async (key: string, selectedDays = days) => {
    if (!key) return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`/api/conversion-analytics?days=${selectedDays}`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store"
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Analytics could not be loaded.");
      sessionStorage.setItem("fluidrwaAnalyticsKey", key);
      setData(result);
    } catch (error) {
      setData(null);
      setMessage(error instanceof Error ? error.message : "Analytics could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedKey = sessionStorage.getItem("fluidrwaAnalyticsKey") || "";
    if (savedKey) {
      setAccessKey(savedKey);
      void load(savedKey, 30);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxDaily = useMemo(() => Math.max(1, ...(data?.daily.map((item) => item.count) || [1])), [data]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void load(accessKey, days);
  };

  const selectRange = (range: number) => {
    setDays(range);
    if (accessKey) void load(accessKey, range);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.eyebrow}>Private buyer intelligence</p>
          <h1>Conversion analytics</h1>
          <p>See which vendor profiles, categories and discovery paths produce completed buyer submissions.</p>
        </div>
      </section>

      <section className={styles.shell}>
        {!data ? (
          <form className={styles.accessPanel} onSubmit={submit}>
            <div>
              <p className={styles.eyebrow}>Restricted access</p>
              <h2>Open the FluidRWA dashboard</h2>
              <p>The dashboard contains aggregate business performance only. Contact details are never displayed.</p>
            </div>
            <label>
              Analytics access key
              <input type="password" value={accessKey} onChange={(event) => setAccessKey(event.target.value)} autoComplete="current-password" required />
            </label>
            <button type="submit" disabled={loading}>{loading ? "Opening..." : "Open dashboard"}</button>
            {message ? <p className={styles.error} role="alert">{message}</p> : null}
          </form>
        ) : (
          <div className={styles.dashboard}>
            <div className={styles.toolbar}>
              <div>
                <p className={styles.eyebrow}>Buyer submissions</p>
                <h2>Attribution overview</h2>
              </div>
              <div className={styles.range} aria-label="Analytics date range">
                {ranges.map((range) => <button key={range} type="button" className={days === range ? styles.active : ""} onClick={() => selectRange(range)}>{range} days</button>)}
              </div>
            </div>

            <div className={styles.kpis}>
              <article><span>Buyer submissions</span><strong>{data.summary.submissions}</strong><small>{data.summary.changePercent >= 0 ? "+" : ""}{data.summary.changePercent}% vs previous period</small></article>
              <article><span>Vendor introductions</span><strong>{data.summary.vendorIntros}</strong><small>Specific vendor requested</small></article>
              <article><span>Open project briefs</span><strong>{data.summary.openBriefs}</strong><small>Buyer needs a shortlist</small></article>
              <article><span>Active categories</span><strong>{data.summary.uniqueCategories}</strong><small>Categories producing demand</small></article>
            </div>

            <section className={styles.trend} aria-labelledby="conversion-trend-title">
              <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Completed forms</p><h2 id="conversion-trend-title">Submission trend</h2></div><p>Updated {formatDate(data.generatedAt)}</p></div>
              <div className={styles.bars} aria-label={`Daily completed buyer submissions over ${days} days`}>
                {data.daily.map((item) => <div key={item.date} title={`${item.date}: ${item.count}`}><span style={{ height: `${Math.max(item.count ? 12 : 2, (item.count / maxDaily) * 100)}%` }}></span></div>)}
              </div>
            </section>

            <div className={styles.twoColumn}>
              <section>
                <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Profile demand</p><h2>Vendors producing introductions</h2></div></div>
                <div className={styles.tableWrap}><table><thead><tr><th>Vendor</th><th>Category</th><th>Submissions</th></tr></thead><tbody>{data.profiles.length ? data.profiles.map((profile) => <tr key={profile.name}><td><strong>{profile.name}</strong><small>Last: {formatDate(profile.lastSubmittedAt)}</small></td><td>{profile.category}</td><td>{profile.count}</td></tr>) : <tr><td colSpan={3}>No vendor-specific submissions in this period.</td></tr>}</tbody></table></div>
              </section>

              <section>
                <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Category demand</p><h2>Categories producing briefs</h2></div></div>
                <div className={styles.tableWrap}><table><thead><tr><th>Category</th><th>Introductions</th><th>Open briefs</th><th>Total</th></tr></thead><tbody>{data.categories.length ? data.categories.map((category) => <tr key={category.name}><td><strong>{category.name}</strong></td><td>{category.vendorSpecific}</td><td>{category.openBriefs}</td><td>{category.count}</td></tr>) : <tr><td colSpan={4}>No category submissions in this period.</td></tr>}</tbody></table></div>
              </section>
            </div>

            <div className={styles.twoColumnNarrow}>
              <section>
                <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Discovery paths</p><h2>Submission sources</h2></div></div>
                <ol className={styles.sourceList}>{data.sources.length ? data.sources.map((source) => <li key={source.name}><span>{source.name}</span><strong>{source.count}</strong></li>) : <li><span>No attributed submissions yet</span><strong>0</strong></li>}</ol>
              </section>

              <section>
                <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Recent activity</p><h2>Latest buyer submissions</h2></div></div>
                <div className={styles.activity}>{data.recent.length ? data.recent.map((item, index) => <article key={`${item.createdAt}-${index}`}><div><strong>{item.vendor || item.category}</strong><span>{item.source} · {formatDate(item.createdAt)}</span></div><a href={item.originPath}>{item.originPath}</a></article>) : <p>No buyer submissions in this period.</p>}</div>
              </section>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
