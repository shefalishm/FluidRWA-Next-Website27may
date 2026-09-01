import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "content", "blog");

const guides = JSON.parse(fs.readFileSync(path.join(root, "scripts", "sep01-industry-comparisons.json"), "utf8"));

const shared = (g) => `
## How to use this comparison

This guide is written for a buyer selecting ${g.need}. It compares public product information, operating models and procurement implications. It is not a ranking, certification or claim that one provider is universally better. Capabilities, integrations, commercial terms and geographic availability change, so the final decision should be based on a current proposal, technical validation and legal review.

The useful question is not “which brand is biggest?” It is “which operating model fits the system we are actually accountable for?” Start by documenting users, assets, jurisdictions, transaction volume, trust assumptions, internal owners, recovery requirements and the consequences of failure. A provider that looks feature-rich in a demo can still be a poor fit if it creates an unclear custody position, weak exit path or operational process the team cannot staff.

## Decision criteria

${g.criteria.map((x, i) => `${i + 1}. **${x[0].toUpperCase()}${x.slice(1)}.** Ask for evidence that maps directly to the planned production workflow, not a generic capability statement.`).join("\n")}

## Side-by-side comparison

| Decision factor | ${g.vendors.join(" | ")} |
|---|---|---|---|
${g.rows.map(r => `| ${r.join(" | ")} |`).join("\n")}

The table is a starting point. “Supported” can mean generally available, available through a partner, limited to selected chains or entities, or dependent on a separate contract. Turn every important cell into a written acceptance criterion.

## Vendor profiles

${g.profiles.map(([name, what, fit, limit]) => `### ${name}\n\n${what}\n\n**Good fit:** ${fit}\n\n**Potential limitation:** ${limit}\n\n**What to verify:** Request a current architecture diagram, supported-configuration matrix, security material, implementation plan, service levels, incident process, data handling terms, subcontractor list and complete commercial proposal. Ask the vendor to identify any statement in the proposed design that depends on another supplier.`).join("\n\n")}

## Best fit by buyer scenario

| Buyer scenario | Likely starting point | Reason to investigate |
|---|---|---|
${g.scenarios.map(r => `| ${r.join(" | ")} |`).join("\n")}

These are shortlisting hypotheses. A regulated entity, startup and global institution can reach different conclusions even when they begin with the same use case.

## Architecture before procurement

Vendor selection should follow a system design, not replace it. Draw the full workflow from user action to final record. Mark every component that authenticates a person, signs a transaction, moves an asset, changes a policy, relies on third-party data or can stop the service. Assign an owner to each boundary and define the evidence needed to prove that the boundary works.

Separate the control plane from the execution plane. The execution plane processes routine activity. The control plane changes permissions, upgrades software, rotates keys, modifies risk parameters or invokes emergency action. Many material failures happen in the control plane because it receives less testing but has greater authority. Ask who can make each change, how approval is recorded, whether duties are separated and how an unauthorized change is detected.

Document normal, degraded and emergency states. A production system needs more than a happy-path diagram. Show what happens when a dependency is unavailable, a chain reorganizes, an API times out, a signer is lost, a counterparty freezes activity, a price becomes stale or the vendor itself suffers an incident. Decide whether the system fails open, fails closed, queues work or invokes a manual process.

## Security and operational diligence

Security questionnaires are useful only when answers connect to the purchased service. Request the scope and date of independent assessments, not merely a badge. Confirm whether the exact production environment, APIs and administrative systems are covered. Review vulnerability management, penetration testing, encryption, key handling, access review, logging, data retention, business continuity and incident notification.

Ask how the vendor handles privileged support. Support engineers often need powerful troubleshooting access. Determine whether access is time-limited, approved, logged and reviewed. Require an export of administrative activity and make sure the buyer can correlate vendor events with its own security monitoring.

Availability also needs a precise definition. A headline uptime percentage may exclude planned maintenance, upstream chains, partner integrations or degraded performance. Request service-level definitions, measurement points, maintenance windows, remedies and historical incidents. Model business impact at realistic transaction volumes rather than assuming every outage is equal.

For each critical dependency, establish a fallback. The fallback may be another provider, a limited manual process, a read-only mode or a controlled shutdown. Test it before launch. A documented recovery procedure that has never been exercised is an assumption, not a control.

## Data, privacy and regulatory questions

Map every data field sent to the provider. Classify personal data, wallet addresses, transaction metadata, confidential business data and security telemetry. Record storage region, retention, deletion, access, subprocessors and cross-border transfers. Minimize collection before negotiating contractual protections.

Do not infer a legal conclusion from product terminology. “Non-custodial,” “self-custodial,” “settled,” “verified” and “compliant” can describe technical features without resolving regulatory or contractual treatment. Counsel should review the actual flow of control, title, responsibility and liability in the intended jurisdictions.

Regulated buyers should connect vendor controls to their own obligations. Identify which evidence supports outsourcing oversight, operational resilience, record keeping, sanctions controls, consumer disclosures, safeguarding or best execution. The buyer remains responsible for gaps even when a vendor performs the underlying task.

## Integration proof of concept

A useful proof of concept tests the hardest production assumptions, not the easiest demo. Use realistic data volume, concurrency, failure injection, permission structures and reporting needs. Include at least one recovery exercise and one attempted prohibited action.

Measure latency at relevant percentiles, success and retry rates, time to reconcile, administrative effort, alert quality and the number of manual steps. Test idempotency so a retry cannot create a duplicate financial action. Verify timestamps, identifiers and logs across system boundaries.

The proof of concept should end with a written gap register. Each gap needs an owner, remediation, deadline and release consequence. Separate configuration work from product limitations and promised roadmap items. A roadmap promise is not a production capability until it is delivered and accepted.

## Pricing and total cost

Public pricing rarely captures enterprise cost. Request a model covering platform fees, usage, active users or wallets, transactions, data, support, implementation, premium integrations, overages and minimum commitments. Forecast a base case, growth case and stress case.

Internal cost matters too. Include engineering integration, security review, legal work, reconciliation, vendor management, incident exercises and exit planning. A lower subscription can be more expensive if it creates extensive manual operations or requires several additional providers.

Ask how pricing changes when activity rises or falls. Review renewal uplifts, currency, taxes, payment timing and termination charges. If the service is bundled with another product, price the cost of losing that bundle during a future migration.

## Contract and exit planning

The contract should identify the service, service levels, data rights, security obligations, incident notification, audit support, liability, subcontractors, change control and termination assistance. Product pages are not contractual commitments.

Design the exit before signing. Determine which data, configuration, logs and identifiers can be exported; in what format; how long export remains available; and what assistance is included. Identify components that are portable and components that must be rebuilt. Maintain current documentation so the buyer is not dependent on one employee or vendor team.

For critical infrastructure, test a partial migration or disaster-recovery exercise. Dual running may be justified during transition, but it creates consistency and cost challenges that should be planned explicitly.

## RFP questions

1. Which legal entity provides the service in each target jurisdiction?
2. Which exact products, chains, assets, APIs and integrations are included?
3. What capabilities require partners or separate agreements?
4. Who controls keys, policies, upgrades and emergency actions?
5. What security assessments cover the production service, and when were they completed?
6. How are incidents detected, escalated, communicated and reviewed?
7. What are the measured service levels and exclusions?
8. Where is customer data stored, and which subprocessors can access it?
9. How are duplicate, delayed or partially completed actions reconciled?
10. What evidence can the customer export for audit and compliance?
11. What are all implementation, usage, support and overage charges?
12. What assistance and data are provided on termination?
13. Which roadmap items are not generally available today?
14. Provide two customer references with a comparable workflow and scale.
15. Describe the most material service incident in the last 24 months and the resulting changes.

## A practical selection process

### 1. Define the decision

Write a one-page brief covering business outcome, users, jurisdictions, expected volume, launch date, budget, internal capabilities and non-negotiable controls. Distinguish mandatory requirements from preferences.

### 2. Build a longlist

Use category research to identify plausible operating models. Do not add a vendor solely because a competitor uses it; the competitor may have different licenses, architecture and staffing.

### 3. Issue the same evidence request

Comparable answers require comparable questions. Give every vendor the same workflow, volume assumptions, security questions and pricing template. Record the date and source of every answer.

### 4. Score evidence, not presentation

Use a weighted scorecard. Give full credit only for a generally available capability supported by documentation, demonstration or contract. Give partial credit for configuration or partner delivery. Give no production credit to uncommitted roadmap items.

### 5. Test the difficult path

Run the proof of concept against peak load, permission changes, failed dependencies, retries, recovery and reporting. Invite operations, security, compliance and finance to test their workflows.

### 6. Complete legal and risk review

Resolve data, responsibility, custody, settlement, outsourcing and liability questions before a production commitment. Record residual risks and obtain the correct approvals.

### 7. Negotiate implementation and exit together

Implementation and exit are mirror images. The same configurations and data needed to go live will often be needed to migrate. Contract both while leverage is strongest.

### 8. Review after launch

Track incidents, manual work, service levels, volume, cost and control exceptions. Reassess annually and after material product, regulatory or ownership changes.

## Common procurement mistakes

- Treating a category label as proof that vendors are interchangeable.
- Selecting from a marketing demo without testing failure and recovery.
- Comparing list prices while ignoring implementation and operational labor.
- Assuming a vendor's certification automatically covers the purchased service.
- Leaving custody, control, settlement or regulatory responsibility implicit.
- Accepting roadmap features as if they were production commitments.
- Failing to assign an internal service owner.
- Allowing support or administrative access without auditable controls.
- Building no export, fallback or migration path.
- Publishing a “best vendor” conclusion without a defined buyer context.

## Frequently asked questions

### Which provider is best?

There is no universal winner. ${g.answer} Validate that hypothesis against the exact workflow, entity, chain, asset, risk and operating team.

### Can these providers be used together?

Sometimes. Layers can complement one another, but overlapping controls can create contradictory policies, duplicate alerts, inconsistent records and unclear incident ownership. Define the purpose and authority of each component before combining vendors.

### Should a startup choose differently from a bank?

Usually. A startup may prioritize integration speed and engineering leverage. A bank may prioritize deployment isolation, audit evidence, outsourcing governance, resilience, data location and integration with existing systems. Both still need secure design and a credible exit path.

### Is a proof of concept enough for approval?

No. It validates selected technical assumptions. Production approval also requires security, legal, operational, financial and contractual diligence. Use the proof of concept as evidence within that wider decision.

### How often should the choice be reviewed?

Review at least annually and after a material incident, acquisition, regulatory change, major product change, new jurisdiction or significant change in transaction volume. Monitor service and cost continuously.

### What should be in the final recommendation?

State the selected workflow, weighted criteria, evidence, proof-of-concept results, costs, risks, contract exceptions, implementation plan, owners and exit plan. Include why alternatives were not selected without claiming they are inferior for every buyer.

## Conclusion

${g.answer} The defensible selection is the one that matches a documented operating model and survives technical, security, legal, operational and commercial review. Use this comparison to form a shortlist, then verify every material claim directly with the provider.

## Research basis

This comparison was prepared from publicly available vendor materials, documentation and product information. External source links are intentionally not included.

${g.sources.map(([label]) => `- ${label}`).join("\n")}
`;

for (const g of guides) {
  const faqs = [
    ["Which provider is best?", g.answer],
    ["Can the providers be combined?", "They can sometimes serve complementary layers, but buyers should remove duplicated controls and assign a single owner for each policy, record and incident action."],
    ["Is public pricing enough to estimate cost?", "No. Request current enterprise pricing for implementation, usage, support, integrations, overages and exit assistance, then add internal operating cost."],
    ["What should be tested before signing?", "Test the hardest production workflow, prohibited actions, dependency failure, retries, recovery, reporting and data export with realistic scale."],
    ["Does vendor use transfer regulatory responsibility?", "No. The buyer should obtain advice on its own custody, data, outsourcing, settlement, consumer and compliance obligations."],
    ["How should roadmap features be scored?", "Treat them as unavailable unless delivery timing and acceptance criteria are contractually committed."],
    ["What is the most important exit question?", "Ask whether configuration, records, logs and identifiers can be exported in usable formats without losing operational continuity."],
    ["How current is this comparison?", "It was reviewed on September 1, 2026 using publicly available primary vendor materials. Verify current availability directly before procurement."]
  ];
  const front = `---\ntitle: "${g.title}"\ndescription: "${g.description}"\ndate: "2026-09-01"\nreviewedDate: "2026-09-01"\nreviewedLabel: "September 1, 2026"\ncategory: "${g.category}"\nslug: "${g.slug}"\nimage: "/assets/blog-images/${g.slug}.svg"\nimageAlt: "${g.title} editorial comparison visual"\nanswer: "${g.answer.replaceAll('"', "'")}"\nctaTitle: "Explore ${g.category.toLowerCase()} vendors"\nctaText: "Build a shortlist around your architecture, controls and operating model."\nctaLabel: "Explore Vendor Ecosystem"\nctaUrl: "/web3vendorecosystem"\nctaSecondaryLabel: "Compare Vendor Websites"\nctaSecondaryUrl: "/tools/vendor-comparison"\n${faqs.map((f, i) => `faq${i + 1}q: "${f[0]}"\nfaq${i + 1}a: "${f[1].replaceAll('"', "'")}"`).join("\n")}\nsocialImage: "/assets/social/blog-${g.slug}.png"\nsocialTitle: "${g.vendors.join(" vs ")}"\n---\n`;
  fs.writeFileSync(path.join(out, `${g.slug}.md`), front + "\n" + shared(g).trim() + "\n");
}

console.log(`Created ${guides.length} comparison guides.`);
