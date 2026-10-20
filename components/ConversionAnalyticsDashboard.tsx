"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./ConversionAnalyticsDashboard.module.css";
import { Check, MailCheck } from "lucide-react";

type AnalyticsData = {
  generatedAt: string;
  days: number;
  quarantinedRows: number;
  pipeline: Record<string, number>;
  leads: Array<{ id: string; createdAt: string; company: string; type: string; status: string; originPath: string; source: string; notification: string; deliveryEvent: string; canVerifyNotification: boolean }>;
  summary: { submissions: number; vendorIntros: number; openBriefs: number; uniqueCategories: number; changePercent: number };
  vendorApplications: { submissions: number; previousSubmissions: number; changePercent: number };
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
  const [stages, setStages] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

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
      setStages({});
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

  const saveStage = async (id: string) => {
    if (!stages[id]) return;
    setSaving(id);
    setMessage("");
    try {
      const response = await fetch("/api/conversion-analytics", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: stages[id] })
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "The stage could not be saved.");
      await load(accessKey, days);
    } catch (error) { setMessage(error instanceof Error ? error.message : "The stage could not be saved."); }
    finally { setSaving(null); }
  };

  const verifyNotification = async (id: string) => {
    setSaving(id);
    setMessage("");
    try {
      const response = await fetch("/api/conversion-analytics", { method: "POST", headers: { Authorization: `Bearer ${accessKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Notification verification failed.");
      await load(accessKey, days);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Notification verification failed."); }
    finally { setSaving(null); }
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.eyebrow}>Private lead intelligence</p>
          <h1>Conversion analytics</h1>
          <p>See completed buyer submissions and vendor review applications, counted separately from visits and form clicks.</p>
        </div>
      </section>

      <section className={styles.shell}>
        {!data ? (
          <form className={styles.accessPanel} onSubmit={submit}>
            <div>
              <p className={styles.eyebrow}>Restricted access</p>
              <h2>Open the FluidRWA dashboard</h2>
              <p>Restricted business performance and lead-stage review. Contact details are never displayed.</p>
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

            <section className={styles.pipeline} aria-labelledby="pipeline-title">
              <div className={styles.sectionHead}><h2 id="pipeline-title">Enquiries to paid listings</h2><p>Current stages of submissions received in this period</p></div>
              <dl className={styles.stageTotals}>
                {[['new', 'Unreviewed'], ['qualified', 'Qualified'], ['proposal_sent', 'Proposal sent'], ['paid', 'Paid'], ['lost', 'Closed / lost']].map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{data.pipeline[key] || 0}</dd></div>)}
              </dl>
              <p>Email notifications: {data.pipeline.notificationAccepted || 0} accepted by the email provider; {data.pipeline.notificationDelivered || 0} verified delivered or subsequently opened; {data.pipeline.notificationAttention || 0} need attention; {data.pipeline.notificationUnknown || 0} have no recorded receipt. Acceptance does not confirm inbox delivery.</p>
              {message ? <p className={styles.error} role="alert">{message}</p> : null}
              <div className={styles.tableWrap}><table><thead><tr><th>Company / received</th><th>Enquiry</th><th>Origin</th><th>Notification</th><th>Stage</th></tr></thead><tbody>
                {data.leads.length ? data.leads.map(lead => <tr key={lead.id}>
                  <td><strong>{lead.company}</strong><small>{formatDate(lead.createdAt)}</small><small>{lead.id}</small></td>
                  <td>{lead.type}<small>{lead.source}</small></td>
                  <td><a href={lead.originPath}>{lead.originPath}</a></td>
                  <td>{lead.deliveryEvent || (lead.notification === 'accepted' ? 'Provider accepted' : lead.notification === 'unknown' ? 'Not recorded' : lead.notification.replaceAll('_', ' '))}{lead.canVerifyNotification ? <div className={styles.stageControl}><button type="button" title={`Check email delivery for ${lead.company}`} aria-label={`Check email delivery for ${lead.company}`} disabled={saving !== null} onClick={() => void verifyNotification(lead.id)}><MailCheck size={18} /></button></div> : null}</td>
                  <td><div className={styles.stageControl}><select aria-label={`Stage for ${lead.company}`} value={stages[lead.id] || lead.status} onChange={event => setStages(previous => ({ ...previous, [lead.id]: event.target.value }))}>
                    {!['new', 'qualified', 'proposal_sent', 'paid', 'lost', 'spam', 'qa_test'].includes(lead.status) ? <option value={lead.status}>{lead.status}</option> : null}
                    <option value="new">Unreviewed</option><option value="qualified">Qualified</option><option value="proposal_sent">Proposal sent</option><option value="paid">Paid - payment received</option><option value="lost">Closed / lost</option><option value="spam">Spam</option><option value="qa_test">QA test</option>
                  </select><button type="button" title={`Save stage for ${lead.company}`} aria-label={`Save stage for ${lead.company}`} disabled={!stages[lead.id] || saving !== null} onClick={() => void saveStage(lead.id)}><Check size={18} /></button></div></td>
                </tr>) : <tr><td colSpan={5}>No submissions available for stage review.</td></tr>}
              </tbody></table></div>
            </section>

            {data.quarantinedRows > 0 ? <p>{data.quarantinedRows} suspected automated submissions were excluded from these totals because one address submitted more than ten times in a day or the source value was malformed. The records remain available for review in Supabase.</p> : null}

            <section className={styles.trend} aria-labelledby="vendor-application-title">
              <div className={styles.sectionHead}>
                <div><p className={styles.eyebrow}>Vendor applications</p><h2 id="vendor-application-title">Completed review applications</h2></div>
                <p>Updated {formatDate(data.generatedAt)}</p>
              </div>
              <p><strong>{data.vendorApplications.submissions}</strong> saved in the last {days} days, compared with {data.vendorApplications.previousSubmissions} in the previous {days} days ({data.vendorApplications.changePercent >= 0 ? "+" : ""}{data.vendorApplications.changePercent}%).</p>
              <p>Only applications saved through the vendor review form are included. Direct emails and clicks are not submissions.</p>
            </section>

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
