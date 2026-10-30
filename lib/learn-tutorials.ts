import type { LearnArticle, LearnTopic } from "./learn";

type Tutorial = { slug: string; title: string; description: string; level: "Beginner" | "Advanced"; topic: LearnTopic; intro: string; needs: string; steps: [string, string][]; check: string; faq: [string, string][]; refs: [string, string][] };
const metamask = "https://support.metamask.io/start/creating-a-new-wallet";
const approvals = "https://support.metamask.io/more-web3/learn/how-to-revoke-smart-contract-allowances-token-approvals/";
const explorer = "https://ethereum.org/developers/docs/data-and-analytics/block-explorers/";
const gas = "https://ethereum.org/developers/docs/gas/";
const testing = "https://ethereum.org/developers/docs/smart-contracts/testing/";
const deploy = "https://ethereum.org/developers/docs/smart-contracts/deploying/";
const access = "https://docs.openzeppelin.com/contracts/5.x/access-control";
const feeds = "https://docs.chain.link/data-feeds/overview";

const definitions: Tutorial[] = [
  {
    slug:"how-to-create-a-metamask-wallet", title:"How to Create and Secure a MetaMask Wallet", description:"Set up a MetaMask wallet, secure its recovery method and check your public address before receiving assets.", level:"Beginner", topic:"Stablecoins",
    intro:"A wallet controls keys that authorize transactions. MetaMask is one self-custody option: you are responsible for protecting your recovery method. Start without transferring valuable assets.",
    needs:"A device you control, a private place to record a recovery phrase if you choose that method, and time to check your setup. Menus and available sign-in methods may change.",
    steps:[
      ["Find the official download","Start at MetaMask's official help page and follow its links to the extension or mobile app. Check the publisher and address carefully; do not install software from an advertisement or a message."],
      ["Create a new wallet","Open MetaMask and choose to create a new wallet. Review the available recovery methods. This guide describes the Secret Recovery Phrase option; social sign-in has a different recovery setup."],
      ["Set a strong device password","Choose a unique password and follow the app's instructions. The password locks access on the device; for a phrase-based wallet it is not a substitute for the recovery phrase."],
      ["Back up the recovery phrase offline","In a private place, write down the words in their original order and store them securely offline. Never share them, enter them on a website, photograph them, or send them to a supposed support agent. Anyone with the phrase can control the wallet."],
      ["Complete the backup confirmation","Confirm the words only inside the official MetaMask setup. If you cannot safely save the phrase, stop before depositing funds. MetaMask cannot recover a lost phrase for you."],
      ["Find your public address","Select the account and use its address copy control. The public address may be shared for receiving; the recovery phrase and private key must remain secret. Check which network the sender will use."],
      ["Practice with a small amount","Once you understand the receiving network and its fees, ask a trusted sender to send a small test. Confirm it arrived before transferring more. Testnet assets, when available, have no intended real-world value."]
    ],
    check:"You should know which account and network you are using, where your offline backup is kept, and the difference between a public address and a secret.",
    faq:[["Can MetaMask recover my phrase?","No. For a phrase-based wallet you must retain your own backup. A different recovery process applies if you chose social login."],["Should I give support my recovery phrase?","Never. Treat anyone asking for it as a scam."]],
    refs:[["MetaMask: create a wallet",metamask],["MetaMask: secure your recovery phrase","https://support.metamask.io/hc/en-us/articles/4404722782107"]]
  },
  {
    slug:"how-to-receive-and-send-crypto-safely",title:"How to Receive and Send Crypto Safely: A Beginner's Walkthrough",description:"Check addresses, networks, fees and transaction status before sending a small test transfer.",level:"Beginner",topic:"Stablecoins",
    intro:"A correct address is not enough: both parties must support the same asset and network. A transfer can be difficult or impossible to recover if the destination or network is wrong.",
    needs:"A funded wallet, the recipient's verified public address and network, and enough of the network's fee asset where required. Never share a recovery phrase.",
    steps:[
      ["Agree on the exact asset and network","Ask the recipient which token and network they support. Exchange deposit pages may require a memo or tag on some networks. A matching ticker alone does not prove compatibility."],
      ["Get the address from a trusted channel","Copy the recipient's public deposit address directly from a verified source. Independently confirm it with the recipient, especially if the address was sent in a message."],
      ["Check your wallet and fee balance","Select the sending account and network. Ensure the token is available and you have enough native network currency to pay any required gas. Do not assume a fee will be paid in the token you are sending."],
      ["Paste and compare the address","Paste the address into the wallet. Compare the whole address through a trusted channel where practical; malware can replace copied addresses. Add any required memo exactly as instructed by the receiving service."],
      ["Send a small test","Enter a small amount and inspect the asset, network, recipient and estimated fee on the confirmation screen. Only approve a transaction you understand; fees and confirmations may change."],
      ["Verify receipt before sending more","Use the wallet's transaction details to open the appropriate network explorer. A confirmed blockchain transaction and a credited exchange deposit are separate checks; the exchange may require additional confirmations."],
      ["Keep a record and handle delays carefully","Save the transaction hash and network. If a deposit is delayed, contact the receiving service using its verified support channel. Never pay a stranger a recovery fee or share your keys."]
    ],
    check:"The recipient confirms the test amount on the expected network before any larger transfer.",
    faq:[["Can I reverse a confirmed transfer?","Usually not by yourself. Contact the receiving service promptly, but recovery is not guaranteed."],["Is a transaction hash secret?","It is generally public and can be shared for support; it does not replace your private key."]],
    refs:[["Ethereum: transactions","https://ethereum.org/developers/docs/transactions/"],["Ethereum: block explorers",explorer]]
  },
  {
    slug:"how-to-read-a-blockchain-transaction",title:"How to Read a Blockchain Transaction on an Explorer",description:"Find a transaction, interpret its status, check addresses and understand what an explorer cannot prove.",level:"Beginner",topic:"Smart Contracts",
    intro:"A block explorer displays information from a particular network. It helps you inspect a transaction, but an explorer label alone does not establish that a token or recipient is legitimate.",
    needs:"A transaction hash and the name of the network. Use the explorer recommended by the network or linked from a trusted wallet.",
    steps:[
      ["Select the correct explorer","Open an explorer for the transaction's network. Similar addresses can exist across EVM networks, so a search on the wrong network can produce no result or a different history."],
      ["Search the transaction hash","Paste the full transaction hash into the search box. A transaction hash identifies a transaction; it is different from an account address and a token contract address."],
      ["Read the status","Look for pending, successful or failed status. A successful transaction indicates execution succeeded on that chain; it does not guarantee an exchange credited a deposit or that a payment recipient can redeem the funds."],
      ["Check the parties and token movement","Review the from and to fields and any token transfer events. A contract call may create multiple token movements, so compare the entries with the operation you intended."],
      ["Inspect network fees","Find the transaction fee and the network's native currency. Failed transactions can still consume gas. Fee information belongs to this transaction and does not predict your next one."],
      ["Check confirmations and timestamps","Look at the block number, time and confirmations. A receiving provider may wait for its own confirmation threshold before crediting funds."],
      ["Treat token labels as clues","A familiar name or logo can be imitated. Compare the contract address with the issuer's official documentation for that network; verify the actual source before trusting an asset."]
    ],
    check:"You can identify the network, status, fee and relevant token movement without confusing them with a recipient's off-chain credit.",
    faq:[["Does successful mean the payment is complete?","It confirms successful execution on the relevant chain, not necessarily delivery through an exchange or bank."],["Can two tokens have the same name?","Yes. Verify the contract address and network using an authoritative source."]],
    refs:[["Ethereum: block explorers",explorer],["Ethereum: transactions","https://ethereum.org/developers/docs/transactions/"]]
  },
  {
    slug:"how-to-understand-crypto-network-gas-fees",title:"How to Understand Crypto Network Fees Before You Send",description:"Learn what gas pays for, where to see an estimate and why the final cost may differ.",level:"Beginner",topic:"Smart Contracts",
    intro:"Network fees compensate for blockchain computation and inclusion. They vary by network and transaction, and a failed smart-contract transaction can still cost gas.",
    needs:"Your wallet's transaction preview and the name of the network. Do not approve a transaction just to discover its fee.",
    steps:[
      ["Identify the network","Check the network selected in the wallet and the recipient's supported network. The same token can exist on more than one chain with different costs."],
      ["Identify the fee asset","On Ethereum, gas is paid in ETH. Other networks have their own fee arrangements; some applications sponsor fees. Verify what your specific wallet shows rather than assuming sponsorship."],
      ["Open a transaction preview","Prepare the intended transfer or interaction without confirming it. Find the estimated network fee separately from the amount being sent and any service fee."],
      ["Compare different actions","A simple transfer and a smart-contract interaction can require different computation. Approval, swap and bridging steps may each involve separate transactions or costs."],
      ["Allow for changing conditions","Estimates can change before inclusion. On Ethereum, the fee depends on gas used and the applicable gas price; check the wallet's current confirmation screen."],
      ["Decide whether to proceed","If the fee is too high or the transaction is unclear, cancel the preview. Do not choose an unfamiliar network solely because it looks cheaper; confirm the receiver supports it."],
      ["Review the final receipt","After a transaction, use the network explorer to inspect actual gas used and fee. A submitted transaction may fail while still consuming gas."]
    ],
    check:"Before approving, you can identify the payment amount, the network fee, its fee asset and any separate application charge.",
    faq:[["Is gas the same as a service fee?","No. An application or exchange may charge separately from the blockchain network fee."],["Are fees refundable if a transaction fails?","A failed Ethereum transaction can still consume gas; check the receipt."]],
    refs:[["Ethereum: gas and fees",gas],["Ethereum: transactions","https://ethereum.org/developers/docs/transactions/"]]
  },
  {
    slug:"how-to-review-and-revoke-wallet-token-approvals",title:"How to Review and Revoke Token Approvals",description:"Find wallet allowances, understand the spender and revoke permissions you no longer need.",level:"Beginner",topic:"Smart Contracts",
    intro:"A token approval gives a spender permission to use an allowance of a particular token. Disconnecting a website from your wallet does not revoke an on-chain token approval.",
    needs:"Your wallet, the network where you granted approval and enough native currency for a revocation transaction. Start from the wallet provider's official documentation.",
    steps:[
      ["Understand the permission","A token allowance is different from connecting an account to a site. The spender and permitted amount matter; an unlimited allowance can expose more tokens than a single intended transaction."],
      ["Open a trusted approval tool","Use the approval-management route linked by your wallet provider or the network's explorer. Confirm the site address independently and avoid links sent in unsolicited messages."],
      ["Select the account and network","Connect the account you want to inspect and choose the network where the approval was granted. A tool may not cover every chain or every type of signed permission."],
      ["Inspect each allowance","Check the token, spender address and remaining allowance. Do not trust a familiar display name alone; compare the spender with the application's official documentation."],
      ["Choose a permission to revoke","Select an allowance you no longer need or do not recognize. Revocation applies to that token-spender relationship on that network; it does not automatically cover other networks or permissions."],
      ["Review and submit","Read the wallet confirmation and fee, then submit only if it matches the revocation you intend. Revoking an on-chain allowance generally requires gas."],
      ["Confirm the result","Wait for confirmation and refresh the tool. Check the remaining allowance. For a suspected compromise, seek reputable incident guidance: revoking an allowance does not make a leaked recovery phrase safe."]
    ],
    check:"The specific allowance shows revoked or zero after the transaction confirms. Review other accounts and networks separately.",
    faq:[["Does disconnecting a dapp revoke approvals?","No. On-chain approvals must be handled separately."],["Can I recover a compromised recovery phrase by revoking?","No. Anyone with the phrase may control the wallet; use a new uncompromised wallet and seek appropriate incident guidance."]],
    refs:[["MetaMask: revoke token approvals",approvals],["MetaMask: dapp permissions","https://support.metamask.io/more-web3/dapps/manage-dapp-permissions"]]
  },
  {
    slug:"how-to-test-and-deploy-a-smart-contract-on-a-testnet",title:"How to Test and Deploy a Smart Contract on a Testnet",description:"A controlled workflow for compiling, testing and deploying a practice contract without using mainnet funds.",level:"Advanced",topic:"Smart Contracts",
    intro:"A testnet gives developers a shared environment for testing, but a successful deployment does not make code production-ready. Use a simple practice contract and a separate wallet containing no valuable assets.",
    needs:"Basic Solidity knowledge, the official Remix IDE, a separate test wallet, the selected test network and test currency from a trusted faucet.",
    steps:[
      ["Define the test scope","Write the expected behavior, caller permissions and failure cases. Choose a practice contract that stores a value, rather than code that holds other people's assets."],
      ["Prepare a separate environment","Open Remix through its official site, select a supported test network in your wallet and obtain test currency from a trusted faucet. Confirm the network name and chain ID from authoritative network documentation."],
      ["Compile explicitly","Create the practice source in Remix. Choose a compiler version compatible with the source and record the compiler version and optimization settings; preserve the exact source and dependencies."],
      ["Run local tests","Use a local execution environment first. Exercise authorized and unauthorized callers, boundary values and expected reverts. A single successful interaction is not a test suite."],
      ["Deploy to the test network","In Remix's deploy panel, connect the separate test wallet and confirm the network. Review constructor arguments and the transaction before approving. Save the deployment transaction hash."],
      ["Inspect and exercise the deployment","On the correct testnet explorer, check the contract address, transaction status and deployed code. Call read functions and test state-changing functions with appropriate accounts; record results."],
      ["Document the release boundary","Record source version, chain, address, settings and test outcomes. Before any production use, obtain an independent security review, plan incident response and consider legal and operational requirements."]
    ],
    check:"You have reproducible compiler settings, a testnet contract address and a written record of both passing and failing test cases.",
    faq:[["Does a testnet deployment prove a contract is safe?","No. It validates only the scenarios tested in that environment."],["Should I use my primary wallet?","Use a separate test account and do not put valuable assets at risk."]],
    refs:[["Ethereum: testing smart contracts",testing],["Ethereum: deploying contracts",deploy],["Remix documentation","https://remix-ide.readthedocs.io/"]]
  },
  {
    slug:"how-to-design-smart-contract-access-controls",title:"How to Design Smart Contract Access Controls",description:"Map privileged operations, configure roles and test how authority is granted, revoked and recovered.",level:"Advanced",topic:"Smart Contracts",
    intro:"A token system can have privileged operations such as minting, pausing and upgrading. The people and contracts controlling those operations deserve the same attention as the code.",
    needs:"A list of contract functions, proposed operators and a local development environment. This is a design and test workflow, not a ready-to-deploy security architecture.",
    steps:[
      ["Inventory privileged operations","List each function that can alter supply, transfer rules, upgrades or emergency state. Include external dependencies and the power to grant or revoke roles."],
      ["Assign responsibilities","Map each function to a named operational role and the authorized entity. Separate duties where feasible, and document what happens if a signer or provider becomes unavailable."],
      ["Choose an access pattern","Review OpenZeppelin Ownable, AccessControl and, where appropriate, AccessManager against the required operating model. A role's admin can grant or revoke it; the default admin has substantial authority."],
      ["Protect administrative authority","Evaluate multisignature controls, delays and recovery procedures with your security team. A timelock can allow review time, but it also affects emergency response and needs its own governance."],
      ["Implement against pinned dependencies","Use a reviewed library version and documented compiler settings. Grant only the permissions needed. Avoid copying snippets into production without understanding constructors, inheritance and upgrade behavior."],
      ["Test authorized and unauthorized paths","For every privileged action, test correct roles, wrong roles, revocation, admin changes and failure cases. Test the emergency pause and recovery sequence if the system supports one."],
      ["Review deployment and operations","Record initial role holders, keys and change procedures. Obtain independent security review and monitor role changes; an audit does not replace ongoing operational controls."]
    ],
    check:"A reviewer can trace each privileged action to a role, a role administrator, tests and a documented incident procedure.",
    faq:[["Does a role-based library guarantee security?","No. Misconfigured role administration or compromised keys can still undermine the system."],["Does a timelock replace a multisignature?","No. They address different risks and may be combined depending on governance and emergency requirements."]],
    refs:[["OpenZeppelin: access control",access],["Ethereum: smart-contract testing",testing]]
  },
  {
    slug:"how-to-use-chainlink-data-feeds-safely",title:"How to Evaluate and Use a Chainlink Data Feed",description:"Select a feed, read its answer and timestamp, and plan checks for stale or unsuitable data.",level:"Advanced",topic:"Smart Contracts",
    intro:"A data feed reports values on-chain, but an application must decide whether the feed and its update behavior are suitable. An oracle value alone does not establish an asset's legal ownership or real-time net asset value.",
    needs:"Solidity familiarity, a local or testnet environment, and official documentation for the specific network and feed.",
    steps:[
      ["Define what the value represents","Specify the asset pair, units, acceptable age and decision the application will make. A market price, fund NAV and reserve attestation are different data types."],
      ["Select a documented feed","Use Chainlink's official feed directory for the exact chain and proxy address. Review the feed's scope, heartbeat, deviation threshold and any market-hours or deprecation considerations."],
      ["Read through the proxy","Use the documented interface and the proxy address for the intended chain. Inspect latestRoundData and the feed's decimals; handle a reverted call rather than assuming data is always available."],
      ["Validate the answer and time","Check the answer is valid for your use case and inspect updatedAt. Define an application-specific maximum age informed by the feed configuration; do not assume updates are continuous."],
      ["Handle unsuitable or missing data","Specify whether the application pauses the affected operation or enters a separately designed fallback mode. Avoid automatically substituting another source without a documented risk assessment."],
      ["Test failure scenarios","On a test network or using mocks, test stale timestamps, zero or negative answers where relevant, unavailable feeds and decimal conversion. Include the target network's sequencing risks where applicable."],
      ["Monitor after deployment","Record the proxy and configuration and subscribe to relevant provider updates. Plan ownership of incident response and review feed suitability as the application changes."]
    ],
    check:"Your test demonstrates normal, stale and unavailable-data paths, with no silent conversion from an oracle quote into a fund valuation.",
    faq:[["Does latestRoundData return a streaming price?","No. Updates follow the feed's configured conditions; the application must check freshness."],["Can a price feed prove the underlying asset exists?","No. Asset rights, custody and valuation require separate evidence."]],
    refs:[["Chainlink: data-feed overview",feeds],["Chainlink: selecting quality data feeds","https://docs.chain.link/data-feeds/selecting-data-feeds"]]
  },
  {
    slug:"how-to-design-tokenized-fund-reconciliation",title:"How to Design Reconciliation for a Tokenized Fund",description:"Map investor, cash, share-register and blockchain records before building a daily reconciliation process.",level:"Advanced",topic:"Tokenization",
    intro:"A tokenized fund may have a transfer agent, administrator, custodian and blockchain record. Which record governs ownership depends on the fund's legal and operating documents.",
    needs:"A fund-specific operating model, sample records, a defined reporting cutoff and participation from fund operations, legal and technology teams.",
    steps:[
      ["Identify the governing records","Document the fund vehicle, its official shareholder record, custody records and the role of any blockchain record. Do not assume the wallet balance is the legal register."],
      ["Map subscription and redemption states","For each workflow identify who approves the investor, receives cash, calculates the share amount, updates the register and instructs any token movement."],
      ["Define common identifiers","Agree how investor IDs, order IDs, wallet addresses, register entries and blockchain transaction hashes relate. Avoid publishing personal information on a public chain."],
      ["Set a reconciliation cutoff","Agree the time zone, reporting period, data source, extraction time and whether blockchain observations are sufficiently confirmed for the workflow. Different systems may close on different schedules."],
      ["Compare like with like","Reconcile units, outstanding orders, fees, cash and share records using defined tolerances. Confirm decimals, corporate actions and timing before treating a difference as a loss."],
      ["Create an exception queue","Record unmatched items, owner, severity, evidence and resolution deadline. A late bank payment, duplicate event and invalid wallet require different handling."],
      ["Test and govern corrections","Run examples for retries, transfers, redemptions and chain interruptions. Define who can correct each record, who approves the correction and how an audit trail is retained."]
    ],
    check:"A sample subscription can be traced from cash receipt to the governing register and any relevant blockchain transaction, with an owner for exceptions.",
    faq:[["Is the blockchain always the official shareholder register?","No. The governing record varies by product and jurisdiction; check the fund's documents."],["Should wallet addresses be published with investor names?","Do not put personal information on a public chain; obtain privacy and legal guidance."]],
    refs:[["FluidRWA: tokenized fund infrastructure research","https://www.fluidrwa.com/network-explorer/research/tokenized-fund-infrastructure-october-2026"],["BIS: tokenisation and unified ledgers","https://www.bis.org/publ/arpdf/ar2023e3.htm"]]
  },
  {
    slug:"how-to-design-reliable-payment-webhook-processing",title:"How to Design Reliable Payment Webhook Processing",description:"Build a payment-event workflow that authenticates notifications, handles duplicates and reconciles final outcomes.",level:"Advanced",topic:"Stablecoins",
    intro:"A webhook reports an event; it is not automatically proof that a beneficiary received spendable funds. Provider event types, signature schemes and retry rules differ.",
    needs:"The payment provider's current webhook and API documentation, a test environment and an agreed payment-state model.",
    steps:[
      ["Map the payment states","List the provider's documented events from order creation through funding, conversion, payout and completion. Identify which event means an on-chain transfer versus final beneficiary delivery."],
      ["Register a secure endpoint","Use HTTPS and store signing secrets in a secret manager. Follow the provider's exact signature procedure, including its rules for raw request bytes and timestamp checks where supported."],
      ["Verify before processing","Reject unauthenticated requests according to provider guidance. Do not trust fields in an unverified payload or log signing secrets and unnecessary personal data."],
      ["Make processing idempotent","Store stable provider event and order identifiers. Make duplicate deliveries safe, and acknowledge events according to the provider's delivery contract after durable receipt."],
      ["Handle ordering and retries","Events may arrive late or out of order. Use the provider's API and documented state transitions to reconcile the latest valid state; do not blindly overwrite a later state with an earlier notification."],
      ["Reconcile the payment outcome","Match provider IDs, transaction hashes, fees and payout references against your ledger. Give operations staff a queue for missing, mismatched or delayed events."],
      ["Test failure and rotation","Exercise duplicate, delayed, invalid-signature and missing events in a sandbox. Test secret rotation, alerting and replay procedures using the provider's documented capabilities."]
    ],
    check:"A duplicate event cannot create a duplicate payout, and a missing or invalid event is visible to operations.",
    faq:[["Does a webhook prove a payment settled?","Only the provider's documented event meaning and your reconciliation can establish the relevant outcome."],["Are all webhook signature schemes identical?","No. Follow the specific provider's documentation and validate its current implementation."]],
    refs:[["Transak: webhook documentation","https://docs.transak.com/features/webhooks"],["Transak: verify webhook payload","https://docs.transak.com/guides/how-to-decrypt-webhook-payload"],["OWASP: web service security","https://cheatsheetseries.owasp.org/cheatsheets/Web_Service_Security_Cheat_Sheet.html"]]
  }
];

export const tutorials: LearnArticle[] = definitions.map(item => ({
  slug:item.slug, title:item.title, description:item.description, level:item.level, topic:item.topic,
  readTime:item.level === "Beginner" ? "4 min read" : "5 min read", updatedAt:"2026-10-31",
  accent:item.topic === "Tokenization" ? "blue" : item.topic === "Stablecoins" ? "green" : "amber",
  relatedHref:item.level === "Beginner" ? "/learn#beginner-tutorials" : item.topic === "Tokenization" ? "/vendors/tokenization-platforms" : item.topic === "Stablecoins" ? "/vendors/stablecoin-infrastructure-providers" : "/vendors/smart-contract-development-companies",
  relatedLabel:item.level === "Beginner" ? "Browse beginner tutorials" : item.topic === "Tokenization" ? "Explore tokenization platforms" : item.topic === "Stablecoins" ? "Explore stablecoin providers" : "Explore smart contract providers",
  sections:[
    {id:"overview", title:"What you will do", body:[item.intro]},
    {id:"before-you-start", title:"Before you start", body:[item.needs]},
    ...item.steps.map(([title,body],index)=>({id:`step-${index+1}`,title:`Step ${index+1}: ${title}`,body:[body]})),
    {id:"check-your-work",title:"Check your work",body:[item.check]}
  ],
  faqs:item.faq.map(([question,answer])=>({question,answer})),
  references:item.refs.map(([label,href])=>({label,href}))
}));
