import Link from "next/link";
import edition from "@/data/research/fund-aum-2026-11-v1.json";
import styles from "@/components/IntelligenceExplorer.module.css";

const path = "/network-explorer/research/fund-aum-november-2026";
const url = `https://www.fluidrwa.com${path}`;
const csv = "/assets/datasets/fund-aum-2026-11-v1.csv";
const compare = "/network-explorer/fund-comparison?funds=ustb,uscc,vbdc";
const archive = "/network-explorer/research/tokenized-fund-infrastructure-october-2026";
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1, minimumFractionDigits: 1, signDisplay: "exceptZero" });
const title = "Three Tokenized Funds: November 2026 AUM Evidence Brief";
const description = "Compare source-linked issuer AUM on November 2 and November 12 for three selected tokenized funds. Download the frozen, dated observations.";
export const dynamic = "force-static";
export const metadata = { title: `${title} | FluidRWA`, description, alternates: { canonical: url } };

export default function Page() {
  const changes = edition.rows.map(row => ({ ...row, change: (row.later - row.earlier) / row.earlier }));
  const up = changes.filter(row => row.change > 0).length;
  const down = changes.filter(row => row.change < 0).length;
  const schema = { "@context": "https://schema.org", "@type": "Dataset", name: title, description, url, version: edition.version, datePublished: edition.published, temporalCoverage: `${edition.earlierAsOf}/${edition.laterAsOf}`, creator: { "@type": "Organization", name: "FluidRWA Research Team" }, isAccessibleForFree: true, citation: edition.rows.map(row => row.source), distribution: { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `https://www.fluidrwa.com${csv}` } };

  return <main className={styles.shell} style={{ display: "block", maxWidth: 1200 }}><div className={styles.content}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <Link href="/network-explorer/research">Network Explorer / Research</Link>
    <header className={styles.heading}><div><p className={styles.eyebrow}>FLUIDRWA RESEARCH / NOVEMBER 2026</p><h1>{title}</h1><p>{description}</p></div></header>
    <p><strong>In this three-product sample, {up} reported higher AUM and {down} reported lower AUM on November 12 than on November 2.</strong> These are two reporting dates, not a full-month trend.</p>
    <div className={styles.downloads}><a className={styles.button} href={csv} download>Download CSV</a><Link href={compare}>Compare operating roles</Link><Link href={archive}>Read the October report</Link></div>
    <section className={styles.section} aria-labelledby="fund-aum-table">
      <h2 id="fund-aum-table">Reported AUM by product</h2>
      <div className={styles.tableWrap} role="region" aria-label="Reported AUM comparison" tabIndex={0}><table>
        <caption>{edition.metric}. Change is relative to the earlier observation.</caption>
        <thead><tr><th scope="col">Fund</th><th scope="col">Nov 2</th><th scope="col">Nov 12</th><th scope="col">Change</th><th scope="col">Source</th></tr></thead>
        <tbody>{changes.map(row => <tr key={row.id}><th scope="row">{row.ticker}<small>{row.name}</small></th><td>{money.format(row.earlier)}</td><td>{money.format(row.later)}</td><td>{percent.format(row.change)}</td><td><a href={row.source}>Issuer disclosure</a></td></tr>)}</tbody>
      </table></div>
    </section>
    <section className={styles.section}><h2>Scope and method</h2>
      <p>The cohort was selected because the Explorer archive held same-day November 2 observations for all three products from the same disclosure platform. We compared those preserved observations with figures the same product pages reported as of November 12. The earlier records were checked November 4; the newer records were checked November 16. The CSV keeps reporting dates separate from review dates. Product names are the labels on the later disclosure pages.</p>
      <p>Changes are calculated as later AUM divided by earlier AUM, minus one. AUM includes book-entry shares and does not measure circulating onchain value, net flows or returns. Public AUM alone does not establish what drove the change. These funds are not a representative market sample; overlapping holdings can also make aggregation misleading, so no combined total is reported.</p>
      <p>The October report covered named infrastructure roles, not changes in AUM. It remains available as published. The November brief adds a different metric rather than revising October's findings. No historical source check dates were refreshed.</p>
    </section>
    <section className={styles.section}><h2>Citation and corrections</h2><blockquote>FluidRWA Research Team (November 16, 2026). Three Tokenized Funds: November 2026 AUM Evidence Brief, edition {edition.version}. Three selected products; issuer-reported observations for November 2 and 12.</blockquote><p>Use the frozen CSV when citing the figures: the issuer links are rolling product pages and can display newer dates. Send corrections with dated primary evidence to <a href="mailto:contact@fluidrwa.com">contact@fluidrwa.com</a>.</p></section>
    <section className={styles.bottomCta}><div><h2>Researching a fund launch?</h2><p>Share your jurisdiction, investor group and the roles you need to document.</p></div><Link className={styles.button} href="/submit-requirement?source=explorer-november-brief">Submit requirements</Link></section>
  </div></main>;
}
