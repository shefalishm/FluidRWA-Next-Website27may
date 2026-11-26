const tests = [
  ["Complete acquisition and disposal", "Trace units, acquisition value, selected lot, proceeds and calculation policy to the original records."],
  ["Transfer between controlled accounts", "Link both legs and preserve lot history. Show fees separately and route uncertain ownership for review."],
  ["Missing acquisition", "Expose an unknown-basis exception. Do not silently substitute zero, current market value or an unrelated lot."],
  ["Duplicate and delayed input", "Reimport the same file without duplicating activity, then ingest a late trade and explain affected outputs."],
  ["Network and asset identity", "Keep similarly named tokens distinct by network and contract identifier. Document approved mappings across a bridge."],
  ["Fee in another asset", "Preserve fee quantity, asset and valuation evidence. Apply only the treatment approved for the test."],
  ["Interrupted connector", "Show the last successful checkpoint, missing interval, alert, recovery and reconciliation after replay."],
  ["Correction after close", "Retain the original result and approvals; produce a linked corrected version and identify downstream outputs to replace."],
  ["Exit and independent replay", "Export raw records, normalized events, lot lineage, policies, approvals and outputs in usable formats."],
];

export function TaxCostBasisGuide() {
  return <>
    <section id="cost-basis-playbook">
      <p className="uc-kicker">Make the numbers explainable</p>
      <h2>Start with the record that does not reconcile</h2>
      <p>The month-end balance looks right. The gains report does not. One wallet has moved assets to another, an exchange has supplied only recent history, and the accounting team is looking at a disposal with no acquisition attached. Importing more rows will not resolve that disagreement unless the system can explain which records belong together.</p>
      <p>A dependable cost-basis operation connects three views: what the source says happened, what the organization concludes the event means, and what the approved calculation produces. Keep those views separate. A corrected classification should not rewrite a custody statement, and a new valuation should not erase the rate used in an earlier close.</p>
      <h3>Choose the deliverable before choosing the engine</h3>
      <p>A treasury team closing its books, a fund reporting to investors and a broker preparing customer information returns need different outputs. They may share ingestion and lot history, but not every reporting obligation or approval. Specify the entity, account population, period, asset set and destination of each output before comparing software.</p>
      <ul>
        <li><strong>Corporate accounting:</strong> reconcile controlled accounts, map entries to the chart of accounts and preserve support for the close.</li>
        <li><strong>Customer reporting:</strong> maintain customer classifications, reporting-year rules, delivery status and corrections separately from the corporate ledger.</li>
        <li><strong>Fund operations:</strong> distinguish portfolio records, administrator outputs and investor reporting. Agree which party signs off each reconciliation.</li>
        <li><strong>Tokenized securities:</strong> identify the actual instrument and its distributions, redemptions or corporate actions. A token label does not establish tax treatment.</li>
      </ul>
      <p>Operations can confirm a transfer pair; a controller can approve a journal; a qualified tax owner should approve classification and calculation policy. A vendor supporting all three functions does not replace that responsibility map.</p>
    </section>
    <section id="lot-provenance">
      <h2>What a complete digital-asset tax lot should contain</h2>
      <p>Give every normalized event a stable identifier pointing to its native source. Retain the source account, native transaction ID, network, contract address where relevant, timestamp, quantity and precision. For exchange activity, preserve fills and fees rather than only a net balance change. Document how multiple fills map to one order.</p>
      <p>The acquisition record also needs its supporting value, currency, valuation source and calculation policy. A timestamped market price is not automatically acquisition cost. Record whether a value comes from an executed trade, a statement, a supported allocation or an approved manual adjustment. Make that distinction visible to reviewers.</p>
      <p>Keep an ownership register for wallets, custody accounts, exchange subaccounts and legal entities, with effective dates and supporting evidence. Two accounts under one operational login do not necessarily belong to the same taxpayer or reporting entity.</p>
      <h3>Reconcile quantity and history, not just ending balances</h3>
      <p>Reconcile opening units plus inflows less outflows to closing units, identifying fees and adjustments. Then reconcile open-lot quantity to the position. A correct closing quantity can still hide offsetting missing trades or an acquisition imported at the wrong value.</p>
      <p>Maintain separate queues for quantity breaks, missing acquisitions, ambiguous ownership, unsupported events and valuation gaps. Each exception needs an owner, age, evidence and disposition. Closing it should show what changed, who approved it and which calculations were rerun.</p>
      <h3>Transfer matching needs more than a transaction hash</h3>
      <p>Onchain transfers may offer a hash, but exchange withdrawals, internal movements and omnibus custody records may use different identifiers. Match with an agreed combination of ownership, asset identity, quantity, time window and provider reference. Record confidence and allow a reviewer to reject a proposed pair.</p>
      <p>Do not force a match to clear a dashboard. Partial transfers, network fees, batching and delayed deposits require explicit treatment. Bridges and wrapped assets need a documented relationship between sent and received instruments; a similar ticker is insufficient. Escalate treatment rather than assuming every bridge preserves basis or every contract interaction is a disposal.</p>
    </section>
    <section id="calculation-controls">
      <h2>Calculation controls that survive a correction</h2>
      <p>FIFO, HIFO and specific identification describe possible calculation approaches, not a universal menu of legally available elections. Ask the responsible adviser which methods and identification records apply to the entity, account, jurisdiction and year. Retain the permitted policy, approval and effective date.</p>
      <p>A reproducible run identifies its input snapshot, asset mapping, classifications, valuations, rounding settings, calculation version and approved method. When an input changes, compare old and new results. A reviewer should distinguish a newly imported acquisition from a software update or deliberate policy change.</p>
      <h3>Keep tax and financial-accounting outputs distinct</h3>
      <p>A tax lot, accounting carrying value and customer statement can represent different views of the same activity. Do not use one unexplained gains total as the control for all three. Agree how views reconcile, where book-tax differences are maintained and who explains them.</p>
      <p>For ERP integration, request the supported version, account mapping, posting frequency and direction. Demonstrate a rejected journal, a closed accounting period and a correction affecting an earlier export. Require a stable batch identifier to prevent duplicate postings on replay. Define which system is authoritative for each balance.</p>
      <h3>Design the correction path before issuing the first report</h3>
      <p>A late acquisition can change multiple disposals and periods. Produce an impact list of lots, accounts, journals, customer records and issued outputs. Separate recalculation from authorization to reissue. Keep both versions and the reason for the change instead of replacing the original file.</p>
      <p>Track accepted, rejected and pending states at the receiving system. Agree who investigates a failed export and how the team prevents an outdated output from being used. The handoff is complete only when the destination acknowledges the intended version.</p>
    </section>
    <section id="reporting-scope">
      <h2>Reporting year and jurisdiction belong in the specification</h2>
      <p>The US <a href="https://www.irs.gov/instructions/i1099da">2026 Form 1099-DA instructions</a> distinguish covered and noncovered digital assets. Covered status includes specified assets acquired after 2025 in a custodial account and held there until the broker effects a disposition. Transferred-in and earlier acquisitions can require different handling. Do not equate every available acquisition value with reportable covered basis.</p>
      <p>The instructions require basis reporting for covered assets and address voluntary reporting for noncovered assets under specified conditions. They distinguish blank basis fields from actual zero basis. Have the reporting owner approve year, population and output mapping before accepting a sample form.</p>
      <p>The <a href="https://www.irs.gov/businesses/understanding-your-form-1099-da">IRS recipient guidance</a> explains that recipients may need their own acquisition records. An information return is not a substitute for complete transaction history. Connect customer and internal accounting corrections while controlling them separately.</p>
      <p>For other jurisdictions, establish local requirements rather than copying the US workflow. The OECD Crypto-Asset Reporting Framework is a reference framework, not a single worldwide filing deadline. Ask advisers to identify applicable domestic legislation, reporting entities, users, identifiers and effective periods. Keep an explicit open item when a local requirement has not been determined.</p>
    </section>
    <section id="acceptance-tests">
      <h2>Nine acceptance tests to run with your own records</h2>
      <p>Choose a small, independently checked sample before adding production volume. Write expected outcomes and assumptions in advance. These tests assess operational behavior; they do not determine the tax treatment of a real transaction.</p>
      <div className="uc-control-list">{tests.map(([title, detail], index) => <div key={title}><h3>{index + 1}. {title}</h3><p>{detail}</p></div>)}</div>
      <p>Then replay representative peak workloads, including backfills, small fills, multiple entities, corrections and interrupted imports. Record environment, input size, elapsed time, exceptions and reviewer effort. A vendor's total records processed across its business does not demonstrate performance for your asset mix.</p>
      <h3>Measure the work that remains for people</h3>
      <p>Track events with complete evidence, aged unmatched transfers, missing acquisition history and manual decisions per cycle. Measure recovery after an interrupted connector and time to reproduce an approved output. Separate imported rows from reviewed, reconciled and report-ready records.</p>
      <p>Agree pass criteria before the demonstration. A useful result states tested population, policy, unresolved cases and owners. It does not promise universal accuracy or a fixed reduction in close time. Compare against your current process using the same sample.</p>
      <h3>A practical close and correction handoff</h3>
      <p>At the reporting cut-off, the operations owner records connector checkpoints and identifies sources still awaiting data. The controller reconciles account quantities and opening positions, while the tax owner reviews unresolved classifications. Freeze a named snapshot only after documenting these exceptions. Freezing a snapshot means preserving the evidence used, not declaring every unresolved record correct.</p>
      <p>Give the reviewer a compact evidence package: source manifest, reconciliation results, exception register, method approval, calculation-run identifier and output checksums. Include the date of the last complete import for each source. Someone opening that package next quarter should understand what was included without reconstructing the process from chat messages.</p>
      <p>If a provider later supplies a missing acquisition, create a correction request linked to the affected source record. Recalculate in a separate version, compare lot selection and output changes, and obtain the appropriate approvals. The controller decides the accounting handoff; the responsible reporting owner decides whether an issued customer output needs correction under applicable requirements.</p>
      <p>After release, reconcile the destination acknowledgements back to the output manifest. Keep failed or pending deliveries open with named owners. Record the root cause separately from the repair: missing source history, mapping error, unsupported event, manual decision or software change. This makes recurring problems visible instead of treating every reporting cycle as a fresh cleanup exercise.</p>
      <p>For ongoing service, agree support coverage around reporting deadlines and the escalation route for a stopped import. Test whether another authorized reviewer can continue if the primary operator is unavailable. Operational continuity depends on documented decisions and accessible evidence, not only on whether the calculation service is running.</p>
    </section>
    <section id="software-fit">
      <h2>Compare the right software layer</h2>
      <p>TaxBit, Ledgible and Lukka are relevant names for a scoped enterprise evaluation, not a finding that every product supports every connector. Use the <a href="/blog/taxbit-vs-ledgible-vs-lukka-enterprise-crypto-accounting-tax">enterprise crypto accounting and tax comparison</a> to frame questions, then request evidence for the exact module and contract.</p>
      <p>Other offerings illustrate product boundaries. Bitwave describes institutional accounting and basis workflows; SoftLedger describes a crypto-capable general ledger; Apex and GainsKeeper describe broader institutional cost-basis and reporting services. A general ledger, calculation engine and broker-reporting service are not interchangeable. Broad securities functionality should not automatically be assumed available for every digital asset.</p>
      <p>Thomson Reuters and Ledgible announced a partnership on September 15, 2025 combining digital-asset processing with ONESOURCE Tax Information Reporting. That identifies an integration path to investigate, not proof that your account population or ERP is implemented. Ask both parties to explain the handoff, rejected records and correction ownership.</p>
      <h3>Protect data without adding signing risk</h3>
      <p>Use read-only permissions where supported. Reading public transactions should not require a wallet seed phrase. Review credential scopes, retention, encryption, access logs and separation of customer information from public blockchain records. Confirm how access is revoked when a provider or employee leaves.</p>
      <p>Test a complete exit before launch. Obtain raw and normalized records, mappings, opening lots, valuations, adjustments, calculation versions and approvals. Preserve relationships between IDs rather than accepting disconnected spreadsheets. Establish who retains evidence and answers questions after termination.</p>
      <p>The best fit can explain a difficult record, reproduce the approved result and carry a correction to its destination. Start there, then scale a process that finance, tax and operations can actually run.</p>
    </section>
  </>;
}
