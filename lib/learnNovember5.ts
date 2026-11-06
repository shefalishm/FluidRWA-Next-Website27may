import type { LearnArticle, LearnSection } from "./learn";

const section = (id: string, title: string, ...body: string[]): LearnSection => ({ id, title, body });

export const november5Tutorials: LearnArticle[] = [{
  slug: "ethereum-rpc-endpoint-acceptance-test",
  title: "Ethereum RPC Acceptance Test: Check a Sepolia Endpoint",
  description: "Run a read-only Sepolia RPC acceptance lab for chain ID, head freshness, finalized-block support and repeatable block reads.",
  level: "Advanced", topic: "Smart Contracts", updatedAt: "2026-11-06", readTime: "7 min read", accent: "amber",
  reviewedBy: "FluidRWA Research Team",
  relatedHref: "/vendors/node-as-a-service-rpc", relatedLabel: "Explore RPC infrastructure providers",
  illustration: { src: "/assets/blog-thumbnails/rpc-november5.webp", alt: "Illustrated network servers beside a clock and layered block symbols", caption: "Illustration, not a provider dashboard or benchmark." },
  sections: [
    section("overview", "Check the endpoint before routing application traffic",
      "A successful HTTP request does not tell you which chain the node serves, whether its head is fresh or whether you can repeat a block read. Use these checks as a first acceptance gate for a candidate endpoint, before comparing costs, methods or support. This is an endpoint test, not transaction simulation, wallet setup or a provider ranking.",
      "Start with the offline fixture. It models the shape of five calls but does not contact a node. FluidRWA tested the fixture and mocked HTTP path; the optional live Sepolia path is not a reported provider test. You need Node.js 22 or later, but no wallet, signing key, token or test ETH."),
    { ...section("step-1", "Step 1: Run the offline fixture",
      "Inspect the downloaded module before running it. With no argument the program defaults to offline. Expect AUTHORED OFFLINE FIXTURE, head 0x100, ageSeconds 12 and finalized 0xf0. The hashes are synthetic. Capture the result separately from any real endpoint observation.",
      "If the report does not match, confirm that you downloaded the current file and that the command used --offline. A fixture pass confirms the expected branch of the program, not the freshness, latency or availability of any RPC service."),
      links: [{ label: "Download the RPC acceptance lab (.mjs)", href: "/examples/rpc-acceptance-lab.mjs" }],
      code: { language: "Shell", text: "node --check rpc-acceptance-lab.mjs\nnode rpc-acceptance-lab.mjs --offline" } },
    { ...section("step-2", "Step 2: Read the acceptance checks",
      "The lab asks for eth_chainId, reads latest and finalized using eth_getBlockByNumber, re-reads the observed head by its exact number, then asks for the chain ID again. The false argument requests transaction hashes rather than full transaction objects. No transaction is submitted.",
      "The freshness window is a lab policy, not an Ethereum guarantee. A timestamp up to 30 seconds ahead accommodates limited clock skew; a head more than 300 seconds old fails this exercise. Check your machine clock before diagnosing stale data. The script validates a finalized block number and hash, but does not prove finality or block ancestry."),
      table: { columns: ["Check", "Expected", "What it does not prove"], rows: [
        ["Chain ID", "0xaa36a7 before and after", "Provider identity or canonical state"],
        ["Latest block", "Valid number and hash; age from -30 to 300 seconds", "Sustained freshness under load"],
        ["Finalized tag", "Valid response at or below the observed head", "Independent finality or ancestry"],
        ["Repeat by number", "Same number, hash and timestamp", "No future reorganization"]
      ] } },
    { ...section("step-3", "Step 3: Optionally run against your own Sepolia endpoint",
      "Use only an HTTPS Sepolia endpoint you are authorized to test. The URL may contain a credential, so do not paste it into your shell command, report or support ticket. The zsh example reads it without echo. The script refuses redirects, uses per-request timeouts and only allows the two read methods above.",
      "Check whether your provider meters requests before running the optional step. Save the provider label, time, mode and block observations, but omit the endpoint URL and account details. Do not use a production endpoint or replace Sepolia with mainnet to work around a chain failure."),
      code: { language: "zsh", text: "read -s 'SEPOLIA_RPC_URL?Authorized Sepolia HTTPS RPC URL: '\nprintf '\\n'\nexport SEPOLIA_RPC_URL\nnode rpc-acceptance-lab.mjs --live\nunset SEPOLIA_RPC_URL" } },
    section("step-4", "Step 4: Record the outcome before retrying",
      "Give the run one of three dispositions: matched, failed or not run. Record failed runs separately from fresh attempts so a successful retry does not erase evidence of intermittent failures. A pass supports moving on to workload-specific checks; a fail means the endpoint did not meet this gate at the observed time.",
      "If several consumers share the endpoint, record who owns follow-up and which checks block rollout. Keep a link to sanitized evidence rather than pasting a credential-bearing request URL."),
    section("troubleshooting", "Troubleshooting: separate incompatibility from inconsistency",
      "Wrong chain: check the endpoint configuration rather than removing the chain guard. A rejected finalized tag is a compatibility gap for this workload; do not silently substitute latest. If finalization advances past the previously sampled head between calls, the lab stops and you can rerun from a fresh sample.",
      "A repeated block mismatch may be a reorganization or inconsistent backends. A timeout, malformed response or HTTP rejection does not establish which component failed. The script omits the endpoint and remote error details. Use your provider's own request logs for diagnosis and redact any credentials before sharing evidence."),
    { ...section("step-5", "Step 5: Decide what still needs testing",
      "Keep offline, mock and live observations in separate rows. For a real shortlist, compare hashes at a common height with a separately operated endpoint and investigate disagreement. One endpoint's internally consistent answers are not independent evidence of chain truth.",
      "Before production, define the additional method, archive depth, quota, failover and observation-window checks your application requires. A single five-request run cannot measure tail latency, incident recovery or service uptime."),
      links: [
        { label: "Compare Alchemy, QuickNode and Chainstack", href: "/blog/alchemy-vs-quicknode-vs-chainstack-rpc-node-providers" },
        { label: "Inspect a token transfer before signing", href: "/learn/transaction-simulation-erc20-transfer-before-signing" }
      ] }
  ],
  references: [
    { label: "Ethereum JSON-RPC: eth_chainId", href: "https://ethereum.org/developers/docs/apis/json-rpc/#eth_chainid" },
    { label: "Ethereum JSON-RPC: eth_getBlockByNumber", href: "https://ethereum.org/developers/docs/apis/json-rpc/#eth_getblockbynumber" },
    { label: "Ethereum development networks: Sepolia", href: "https://ethereum.org/developers/docs/networks/#sepolia" }
  ],
  faqs: [
    { question: "Do I need a wallet or test ETH?", answer: "No. Offline mode uses authored responses, and optional live mode makes only read requests to an authorized endpoint." },
    { question: "Does matching the head hash twice prove finality?", answer: "No. It shows the endpoint repeated one observation. The finalized tag is also an endpoint-reported value, not independent verification." },
    { question: "Can I use this as an uptime benchmark?", answer: "No. The lab is a point-in-time acceptance check, not a monitoring program or a comparative performance test." }
  ]
}];
