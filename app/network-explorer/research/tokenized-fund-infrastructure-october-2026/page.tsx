import Link from "next/link";
import { ArrowDown, Download, ArrowUpRight } from "lucide-react";
import report from "@/data/research/tokenized-fund-infrastructure-2026-10-v1.json";
import FundResearchTable from "@/components/FundResearchTable";
import styles from "@/components/FundResearch.module.css";

export const dynamic = "force-static";
const url = "https://www.fluidrwa.com/network-explorer/research/tokenized-fund-infrastructure-october-2026";
const stem = `tokenized-fund-infrastructure-${report.version}`;
const exhibitStem = "tokenized-funds-october-2026-editorial-v1";
const headline = "The firms behind tokenized funds";
const description = "Who holds the assets, keeps the accounts and records ownership? A practical review of the firms behind 20 tokenized fund products.";
export const metadata = {
  title: `${headline} | FluidRWA Research`, description,
  alternates: { canonical: url },
  openGraph: { title: headline, description, url, images: [{ url: `https://www.fluidrwa.com/assets/infographics/${exhibitStem}-1.png`, width: 1400, height: 960, alt: "Four responsibilities behind a tokenized fund: custody, administration, transfer agency and digital records" }] }
};

const exhibits = [
  { number: 1, height: 960, title: "A digital share still needs a fund operating behind it", alt: "Four responsibilities explained: a custodian holds fund assets; an administrator keeps accounts; a transfer agent records ownership changes; and a technology provider supports digital records. One firm may hold several roles.", caption: "The functions are shown separately to explain their purpose. A firm may perform more than one role, and the precise responsibilities depend on the fund's arrangements." },
  { number: 2, height: 1100, title: "Three ways to maintain a fund's ownership record", alt: "Franklin FOBXX uses an integrated book-entry and blockchain record maintained by FTIS. Spiko Finance maintains the Spiko SICAV shareholder register using distributed ledgers. WisdomTree Transfers maintains the official offchain register for the reviewed WisdomTree fund suite.", caption: "Sources: Franklin Templeton SEC staff letter, 12 August 2026; Spiko SICAV prospectus, 1 September 2026; WisdomTree regulatory information, checked 21 October 2026. These describe the documented arrangements, not legal conclusions." },
  { number: 3, height: 960, title: "Which providers did the reviewed documents name?", alt: "Of 20 fund products reviewed, selected public documents name a digital-record or token-infrastructure provider for 15, a transfer agent for 14, a custodian or depositary for 10 and a fund administrator for 10. This is not a market-wide transparency measure.", caption: "Source: FluidRWA review of 20 fund products, 21 October 2026. Counts include dated launch announcements. A role not identified in these documents may be named elsewhere; it does not imply that the service is missing." }
];

function Reference({ id }: { id: string }) {
  const index = report.sources.findIndex(source => source.id === id);
  return <sup className={styles.reference}><a href={`#source-${id}`} aria-label={`Reference ${index + 1}`}>{index + 1}</a></sup>;
}

function Exhibit({ number }: { number: number }) {
  const exhibit = exhibits.find(item => item.number === number)!;
  const file = `${exhibitStem}-${number}`;
  const mobileHeight = number === 1 ? 1500 : number === 2 ? 1760 : 1140;
  return <figure className={styles.figure}>
    <p className={styles.exhibitLabel}>EXHIBIT {number}</p><h3>{exhibit.title}</h3>
    <picture><source media="(max-width: 760px)" width={780} height={mobileHeight} srcSet={`/assets/infographics/${file}-mobile.png`}/><img src={`/assets/infographics/${file}.png`} width={1400} height={exhibit.height} alt={exhibit.alt} loading="lazy"/></picture>
    <figcaption>{exhibit.caption}</figcaption>
    <div className={styles.figureDownloads}><a href={`/assets/infographics/${file}.png`} download><Download size={15}/> Download exhibit</a><a href={`/assets/infographics/${file}-mobile.png`} download>Mobile format</a></div>
  </figure>;
}

export default function Page() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${url}#report`, headline, description, url, datePublished: report.checked, dateModified: report.checked, author: { "@type": "Organization", name: "FluidRWA Research Team" }, publisher: { "@type": "Organization", name: "FluidRWA", url: "https://www.fluidrwa.com" }, image: exhibits.map(exhibit => `https://www.fluidrwa.com/assets/infographics/${exhibitStem}-${exhibit.number}.png`), about: { "@id": `${url}#dataset` }, citation: report.sources.map(source => source.url) },
    { "@type": "Dataset", "@id": `${url}#dataset`, name: report.title, description: "Named service providers across 20 tokenized fund products, with public documents, dates and fund-specific responsibilities.", url, version: report.version, datePublished: report.checked, dateModified: report.checked, creator: { "@type": "Organization", name: "FluidRWA Research Team" }, isAccessibleForFree: true, variableMeasured: report.roles.map(role => role.label), citation: report.sources.map(source => source.url), distribution: [ { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `https://www.fluidrwa.com/assets/datasets/${stem}.csv` }, { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `https://www.fluidrwa.com/assets/datasets/${stem}.json` } ] },
    ...exhibits.map(exhibit => ({ "@type": "ImageObject", contentUrl: `https://www.fluidrwa.com/assets/infographics/${exhibitStem}-${exhibit.number}.png`, caption: exhibit.caption, description: exhibit.alt, width: 1400, height: exhibit.height, creator: { "@type": "Organization", name: "FluidRWA Research Team" }, creditText: "FluidRWA Research Team", datePublished: report.checked }))
  ] };

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll("<", "\\u003c") }}/>
    <header className={styles.header}>
      <Link className={styles.breadcrumb} href="/network-explorer/research">FluidRWA Research</Link>
      <p className={styles.eyebrow}>ASSET MANAGEMENT · OCTOBER 2026</p>
      <h1>The firms behind <span>tokenized funds</span></h1>
      <p className={styles.lead}>Putting a fund on a blockchain changes how its shares are held and transferred. It does not remove the work of safeguarding assets, maintaining accounts or recording who owns them.</p>
      <p className={styles.date}>21 October 2026 <span>Reviewed by FluidRWA Research Team</span></p>
      <div className={styles.headerActions}><a href="#summary">Read the report <ArrowDown size={17}/></a><Link href="/network-explorer/fund-comparison">Compare fund models <ArrowUpRight size={17}/></Link><a href={`/assets/datasets/${stem}.csv`} download><Download size={17}/> Download data</a></div>
    </header>
    <div className={styles.reportLayout}>
      <aside className={styles.rail}><nav aria-label="Report contents"><p>In this report</p><a href="#summary">Executive summary</a><a href="#behind-the-token">Behind the token</a><a href="#ownership">Who records ownership?</a><a href="#fund-structures">Why structure matters</a><a href="#buyer-decisions">Choosing providers</a><a href="#appendix">Data and sources</a></nav></aside>
      <div className={styles.article}>
        <section id="summary" className={styles.summary}>
          <p className={styles.sectionNumber}>EXECUTIVE SUMMARY</p>
          <h2>The blockchain is only part of the picture</h2>
          <p>A fund's blockchain network is often easy to identify. The firms responsible for its assets, accounts and shareholder records can take more work to understand. Yet those responsibilities are central to how the fund operates.</p>
          <p>FluidRWA reviewed public documents covering 20 tokenized fund products, including products associated with BlackRock, Franklin Templeton, WisdomTree, Ondo and Spiko. The review points to three practical lessons:</p>
          <ul className={styles.takeaways}>
            <li><strong>Start with responsibilities, not a list of technology partners.</strong> Custody, fund administration, transfer agency and digital records are different jobs. A provider's involvement in one does not establish its involvement in the others.</li>
            <li><strong>Find out which ownership record the fund relies on.</strong> The reviewed funds use different combinations of blockchain and conventional records. A token balance alone does not explain how a fund maintains its shareholder register.</li>
            <li><strong>Look at the specific fund you are buying or building.</strong> A feeder fund may have its own service providers. Several sub-funds may share the same appointments. Neither arrangement is obvious from a list of familiar brands.</li>
          </ul>
          <p className={styles.scope}>The findings describe the 20 products reviewed, not the entire tokenized fund market. Documents were checked on 21 October 2026; their original publication dates remain available in the appendix.</p>
        </section>
        <section id="behind-the-token" className={styles.section}>
          <p className={styles.sectionNumber}>01 / BEHIND THE TOKEN</p>
          <h2>A digital share still depends on familiar fund services</h2>
          <p>Consider two questions: who holds a fund's investments, and who records an investor's shares? They sound similar, but they concern different assets and different responsibilities. A firm that safeguards the fund's Treasury bills is not necessarily the firm that provides a shareholder's wallet.</p>
          <p>BUIDL's March 2024 launch announcement illustrates the distinction. It named Bank of New York Mellon as custodian of the fund's assets and fund administrator, and Securitize as transfer agent and tokenization platform. The technology and conventional fund services were described together, with separate responsibilities.<Reference id="buidl-launch"/></p>
          <Exhibit number={1}/>
          <p>The same distinction matters when a provider has a broad title. Circle identifies Circle International Bermuda Limited as USYC's <em>token administrator</em>. That is a role in managing USYC on behalf of the fund; it should not be read as a statement that the same entity provides the fund's accounting and administration.<Reference id="usyc"/></p>
          <p>For a team choosing providers, the useful starting point is a short list of responsibilities: who holds the investments, who calculates and maintains the accounts, who handles ownership changes, and who runs the digital records. The next step is to identify the firm appointed to each one.</p>
        </section>
        <section id="ownership" className={styles.section}>
          <p className={styles.sectionNumber}>02 / THE OWNERSHIP RECORD</p>
          <h2>The token and the shareholder register are not always the same thing</h2>
          <p>Two funds can both offer blockchain-based shares while maintaining ownership records differently. That difference matters when a transfer needs correcting, records disagree or an investor needs to establish their holding.</p>
          <p>In the reviewed Franklin Templeton staff letter, Franklin Templeton Investor Services maintains an integrated system combining book-entry and blockchain records for FOBXX. Spiko's prospectus assigns its shareholder register to Spiko Finance and describes the use of distributed ledgers. WisdomTree's regulatory information identifies an official offchain register maintained by WisdomTree Transfers, with blockchain movements reflected in that register.<Reference id="franklin-letter"/><Reference id="spiko-prospectus"/><Reference id="wt-regulatory"/></p>
          <Exhibit number={2}/>
          <p>These arrangements should not be collapsed into a single label such as "onchain fund." The description may tell a reader that blockchain is involved without explaining which record the fund relies on or who can change it.</p>
          <p>Buyers should ask how transfers reach the shareholder register, how discrepancies are resolved and which firm is responsible for an exceptional transaction. These questions are more useful than assuming a particular blockchain settles the issue.</p>
        </section>
        <section id="fund-structures" className={styles.section}>
          <p className={styles.sectionNumber}>03 / FUND STRUCTURE</p>
          <h2>A familiar asset manager does not explain every layer of a fund</h2>
          <p>A tokenized product may give investors access to another fund rather than hold the underlying investments directly. This creates an additional structure to understand, not simply another name for the same fund.</p>
          <p>ACRED is a useful example. The January 2025 announcement describes the Apollo Diversified Credit Securitize Fund as a route into Apollo Diversified Credit Fund. It also identifies Securitize as the feeder's fund administrator and digital transfer agent. The roles should be attached to the feeder, rather than assumed from the Apollo fund beneath it.<Reference id="acred-launch"/></p>
          <p>The reverse issue arises when several products share a structure. Our review includes four sub-funds of Spiko SICAV. Its prospectus names common providers for custody, administration, transfer agency and the shareholder register. Those four entries are not evidence of four unrelated provider appointments.<Reference id="spiko-prospectus"/></p>
          <blockquote className={styles.pullquote}>The right question is not simply which firms are involved. It is what each firm does for this particular fund.</blockquote>
          <p>Public documents do not always answer every operating question on their own. In the documents selected for this review, a digital-record or token-infrastructure provider was named for 15 of the 20 products; a custodian or depositary was named for 10. This says something about the documents reviewed, not whether the other funds have those services.</p>
          <Exhibit number={3}/>
          <p>A missing name is therefore a question to follow up, not a conclusion about the fund. The full prospectus, offering documents or a direct response from the issuer may provide the answer.</p>
        </section>
        <section id="buyer-decisions" className={styles.section}>
          <p className={styles.sectionNumber}>04 / CHOOSING PROVIDERS</p>
          <h2>Build the operating model before choosing the technology</h2>
          <p>For asset managers planning a tokenized fund, the review suggests a straightforward approach: establish who is accountable for each part of the fund, then assess how the technology supports that arrangement.</p>
          <div className={styles.decisions}>
            <div><h3>Name the firm, not just the brand</h3><p>Ask for the legal entity appointed to each responsibility and the documents describing its role. A group name or a partnership announcement may not identify the entity that will provide the service.</p></div>
            <div><h3>Separate the assets from the shares</h3><p>Distinguish custody of the fund's investments from custody of an investor's tokens. Include subscription cash and redemption payments when discussing responsibilities.</p></div>
            <div><h3>Agree how ownership records are corrected</h3><p>Establish which record governs ownership, who maintains it and how blockchain and conventional records are reconciled. Include recovery and exceptional transfers in the discussion.</p></div>
            <div><h3>Check the fund structure</h3><p>For a feeder, examine both the feeder and the underlying fund. For an umbrella, confirm which appointments apply across its sub-funds and which are product-specific.</p></div>
          </div>
          <p>Tokenization can change the way shares move. It does not make these operating decisions disappear. Understanding them gives buyers a firmer basis for comparing providers and gives issuers a clearer explanation of how their fund works.</p>
          <div className={styles.contact}><h3>Planning a tokenized fund?</h3><p>Tell us about your project at <a href="mailto:contact@fluidrwa.com">contact@fluidrwa.com</a> or <Link href="/submit-requirement">share your requirements <ArrowUpRight size={15}/></Link>.</p><p className={styles.related}><Link href="/vendors/tokenization-platforms">Tokenization platforms</Link><Link href="/vendors/crypto-custody-providers">Custody providers</Link></p></div>
        </section>
      </div>
    </div>
    <section id="appendix" className={styles.appendix}>
      <p className={styles.sectionNumber}>APPENDIX</p><h2>Data, sources and methodology</h2>
      <p>The fund-by-fund review and original documents are available below.</p>
      <div className={styles.downloads}><a href={`/assets/datasets/${stem}.csv`} download><Download size={17}/> Download data (CSV)</a><a href={`/assets/datasets/${stem}.json`} download>JSON data</a></div>
      <details id="evidence" className={styles.appendixDisclosure}><summary>Fund-by-fund review: all 20 products</summary><div><p>The table identifies firms named in the documents we reviewed. "Not identified here" means these documents did not establish a name for this role. It does not mean the fund lacks that service. A dated announcement describes the arrangement at that time, not a confirmation of its continuation today.</p><FundResearchTable/></div></details>
      <details id="methodology" className={styles.appendixDisclosure}><summary>About the research</summary><div className={styles.methods}>
        <h3>Scope and selection</h3><p>We examined public documents for 20 named fund, sub-fund and feeder products. Eleven were already covered in our fund research: BUIDL, FOBXX, WTGXX, USTB, USCC, JTRSY, CUSHY, VBDC, ACRED, HLSCOPE and OUSG. The review adds USYC, OpenEden TBILL, four Spiko sub-funds, uMINT, WTSYX and FLTTX. Selection reflects prior research and access to documentation, not fund size, commercial status or a random sample of the market.</p>
        <h3>Definitions</h3><dl className={styles.definitions}>{report.roles.map(role => <div key={role.id}><dt>{role.label}</dt><dd>{role.definition}</dd></div>)}</dl>
        <h3>How counts were calculated</h3><p>We checked four responsibilities for each product, giving 80 checks. The selected documents identify a firm for 49 of those checks; 31 remain unresolved. Each product counts once for each responsibility, regardless of the number of providers named. Five products have names across all four categories, but four are sub-funds of the same Spiko SICAV. These counts are not a service-quality or transparency ranking.</p>
        <h3>Dates and limitations</h3><p>Documents were checked on 21 October 2026. Four product entries use launch announcements; their dates are retained. Company statements have not been independently confirmed through contracts or operational testing. The WisdomTree prospectus viewer was not accessible, so custody and administration remain unresolved in our review. CUSHY's heading and feeder-oriented page title leave its exact legal vehicle name unresolved; OpenEden's FAQ does not establish TBILL's exact legal entity.</p><p>The review does not measure market size, investment performance or growth. A feeder and its underlying fund are not combined; chain deployments are not counted as separate funds. A missing name in this review may be available in other public or investor documents.</p>
        <h3>Edition and corrections</h3><p>Dataset edition {report.version}, published 21 October 2026. Editorial revision: 21 October 2026; no underlying observations were changed. Future corrections to data will be published as a numbered edition, retaining previous downloads. Send corrections with the relevant fund and a primary source to <a href="mailto:contact@fluidrwa.com?subject=Fund%20research%20correction">contact@fluidrwa.com</a>.</p>
      </div></details>
      <details id="sources" className={styles.appendixDisclosure}><summary>References</summary><ol className={styles.sourceList}>{report.sources.map((source, index) => <li id={`source-${source.id}`} key={source.id}><span>{index + 1}.</span><div><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a><small>{source.published ? `Published ${source.published}` : "Publication date not stated"}. Reviewed 21 October 2026.<br/>{source.locator}</small></div></li>)}</ol></details>
      <details className={styles.appendixDisclosure}><summary>Citation and reuse</summary><div><p className={styles.citation}>FluidRWA Research Team. (2026, October 21). <em>The firms behind tokenized funds.</em> {url}</p><p>Charts and FluidRWA's original analysis may be reused with attribution and a link to this report. Third-party documents remain subject to their owners' rights. Findings should be attributed to this 20-product review rather than the whole market.</p></div></details>
      <p className={styles.footer}>Research as of 21 October 2026. For information only; not investment, tax or legal advice.</p>
    </section>
  </main>;
}
