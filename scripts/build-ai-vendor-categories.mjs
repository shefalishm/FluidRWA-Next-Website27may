import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const siteUrl = "https://www.fluidrwa.com";

const web3AiCategories = [
  {
    slug: "ai-video-generation-tools",
    title: "AI Video Generation Tools for Web3 Teams",
    shortTitle: "AI Video",
    intent: "Create launch videos, explainers, founder clips, product demos and campaign assets without a full production team.",
    buyerFit: "Marketing teams, founders, content leads, BD teams and agencies creating Web3 education or product content.",
    vendors: [
      vendor("Revid.ai", "https://www.revid.ai/", "Short-form video generator", "Text, articles, prompts and assets into ready-to-publish short videos for TikTok, Instagram and YouTube.", "Best for turning Web3 explainers, announcements and threads into social-native video.", "Freemium / paid credits", ["Short-form", "Social publishing", "Automation"], "affiliate-active", "https://www.revid.ai/?via=shefali", "Promo code SHEFALI"),
      vendor("HeyGen", "https://www.heygen.com/", "AI avatar video", "Avatar-led videos, translations, templates and presenter-style product explainers.", "Best for founder-led announcements, product walkthroughs and multilingual educational content.", "Free trial / paid", ["Avatars", "Translation", "Templates"], "affiliate-pending"),
      vendor("Synthesia", "https://www.synthesia.io/", "Enterprise AI video", "AI presenter videos for training, onboarding, internal enablement and customer education.", "Best for compliance training, partner enablement and scalable product education.", "Paid", ["Avatars", "Training", "Enterprise"], "affiliate-pending"),
      vendor("Runway", "https://runwayml.com/", "Generative video studio", "AI video generation, editing and creative workflows for high-production social and brand assets.", "Best for campaigns that need more creative control than simple template videos.", "Free trial / paid", ["Generative video", "Editing", "Creative"], "affiliate-pending"),
      vendor("Pika", "https://pika.art/", "Prompt-to-video creation", "Short AI videos from text, images and creative prompts.", "Best for fast visual concepts, meme-style videos and top-of-funnel creative tests.", "Freemium / paid", ["Text to video", "Creative", "Social"], "affiliate-pending"),
      vendor("OpusClip", "https://www.opus.pro/", "AI video clipping", "Turns long videos, podcasts and webinars into short clips for social platforms.", "Best for repurposing panels, founder interviews, webinars and podcasts into clips.", "Free plan / paid", ["Clipping", "Captions", "Repurposing"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-social-media-tools",
    title: "AI Social Media Tools for Web3 Teams",
    shortTitle: "AI Social Media",
    intent: "Plan, write, schedule, repurpose and analyze social content across LinkedIn, X, TikTok, YouTube Shorts and community channels.",
    buyerFit: "Founders, social media managers, Web3 marketers, KOL teams, community teams and agencies.",
    vendors: [
      vendor("Revid.ai", "https://www.revid.ai/", "Social video creation", "Creates short-form videos from ideas, scripts, articles and assets, with social publishing workflows.", "Best for turning Web3 ideas into short videos quickly.", "Freemium / paid credits", ["TikTok", "Instagram", "YouTube Shorts"], "affiliate-active", "https://www.revid.ai/?via=shefali", "Promo code SHEFALI"),
      vendor("Buffer AI Assistant", "https://buffer.com/ai-assistant", "Social scheduling and writing", "AI-assisted post writing, repurposing and scheduling across social channels.", "Best for lean teams that need a simple publishing calendar.", "Freemium / paid", ["Scheduling", "Repurposing", "Calendar"], "affiliate-pending"),
      vendor("Hootsuite OwlyWriter AI", "https://www.hootsuite.com/platform/owly-writer-ai", "Social campaign assistant", "Generates social captions, post ideas and campaign copy inside Hootsuite workflows.", "Best for teams already managing multiple channels and approvals.", "Paid", ["Campaigns", "Approvals", "Scheduling"], "affiliate-pending"),
      vendor("Taplio", "https://taplio.com/", "LinkedIn growth", "AI-assisted LinkedIn content creation, scheduling and engagement workflows.", "Best for founders and executives building authority in Web3 and AI.", "Paid", ["LinkedIn", "Founder brand", "Scheduling"], "affiliate-pending"),
      vendor("Tweet Hunter", "https://tweethunter.io/", "X content workflow", "AI writing, scheduling, idea generation and analytics for X.", "Best for Web3 founders and projects growing on X.", "Paid", ["X", "Threads", "Analytics"], "affiliate-pending"),
      vendor("Ocoya", "https://www.ocoya.com/", "AI social content suite", "AI captions, creative generation, scheduling and ecommerce-style social workflows.", "Best for small teams needing content creation and scheduling in one place.", "Paid", ["Captions", "Scheduling", "Creative"], "affiliate-pending"),
      vendor("Predis.ai", "https://predis.ai/", "AI social posts and creatives", "Generates social posts, carousels, captions and videos from prompts or product information.", "Best for quick campaign variants and low-lift creative production.", "Freemium / paid", ["Carousels", "Videos", "Captions"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-voiceover-avatar-tools",
    title: "AI Voiceover and Avatar Tools for Web3 Content",
    shortTitle: "Voice and Avatars",
    intent: "Create voiceovers, translated videos, AI presenters and reusable founder-style explainers for education and marketing.",
    buyerFit: "Content teams, educators, product marketers, community teams and founders who need scalable video/audio production.",
    vendors: [
      vendor("ElevenLabs", "https://elevenlabs.io/", "AI voice platform", "Text to speech, voice design, voice cloning, dubbing and sound effects.", "Best for polished voiceovers, multilingual explainers and audio-first content.", "Free tier / paid", ["Voice", "Dubbing", "Cloning"], "affiliate-pending"),
      vendor("HeyGen", "https://www.heygen.com/", "Avatar and translation", "AI avatars, video translation, templates and interactive avatar workflows.", "Best for presenter-led Web3 videos without recording every time.", "Free trial / paid", ["Avatars", "Translation", "Video"], "affiliate-pending"),
      vendor("Tavus", "https://www.tavus.io/", "Personalized AI video", "API and platform for personalized video generation at scale.", "Best for personalized sales, onboarding and investor update videos.", "Paid", ["Personalization", "API", "Video"], "affiliate-pending"),
      vendor("Descript", "https://www.descript.com/", "Audio and video editor", "Transcript-based editing, overdub-style voice workflows and content production tools.", "Best for editing podcasts, founder clips, webinars and educational videos.", "Freemium / paid", ["Editing", "Transcription", "Voice"], "affiliate-pending"),
      vendor("Murf AI", "https://murf.ai/", "Voiceover studio", "AI voiceovers for videos, ads, training and product explainers.", "Best for simple narrated explainers and internal content.", "Free trial / paid", ["Voiceover", "Narration", "Studio"], "affiliate-pending"),
      vendor("Rask AI", "https://www.rask.ai/", "Video translation", "Dubbing, subtitles and video localization for multiple languages.", "Best for taking Web3 education content into new regional markets.", "Paid", ["Dubbing", "Localization", "Subtitles"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-marketing-content-tools",
    title: "AI Marketing and Content Tools for Web3 Teams",
    shortTitle: "Marketing AI",
    intent: "Create landing-page copy, blogs, newsletters, campaign assets, SEO briefs and product education content faster.",
    buyerFit: "Growth teams, founders, agencies, newsletter operators, SEO teams and content marketers.",
    vendors: [
      vendor("Jasper", "https://www.jasper.ai/", "AI marketing content", "Brand-aware campaign, blog, social and marketing copy generation.", "Best for structured marketing teams that need brand controls.", "Paid", ["Brand voice", "Campaigns", "Content"], "affiliate-pending"),
      vendor("Copy.ai", "https://www.copy.ai/", "GTM content automation", "AI workflows for sales, marketing and go-to-market content.", "Best for repeatable content and outbound workflows.", "Paid", ["GTM", "Workflows", "Copy"], "affiliate-pending"),
      vendor("Writer", "https://writer.com/", "Enterprise generative AI", "Enterprise AI writing, governance and workflow automation.", "Best for larger teams needing content controls and governance.", "Paid", ["Enterprise", "Governance", "Content"], "affiliate-pending"),
      vendor("Surfer SEO", "https://surferseo.com/", "SEO content optimization", "Keyword-guided content briefs, scoring and optimization.", "Best for ranking-focused Web3 blog and landing-page content.", "Paid", ["SEO", "Briefs", "Optimization"], "affiliate-pending"),
      vendor("Frase", "https://www.frase.io/", "SEO research and outlines", "SERP research, outlines and AI content workflows.", "Best for fast article planning and answer-engine style briefs.", "Paid", ["SEO", "SERP research", "Outlines"], "affiliate-pending"),
      vendor("Typeface", "https://www.typeface.ai/", "Brand-personalized AI content", "AI content creation for brand-safe marketing campaigns and enterprise teams.", "Best for companies needing brand-consistent asset generation.", "Paid", ["Brand", "Campaigns", "Enterprise"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-sales-outreach-tools",
    title: "AI Sales and Outreach Tools for Web3 Companies",
    shortTitle: "Sales AI",
    intent: "Find leads, enrich accounts, personalize outbound, improve replies and manage Web3 BD pipelines.",
    buyerFit: "BD teams, agencies, fundraising teams, vendor sales teams, ecosystems and founder-led sales motions.",
    vendors: [
      vendor("Clay", "https://www.clay.com/", "AI prospecting and enrichment", "Lead enrichment, account research, AI personalization and outbound workflows.", "Best for targeted Web3 sales lists and highly personalized outbound.", "Paid", ["Enrichment", "Outbound", "Personalization"], "affiliate-pending"),
      vendor("Apollo", "https://www.apollo.io/", "Sales intelligence", "Prospecting database, engagement sequences, enrichment and AI-assisted sales workflows.", "Best for teams needing contact data plus outreach execution.", "Freemium / paid", ["Prospecting", "Sequences", "Data"], "affiliate-pending"),
      vendor("Instantly", "https://instantly.ai/", "Cold email platform", "Email sending, warmup, lead management and campaign analytics.", "Best for high-volume but controlled B2B outbound.", "Paid", ["Cold email", "Warmup", "Campaigns"], "affiliate-pending"),
      vendor("Smartlead", "https://www.smartlead.ai/", "Outbound email infrastructure", "Cold email sending, deliverability and campaign management.", "Best for agencies and teams running multiple outbound campaigns.", "Paid", ["Email", "Deliverability", "Agency"], "affiliate-pending"),
      vendor("Lavender", "https://www.lavender.ai/", "Email coaching", "AI email writing, scoring and personalization support.", "Best for improving reply quality and sales-message clarity.", "Paid", ["Email coaching", "Personalization", "Sales"], "affiliate-pending"),
      vendor("Regie.ai", "https://www.regie.ai/", "Sales content and prospecting", "AI-assisted prospecting, outbound sequences and sales content.", "Best for sales teams that want structured AI outbound workflows.", "Paid", ["Sequences", "Prospecting", "Sales AI"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-crm-revops-tools",
    title: "AI CRM and RevOps Tools for Web3 Teams",
    shortTitle: "CRM and RevOps",
    intent: "Manage leads, accounts, pipeline, notes, forecasts and customer data with AI-assisted workflows.",
    buyerFit: "Vendor sales teams, agencies, B2B Web3 startups, ecosystem teams and partnership teams.",
    vendors: [
      vendor("HubSpot AI", "https://www.hubspot.com/artificial-intelligence", "AI CRM and marketing hub", "CRM, marketing automation, sales tools and AI content/workflow support.", "Best for Web3 teams needing CRM plus marketing automation.", "Freemium / paid", ["CRM", "Marketing", "Sales"], "affiliate-pending"),
      vendor("Salesforce Einstein", "https://www.salesforce.com/artificial-intelligence/", "Enterprise CRM AI", "AI features across Salesforce sales, service, marketing and analytics workflows.", "Best for enterprise sales and regulated organizations.", "Paid", ["Enterprise CRM", "Forecasting", "Automation"], "affiliate-pending"),
      vendor("Attio", "https://attio.com/", "Modern CRM", "Flexible CRM for relationship intelligence, startups and deal workflows.", "Best for relationship-heavy Web3 BD and investor pipelines.", "Freemium / paid", ["CRM", "Relationships", "Pipeline"], "affiliate-pending"),
      vendor("Pipedrive AI", "https://www.pipedrive.com/en/features/ai-sales-assistant", "Sales pipeline CRM", "Pipeline management with AI sales assistant and automation features.", "Best for simple pipeline tracking and founder-led sales.", "Paid", ["Pipeline", "Sales assistant", "CRM"], "affiliate-pending"),
      vendor("Folk", "https://www.folk.app/", "Relationship CRM", "Lightweight CRM for prospect lists, partnerships and contact workflows.", "Best for partnerships, investor relations and network-based sales.", "Paid", ["Relationships", "Lists", "Outreach"], "affiliate-pending"),
      vendor("Affinity", "https://www.affinity.co/", "Relationship intelligence", "CRM and relationship intelligence for deal teams and investment workflows.", "Best for funds, advisors and relationship-led Web3 BD.", "Paid", ["Relationship intelligence", "Deals", "CRM"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-research-market-intelligence-tools",
    title: "AI Research and Market Intelligence Tools for Web3",
    shortTitle: "Research AI",
    intent: "Research markets, companies, protocols, filings, news, competitors, narratives and ecosystem signals faster.",
    buyerFit: "Founders, analysts, content teams, investors, strategy teams and market intelligence desks.",
    vendors: [
      vendor("Perplexity", "https://www.perplexity.ai/", "AI answer engine", "Web research, cited answers and quick synthesis across public sources.", "Best for fast market research and source-led topic discovery.", "Freemium / paid", ["Research", "Citations", "Answer engine"], "affiliate-pending"),
      vendor("AlphaSense", "https://www.alpha-sense.com/", "Market intelligence", "AI search across company documents, expert calls, news and market research.", "Best for institutional market and company research.", "Paid", ["Market intelligence", "Research", "Enterprise"], "affiliate-pending"),
      vendor("Hebbia", "https://www.hebbia.ai/", "Document research", "AI workflows for analyzing data rooms, filings and complex document sets.", "Best for deep diligence and financial-document analysis.", "Paid", ["Diligence", "Documents", "Finance"], "affiliate-pending"),
      vendor("Exa", "https://exa.ai/", "AI search API", "Search API designed for AI applications and high-relevance web retrieval.", "Best for teams building research agents or market intelligence workflows.", "Paid API", ["Search API", "Agents", "Retrieval"], "affiliate-pending"),
      vendor("Tegus", "https://www.tegus.com/", "Expert research", "Expert-call transcripts and investment research workflows.", "Best for market diligence and sector research.", "Paid", ["Expert calls", "Research", "Diligence"], "affiliate-pending"),
      vendor("Kaito", "https://www.kaito.ai/", "Crypto AI search", "AI search and intelligence for crypto, Web3 narratives and market attention.", "Best for crypto-native narrative and ecosystem research.", "Paid", ["Crypto search", "Narratives", "Market intelligence"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-customer-support-tools",
    title: "AI Customer Support Tools for Web3 Products",
    shortTitle: "Support AI",
    intent: "Handle user questions, onboarding, help-center answers, ticket triage and support automation without losing trust.",
    buyerFit: "Wallets, exchanges, tokenization platforms, fintech apps, SaaS vendors and Web3 communities.",
    vendors: [
      vendor("Intercom Fin", "https://www.intercom.com/fin", "AI support agent", "AI support agent for answering customers from help-center and support data.", "Best for product-led teams with structured support docs.", "Paid", ["Support agent", "Help center", "Chat"], "affiliate-pending"),
      vendor("Zendesk AI", "https://www.zendesk.com/ai/", "Customer service AI", "AI for ticket routing, agent assistance, knowledge base and support automation.", "Best for larger support teams and existing Zendesk users.", "Paid", ["Tickets", "Agent assist", "Support"], "affiliate-pending"),
      vendor("Tidio Lyro", "https://www.tidio.com/lyro/", "AI chatbot", "AI chatbot and customer service automation for websites and ecommerce-style workflows.", "Best for simple site support and lead capture.", "Freemium / paid", ["Chatbot", "Support", "Website"], "affiliate-pending"),
      vendor("Sierra", "https://sierra.ai/", "AI customer agents", "AI agents for customer experience, workflows and service automation.", "Best for enterprise support experiences with workflow depth.", "Paid", ["AI agents", "Customer experience", "Enterprise"], "affiliate-pending"),
      vendor("Ada", "https://www.ada.cx/", "AI customer service automation", "Automated customer service for chat, messaging and support workflows.", "Best for scaling repetitive support without only adding agents.", "Paid", ["Automation", "Chat", "Support"], "affiliate-pending"),
      vendor("Crisp", "https://crisp.chat/", "Customer messaging", "Shared inbox, chatbot and customer messaging tools with AI features.", "Best for smaller Web3 teams needing chat, inbox and automation.", "Freemium / paid", ["Inbox", "Chat", "Automation"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-design-creative-tools",
    title: "AI Design and Creative Tools for Web3 Brands",
    shortTitle: "Design AI",
    intent: "Create visuals, campaign concepts, social graphics, landing-page assets, brand images and creative variants.",
    buyerFit: "Founders, designers, social teams, NFT projects, agencies and content marketers.",
    vendors: [
      vendor("Canva AI", "https://www.canva.com/ai/", "AI design suite", "Design, presentations, social graphics and AI-assisted creative workflows.", "Best for fast branded content and non-designer teams.", "Freemium / paid", ["Design", "Social graphics", "Presentations"], "affiliate-pending"),
      vendor("Figma AI", "https://www.figma.com/ai/", "Product design AI", "AI-assisted product design, ideation and interface workflows inside Figma.", "Best for product teams and designers building app experiences.", "Paid / included by plan", ["Product design", "UI", "Collaboration"], "affiliate-pending"),
      vendor("Midjourney", "https://www.midjourney.com/", "AI image generation", "High-quality image generation for campaign concepts, brand worlds and creative exploration.", "Best for visual direction, campaign concepts and artistic assets.", "Paid", ["Images", "Concepts", "Creative"], "affiliate-pending"),
      vendor("Ideogram", "https://ideogram.ai/", "Text-aware image generation", "AI image generation with strong typography and poster-style creative output.", "Best for social graphics, launch visuals and text-heavy creative.", "Freemium / paid", ["Images", "Typography", "Social"], "affiliate-pending"),
      vendor("Adobe Firefly", "https://www.adobe.com/products/firefly.html", "Commercial creative AI", "Generative image and creative tools integrated into Adobe workflows.", "Best for teams already using Adobe and needing commercial creative controls.", "Freemium / paid", ["Adobe", "Images", "Commercial"], "affiliate-pending"),
      vendor("Krea", "https://www.krea.ai/", "Real-time AI creative", "AI image and video tools for real-time creative generation and enhancement.", "Best for quick visual exploration and creative variants.", "Freemium / paid", ["Images", "Video", "Real-time"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-automation-agent-tools",
    title: "AI Automation and Agent Tools for Web3 Operators",
    shortTitle: "Automation AI",
    intent: "Automate workflows across research, CRM, content, reporting, support, internal ops and data handoffs.",
    buyerFit: "Lean teams, agencies, ops teams, founders, product teams and technical growth teams.",
    vendors: [
      vendor("Zapier AI", "https://zapier.com/ai", "Workflow automation", "AI-assisted automations across apps, forms, CRM, email, sheets and internal tools.", "Best for no-code automations across sales, marketing and ops.", "Freemium / paid", ["Automation", "No-code", "Apps"], "affiliate-pending"),
      vendor("Make", "https://www.make.com/en/ai-automation", "Visual automation", "Visual workflows, app integrations and AI-powered automation scenarios.", "Best for more complex no-code workflows and operations automations.", "Freemium / paid", ["Workflows", "Integrations", "No-code"], "affiliate-pending"),
      vendor("n8n", "https://n8n.io/", "Workflow automation", "Flexible automation platform with self-hosting and AI workflow support.", "Best for technical teams wanting control, privacy and custom logic.", "Open source / paid", ["Self-host", "Workflows", "AI"], "affiliate-pending"),
      vendor("Lindy", "https://www.lindy.ai/", "AI employees", "AI agents for scheduling, inbox, CRM, research and operational tasks.", "Best for teams testing assistant-style agents for repeatable work.", "Paid", ["Agents", "Ops", "Assistant"], "affiliate-pending"),
      vendor("Relevance AI", "https://relevanceai.com/", "AI workforce", "Build AI agents and workflows for sales, support, research and operations.", "Best for agent-based team workflows and internal automation.", "Paid", ["Agents", "Workflows", "Teams"], "affiliate-pending"),
      vendor("Bardeen", "https://www.bardeen.ai/", "Browser automation", "AI automations for browser workflows, research, scraping and repetitive tasks.", "Best for lightweight research and browser-based ops tasks.", "Freemium / paid", ["Browser", "Research", "Automation"], "affiliate-pending")
    ]
  },
  {
    slug: "ai-compliance-document-tools",
    title: "AI Compliance and Document Tools for Web3 Teams",
    shortTitle: "Compliance AI",
    intent: "Review contracts, policies, onboarding documents, evidence, controls, compliance tasks and diligence materials.",
    buyerFit: "Compliance teams, legal teams, tokenization platforms, funds, auditors, advisors and operations teams.",
    vendors: [
      vendor("Vanta AI", "https://www.vanta.com/products/ai", "Trust and compliance automation", "Security and compliance workflows with AI support for evidence and controls.", "Best for startups needing SOC 2, ISO and security compliance operations.", "Paid", ["Compliance", "Security", "Evidence"], "affiliate-pending"),
      vendor("Norm Ai", "https://www.norm.ai/", "Regulatory AI", "AI agents and workflows for regulatory compliance analysis and review.", "Best for regulatory-heavy fintech and Web3 workflows.", "Paid", ["Regulatory", "Compliance", "Agents"], "affiliate-pending"),
      vendor("Harvey", "https://www.harvey.ai/", "Legal AI", "AI for legal research, drafting and document analysis.", "Best for legal teams and law firms working with complex documentation.", "Paid", ["Legal", "Research", "Documents"], "affiliate-pending"),
      vendor("Dili", "https://www.dili.ai/", "Diligence automation", "AI diligence workflows for deal, legal and finance teams.", "Best for reviewing large sets of documents and transaction materials.", "Paid", ["Diligence", "Documents", "Finance"], "affiliate-pending"),
      vendor("Docsumo", "https://www.docsumo.com/", "Document extraction", "AI document processing and data extraction for structured and semi-structured documents.", "Best for onboarding, invoices, forms and document-heavy operations.", "Paid", ["Extraction", "Documents", "Operations"], "affiliate-pending"),
      vendor("Hebbia", "https://www.hebbia.ai/", "Knowledge work AI", "AI analysis for data rooms, filings, contracts and financial documents.", "Best for deep research and high-value diligence workflows.", "Paid", ["Diligence", "Finance", "Documents"], "affiliate-pending")
    ]
  }
];

const cryptoNativeAiCategories = [
  {
    slug: "ai-agents-autonomous-systems",
    title: "AI Agents and Autonomous Systems",
    shortTitle: "AI Agents",
    intent: "Compare agent platforms, autonomous workflow systems and onchain agent infrastructure.",
    buyerFit: "Teams building AI agents that interact with wallets, protocols, research workflows or operations.",
    vendors: [
      vendor("Fetch.ai", "https://fetch.ai/", "Economic agents", "Autonomous agents for discovery, coordination and digital commerce workflows.", "Best for multi-agent systems and agent-based automation.", "Token / ecosystem", ["Agents", "Multi-agent", "Automation"], "standard"),
      vendor("Olas", "https://olas.network/", "Onchain agents", "Autonomous services and agent infrastructure for onchain tasks.", "Best for open agent creation and coordination.", "Token / ecosystem", ["Agents", "Onchain", "Coordination"], "standard"),
      vendor("Virtuals Protocol", "https://www.virtuals.io/", "Tokenized agents", "AI agents as products, communities and tokenized digital assets.", "Best for agent launch and monetization experiments.", "Token / ecosystem", ["Tokenized AI", "Agents", "Community"], "standard"),
      vendor("Ritual", "https://ritual.net/", "AI execution layer", "Inference and AI execution connected to blockchain workflows.", "Best for smart contracts and agents using model outputs.", "Infrastructure", ["Inference", "Execution", "Smart contracts"], "standard")
    ]
  },
  {
    slug: "ai-document-intelligence-knowledge-retrieval",
    title: "AI Document Intelligence and Knowledge Retrieval",
    shortTitle: "Document AI",
    intent: "Compare AI document intelligence, retrieval, parsing and knowledge automation vendors.",
    buyerFit: "Legal, compliance, investment, diligence and operating teams working with complex documents.",
    vendors: [
      vendor("OpenAI", "https://openai.com/", "Foundation models", "Text, code, image, audio and multimodal AI capabilities for building custom workflows.", "Best for teams building internal assistants and AI apps.", "API / enterprise", ["Models", "API", "Documents"], "standard"),
      vendor("Anthropic Claude", "https://www.anthropic.com/claude", "Reasoning models", "Long-context reasoning for documents, code, policies and research.", "Best for careful analysis of large document sets.", "API / enterprise", ["Long context", "Reasoning", "Documents"], "standard"),
      vendor("Hebbia", "https://www.hebbia.ai/", "Financial knowledge work", "Document research and agentic workflows for finance and legal teams.", "Best for data rooms, filings and diligence.", "Enterprise", ["Research", "Documents", "Finance"], "standard"),
      vendor("LlamaIndex", "https://www.llamaindex.ai/", "Retrieval framework", "Framework for connecting enterprise data to LLM applications and agents.", "Best for building RAG and knowledge agents.", "Open source / paid", ["RAG", "Connectors", "Agents"], "standard")
    ]
  },
  {
    slug: "ai-risk-analytics-compliance-intelligence",
    title: "AI Risk Analytics and Compliance Intelligence",
    shortTitle: "Risk AI",
    intent: "Compare AI-powered analytics, transaction monitoring, wallet intelligence and compliance intelligence tools.",
    buyerFit: "Compliance teams, exchanges, custodians, funds and digital asset operations teams.",
    vendors: [
      vendor("Chainalysis", "https://www.chainalysis.com/", "Compliance analytics", "Blockchain intelligence for KYT, investigations and sanctions screening.", "Best for regulated compliance programs.", "Enterprise", ["KYT", "Investigations", "Sanctions"], "standard"),
      vendor("TRM Labs", "https://www.trmlabs.com/", "Blockchain intelligence", "Transaction monitoring, tracing and risk intelligence.", "Best for real-time crypto risk operations.", "Enterprise", ["Monitoring", "Wallet risk", "Investigations"], "standard"),
      vendor("Elliptic", "https://www.elliptic.co/", "Institutional crypto risk", "Wallet exposure, sanctions and cross-chain risk analytics.", "Best for institutional compliance teams.", "Enterprise", ["AML", "Risk scoring", "Cross-chain"], "standard"),
      vendor("Arkham Intelligence", "https://www.arkhamintelligence.com/", "Entity attribution", "Wallet labels, entity mapping and onchain intelligence.", "Best for investigations and market intelligence.", "Freemium / paid", ["Wallets", "Entity labels", "Research"], "standard")
    ]
  },
  {
    slug: "decentralized-ai-compute-gpu-infrastructure",
    title: "Decentralized AI Compute and GPU Infrastructure",
    shortTitle: "AI Compute",
    intent: "Compare decentralized GPU networks, AI compute marketplaces and inference infrastructure.",
    buyerFit: "AI builders, Web3 projects and data-heavy applications needing compute alternatives.",
    vendors: [
      vendor("Akash Network", "https://akash.network/", "Compute marketplace", "Open marketplace for containerized compute and GPU workloads.", "Best for decentralized compute access.", "Token / marketplace", ["GPU", "Cloud", "Marketplace"], "standard"),
      vendor("Render Network", "https://rendernetwork.com/", "GPU network", "Distributed GPU resources for rendering and AI compute.", "Best for creative and GPU-intensive workloads.", "Token / network", ["GPU", "Rendering", "AI compute"], "standard"),
      vendor("io.net", "https://io.net/", "GPU clusters", "Distributed GPU clusters for training and inference.", "Best for teams aggregating compute capacity.", "Marketplace", ["GPU clusters", "Training", "Inference"], "standard"),
      vendor("Bittensor", "https://bittensor.com/", "AI network", "Subnet-based decentralized intelligence and incentive markets.", "Best for decentralized AI markets.", "Token / network", ["Subnets", "Inference", "AI"], "standard")
    ]
  },
  {
    slug: "ai-data-model-marketplaces",
    title: "AI Data and Model Marketplaces",
    shortTitle: "AI Data",
    intent: "Compare AI data marketplaces, model marketplaces, IP licensing and provenance infrastructure.",
    buyerFit: "AI builders, data owners, protocols and creator ecosystems exploring data monetization.",
    vendors: [
      vendor("Ocean Protocol", "https://oceanprotocol.com/", "Data marketplace", "Data access, tokenized licensing and compute-to-data workflows.", "Best for monetizing datasets.", "Token / marketplace", ["Data", "Licensing", "Compute-to-data"], "standard"),
      vendor("Story Protocol", "https://www.story.foundation/", "Programmable IP", "IP licensing and provenance infrastructure for AI-era content.", "Best for AI training and creator IP workflows.", "Protocol", ["IP", "Licensing", "Provenance"], "standard"),
      vendor("Vana", "https://www.vana.org/", "User-owned data", "User-owned datasets and data networks for AI.", "Best for user-permissioned data ecosystems.", "Protocol", ["User data", "Data DAOs", "Privacy"], "standard"),
      vendor("Filecoin", "https://filecoin.io/", "Data storage", "Decentralized storage for datasets and model assets.", "Best for archival AI data infrastructure.", "Token / network", ["Storage", "Datasets", "Proofs"], "standard")
    ]
  },
  {
    slug: "verifiable-ai-smart-contract-infrastructure",
    title: "Verifiable AI and Smart Contract Infrastructure",
    shortTitle: "Verifiable AI",
    intent: "Compare verifiable inference, ZKML, TEE compute and proof infrastructure for AI-enabled smart contracts.",
    buyerFit: "Teams that need AI outputs inside smart contract or trust-sensitive workflows.",
    vendors: [
      vendor("Giza", "https://www.gizatech.xyz/", "Verifiable ML", "Verifiable machine learning and agent infrastructure for blockchain workflows.", "Best for AI predictions inside onchain systems.", "Infrastructure", ["ZKML", "Inference", "Agents"], "standard"),
      vendor("Ritual", "https://ritual.net/", "AI execution", "Model inference and execution for blockchain applications.", "Best for smart contracts using AI outputs.", "Infrastructure", ["Inference", "Blockchain", "Execution"], "standard"),
      vendor("RISC Zero", "https://risczero.com/", "zkVM proofs", "Proofs for offchain computation and verified results.", "Best for verifiable computation pipelines.", "Open source / paid", ["zkVM", "Proofs", "Verification"], "standard"),
      vendor("Space and Time", "https://www.spaceandtime.io/", "Verifiable data", "Cryptographic proofs for database queries and data workflows.", "Best for verifiable analytics and data access.", "Infrastructure", ["Proof of SQL", "Data", "Analytics"], "standard")
    ]
  }
];

const categories = [...web3AiCategories, ...cryptoNativeAiCategories];

function vendor(name, url, type, description, web3UseCase, pricing, tags, affiliateStatus, affiliateUrl = "", affiliateNote = "") {
  return { name, url, type, description, web3UseCase, pricing, tags, affiliateStatus, affiliateUrl, affiliateNote };
}

function esc(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(value) {
  return String(value).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function categoryUrl(slug) {
  return `${siteUrl}/vendors/${slug}`;
}

function categoryImage(category) {
  const imageGroups = {
    "/assets/ai-vendor-video.jpg": ["ai-video-generation-tools", "ai-voiceover-avatar-tools"],
    "/assets/ai-vendor-social.jpg": ["ai-social-media-tools", "ai-marketing-content-tools", "ai-design-creative-tools"],
    "/assets/ai-vendor-workflow.jpg": ["ai-sales-outreach-tools", "ai-crm-revops-tools", "ai-research-market-intelligence-tools", "ai-customer-support-tools", "ai-compliance-document-tools", "ai-document-intelligence-knowledge-retrieval"],
    "/assets/ai-vendor-infrastructure.jpg": ["ai-automation-agent-tools", "ai-agents-autonomous-systems", "ai-risk-analytics-compliance-intelligence", "decentralized-ai-compute-gpu-infrastructure", "ai-data-model-marketplaces", "verifiable-ai-smart-contract-infrastructure"]
  };
  const match = Object.entries(imageGroups).find(([, slugs]) => slugs.includes(category.slug));
  return match ? match[0] : "/assets/ai-vendor-workflow.jpg";
}

function bestFit(value = "") {
  const cleaned = value.replace(/^Best for\s+/i, "");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function startingPoint(v) {
  const pricing = String(v.pricing || "").toLowerCase();
  if (pricing.includes("freemium")) return "Free tier available; paid upgrades for heavier usage.";
  if (pricing.includes("free trial")) return "Free trial or demo path; paid plans after trial.";
  if (pricing.includes("open source")) return "Open source entry point; paid cloud, support or enterprise options may apply.";
  if (pricing.includes("enterprise")) return "Enterprise quote or sales-led pricing.";
  if (pricing.includes("api")) return "API or usage-based starting point; enterprise pricing for larger deployments.";
  if (pricing.includes("token") || pricing.includes("marketplace") || pricing.includes("network") || pricing.includes("infrastructure")) return "Network, infrastructure or usage-based pricing; check current terms.";
  if (pricing.includes("paid")) return "Paid plans; check current plan limits before committing.";
  return `${v.pricing}; verify current pricing on the vendor site.`;
}

function watchOut(v) {
  const text = `${v.type} ${v.description} ${v.web3UseCase} ${v.pricing} ${v.tags.join(" ")}`.toLowerCase();
  if (text.includes("enterprise") || text.includes("governance")) return "Less ideal for very small teams that need a cheap, fast self-serve tool.";
  if (text.includes("api") || text.includes("framework") || text.includes("infrastructure")) return "Less ideal if you want a simple no-code tool without developer setup.";
  if (text.includes("token") || text.includes("onchain") || text.includes("decentralized") || text.includes("zk")) return "Less ideal for teams that need a conventional SaaS workflow with predictable procurement.";
  if (text.includes("video") || text.includes("avatar") || text.includes("voice") || text.includes("creative")) return "Less ideal for regulated content unless you add review, approvals and brand controls.";
  if (text.includes("outbound") || text.includes("cold email") || text.includes("sales")) return "Less ideal if you do not already have a clear ICP, data source and compliance-safe outreach process.";
  if (text.includes("social") || text.includes("linkedin") || text.includes("x ")) return "Less ideal if your strategy still needs original research, expert POV and human editing.";
  if (text.includes("crm") || text.includes("pipeline")) return "Less ideal if your data model, ownership and sales process are not already defined.";
  if (text.includes("support") || text.includes("chatbot") || text.includes("customer")) return "Less ideal for complex support cases without escalation rules and monitored answers.";
  if (text.includes("seo") || text.includes("content") || text.includes("marketing")) return "Less ideal if you publish generic AI copy without subject-matter review and citations.";
  return "Less ideal when the workflow needs deep customization, compliance review or human expert judgment.";
}

function categoryFaqs(category) {
  const vendorNames = category.vendors.map((v) => v.name).join(", ");
  const categoryLabel = category.shortTitle;
  const buyerFit = category.buyerFit.replace(/\.$/, "");
  const firstVendor = category.vendors[0];
  const freeOrTrial = category.vendors.filter((v) => /free|freemium|trial|open source/i.test(v.pricing)).map((v) => v.name);
  const paidOrEnterprise = category.vendors.filter((v) => /paid|enterprise|api|infrastructure|token|marketplace|network/i.test(v.pricing)).map((v) => v.name);
  return [
    {
      q: `What are ${categoryLabel} vendors?`,
      a: `${category.title} help teams such as ${buyerFit} evaluate and use AI tools for this workflow: ${category.intent} They are most useful when the team has a clear owner, review process and success metric before adding AI automation.`
    },
    {
      q: `Which ${categoryLabel} vendors are listed on FluidRWA?`,
      a: `FluidRWA currently maps ${vendorNames}. The list is designed as a buyer shortlist, not a ranking, so teams can compare use case fit, starting point, limitations and vendor websites.`
    },
    {
      q: `How should a Web3 team choose ${categoryLabel} vendors?`,
      a: `Start with the job to be done: content creation, sales, compliance, support, research, automation, infrastructure or another workflow. Then compare each vendor by output quality, integrations, data handling, pricing model, review controls, team skills required and whether it fits a Web3 operating environment.`
    },
    {
      q: `What is ${firstVendor.name} good for?`,
      a: `${firstVendor.name} is best used for ${bestFit(firstVendor.web3UseCase).toLowerCase()} It may still need human review, brand checks and workflow controls before being used in production.`
    },
    {
      q: `Are these ${categoryLabel} tools free or paid?`,
      a: freeOrTrial.length ? `Some tools in this category have free, freemium, trial or open-source entry points, including ${freeOrTrial.join(", ")}. Others use paid, enterprise, API, infrastructure or network-based pricing, so teams should confirm current plan limits directly with each vendor.` : `Most tools in this category are paid, enterprise, infrastructure or usage-based products. Teams should confirm current plan limits, contract terms and implementation requirements directly with each vendor.`
    },
    {
      q: `What should Web3 teams watch out for when buying ${categoryLabel} tools?`,
      a: `The main risks are weak review processes, unclear data permissions, over-automation, generic output, vendor lock-in, poor integration with existing workflows and pricing that changes as usage grows. Regulated teams should also check legal, compliance, security and approval requirements before using AI outputs externally.`
    },
    {
      q: `Can these AI vendors support tokenization, RWA or blockchain teams?`,
      a: `Yes, but usually as operating tools rather than core tokenization infrastructure. They can support marketing, education, sales, support, diligence, research, automation or developer workflows around Web3 and RWA businesses, while core issuance, custody, compliance and smart contract infrastructure still need specialist Web3 vendors.`
    },
    {
      q: `Does FluidRWA rank these ${categoryLabel} vendors?`,
      a: `No. FluidRWA organizes vendors for discovery and comparison. Some outbound links may become affiliate links, but listings are intended to help buyers shortlist relevant tools rather than declare one universal best vendor.`
    }
  ];
}

function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };
}

function faqSection(category, faqs) {
  const items = faqs.map((faq) => `<article class="ai-faq-item"><h3>${esc(faq.q)}</h3><p>${esc(faq.a)}</p></article>`).join("");
  return `<section class="ai-faq-section" id="faq"><div class="light-container"><div class="ai-section-head"><div><p class="eyebrow light-eyebrow">Buyer FAQ</p><h2>${esc(category.shortTitle)} questions buyers ask</h2></div><p>Short answers for searchers, operators and procurement teams comparing AI vendors for Web3 workflows.</p></div><div class="ai-faq-grid">${items}</div></div></section>`;
}

function landingFaqs() {
  return [
    {
      q: "What is the FluidRWA AI vendor directory?",
      a: "The FluidRWA AI vendor directory is a curated map of AI tools that Web3, tokenization, RWA, fintech and blockchain teams can use for marketing, sales, research, compliance, support, automation, content and infrastructure workflows."
    },
    {
      q: "How are AI vendors different from Web3 vendors on FluidRWA?",
      a: "Web3 vendors usually provide core blockchain, tokenization, custody, compliance, data or smart contract infrastructure. AI vendors usually support operating workflows around those businesses, such as creating content, researching markets, managing leads, automating support or improving internal productivity."
    },
    {
      q: "Which AI vendor categories does FluidRWA cover?",
      a: `FluidRWA currently covers ${categories.map((category) => category.shortTitle).join(", ")} and other AI categories relevant to Web3 operators.`
    },
    {
      q: "How should buyers use these AI vendor pages?",
      a: "Buyers should start with the workflow they need to improve, open the matching category, compare vendors by what they do, what they are good for, what they are not ideal for, starting point and website, then shortlist tools for demos or trials."
    },
    {
      q: "Are these AI vendors ranked?",
      a: "No. FluidRWA organizes vendors for discovery and comparison rather than ranking one universal winner. The right AI vendor depends on the workflow, budget, team size, integrations, data sensitivity and review process."
    },
    {
      q: "Can AI vendors help tokenization and RWA companies grow?",
      a: "Yes. AI vendors can help tokenization and RWA companies create educational content, manage outbound, support users, analyze documents, generate video, improve research workflows and scale operations. They do not replace specialist legal, compliance, custody or smart contract infrastructure."
    }
  ];
}

function landingFaqSection(faqs) {
  const items = faqs.map((faq) => `<article class="ai-faq-item"><h3>${esc(faq.q)}</h3><p>${esc(faq.a)}</p></article>`).join("");
  return `<section class="ai-faq-section" id="faq"><div class="light-container"><div class="ai-section-head"><div><p class="eyebrow light-eyebrow">AI vendor FAQ</p><h2>Questions buyers ask before choosing AI tools</h2></div><p>Answers for founders, marketers, operators and procurement teams comparing AI vendors for Web3 and RWA workflows.</p></div><div class="ai-faq-grid">${items}</div></div></section>`;
}

function heroVisual(categoryLabel = "AI vendor workflows", imageSrc = "/assets/ai-vendor-workflow.jpg") {
  return `<figure class="ai-hero-visual"><img src="${esc(imageSrc)}" alt="${esc(categoryLabel)} workspace preview for AI vendor comparison" loading="eager"><figcaption class="ai-hero-caption"><span>${esc(categoryLabel)}</span><span>AI tools for Web3 operators</span></figcaption></figure>`;
}

function header() {
  return `<header class="site-header light-header" data-site-header><nav class="nav" aria-label="Main navigation"><a class="brand light-brand" href="/" aria-label="FluidRWA home"><img src="/assets/fluidrwa-small-logo.png" alt="FluidRWA"></a><button class="mobile-toggle light-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><div class="nav-links light-nav-links" data-nav-links><a href="/">Home</a><a href="/web3vendorecosystem">Web3 Vendors</a><a href="/ai-vendors">AI Vendors</a><a href="/use-cases">Use Cases</a><a href="/blog">Insights</a><a href="/tools">Tools</a><a class="nav-ecosystem-cta" href="/submit-requirement">Submit Requirements</a></div></nav></header>`;
}

function footer() {
  return `<footer class="light-footer"><div class="light-container footer-grid-lite footer-simple"><a class="footer-brand-link" href="/" aria-label="FluidRWA home"><img class="footer-logo-lite" src="/assets/fluidrwa-small-logo.png" alt="FluidRWA"></a><nav class="footer-legal-links" aria-label="Footer navigation"><a href="/ai-vendors">AI Vendors</a><a href="/web3vendorecosystem">Web3 Vendors</a><a href="/contact">Contact Us</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a></nav></div><div class="light-container footer-bottom-lite">© <span data-year></span> FluidRWA.</div></footer>`;
}

function styles() {
  return `<style>
    .ai-hub-hero{padding:54px 0 42px;background:linear-gradient(135deg,#fff8d7 0%,#f4fbff 62%,#fff 100%);border-bottom:1px solid rgba(38,100,169,.12)}
    .ai-hub-hero .light-container{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(340px,.78fr);gap:42px;align-items:center}
    .ai-hub-copy{max-width:850px}
    .ai-hub-hero h1{max-width:820px;margin:10px 0 16px;color:#07142a;font-size:clamp(34px,4.25vw,58px);line-height:1.06;letter-spacing:0;font-weight:900}
    .ai-hub-hero p{max-width:740px;color:#536178;font-size:clamp(16px,1.35vw,19px);line-height:1.58}
    .ai-hero-visual{margin:0;border:1px solid rgba(38,100,169,.16);border-radius:28px;background:#fff;box-shadow:0 24px 60px rgba(18,33,58,.12);overflow:hidden;min-height:300px}
    .ai-hero-visual img{display:block;width:100%;height:100%;min-height:300px;object-fit:cover}
    .ai-hero-caption{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:14px 16px;background:#fff;color:#536178;font-size:12px;font-weight:800}.ai-hero-caption span:first-child{color:#07142a}
    .ai-table-section{padding:44px 0}.ai-section-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:18px}.ai-section-head h2{margin:0;color:#07142a;font-size:clamp(24px,3vw,40px);line-height:1.1}.ai-section-head p{max-width:760px;color:#64748b;line-height:1.55}
    .ai-category-table-wrap,.ai-vendor-table-wrap{overflow-x:auto;border:1px solid rgba(38,100,169,.14);border-radius:20px;background:#fff;box-shadow:0 18px 48px rgba(18,33,58,.07)}
    .ai-category-table,.ai-vendor-table{width:100%;border-collapse:collapse;min-width:1240px}
    .ai-category-table th,.ai-category-table td,.ai-vendor-table th,.ai-vendor-table td{padding:16px 18px;border-bottom:1px solid rgba(38,100,169,.1);text-align:left;vertical-align:top;color:#42526a;font-size:14px;line-height:1.45}
    .ai-category-table th,.ai-vendor-table th{background:#f4f9ff;color:#07142a;font-weight:900;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
    .ai-category-table tr:last-child td,.ai-vendor-table tr:last-child td{border-bottom:0}.ai-category-table a,.ai-vendor-table a{color:#2664a9;font-weight:900;text-decoration:none}.ai-category-name{color:#07142a!important;font-size:16px}.ai-category-link-preview{display:grid;grid-template-columns:82px minmax(0,1fr);gap:12px;align-items:center;color:#07142a!important}.ai-category-link-preview img{width:82px;height:58px;object-fit:cover;border-radius:12px;border:1px solid rgba(38,100,169,.14);box-shadow:0 8px 22px rgba(18,33,58,.08)}.ai-category-link-preview strong{display:block;color:#07142a;font-size:16px;line-height:1.2}.ai-category-link-preview span{display:block;margin-top:4px;color:#6b7688;font-size:12px;line-height:1.35;font-weight:700}.ai-pill-row{display:flex;flex-wrap:wrap;gap:6px}.ai-pill-row span{border:1px solid rgba(38,100,169,.14);border-radius:999px;background:#f8fbff;color:#2664a9;padding:4px 8px;font-size:11px;font-weight:800;white-space:nowrap}.ai-website-link{display:inline-flex;align-items:center;border-radius:999px;background:#eef6ff;border:1px solid rgba(38,100,169,.16);padding:7px 10px;font-size:12px;line-height:1}.ai-promo-note{display:block;margin-top:8px;color:#7b8798;font-size:11px;line-height:1.35;font-weight:700}.ai-promo-note strong{color:#536178;font-weight:800}.ai-starting-point{color:#07142a;font-weight:800}.ai-muted-note{display:block;margin-top:5px;color:#7b8798;font-size:12px;line-height:1.35}
    .ai-faq-section{padding:18px 0 56px}.ai-faq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.ai-faq-item{border:1px solid rgba(38,100,169,.12);border-radius:18px;background:#fff;padding:18px 18px 20px;box-shadow:0 14px 36px rgba(18,33,58,.05)}.ai-faq-item h3{margin:0 0 8px;color:#07142a;font-size:18px;line-height:1.25}.ai-faq-item p{margin:0;color:#536178;font-size:14px;line-height:1.6}
    .ai-disclosure{margin-top:18px;border:1px solid rgba(38,100,169,.12);border-radius:16px;background:#fffdf1;color:#64748b;padding:14px 16px;font-size:13px;line-height:1.55}
    .ai-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.ai-cta-row a{display:inline-flex;border-radius:999px;padding:12px 16px;text-decoration:none;font-weight:900}.ai-cta-row a:first-child{background:#2664d9;color:#fff}.ai-cta-row a:last-child{border:1px solid rgba(38,100,169,.18);color:#2664a9;background:#fff}
    @media(max-width:1020px){.ai-hub-hero .light-container{grid-template-columns:1fr}.ai-hero-visual{max-width:760px}}
    @media(max-width:860px){.ai-section-head{display:block}.ai-hub-hero{padding-top:38px}.ai-faq-grid{grid-template-columns:1fr}.ai-hero-visual,.ai-hero-visual img{min-height:230px}}
  </style>`;
}

function landingPage() {
  const faqs = landingFaqs();
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "AI Vendors for Web3 Teams",
        url: `${siteUrl}/ai-vendors`,
        description: "Compare AI vendors for Web3 teams across video, social media, voiceovers, marketing, sales, CRM, research, support, design, automation and compliance.",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: categories.length,
          itemListElement: categories.map((category, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: category.title,
            url: categoryUrl(category.slug)
          }))
        }
      },
      faqSchema(faqs)
    ]
  };
  const rows = categories.map((category) => `<tr><td><a class="ai-category-link-preview" href="/vendors/${category.slug}"><img src="${esc(categoryImage(category))}" alt="${esc(category.shortTitle)} preview"><span><strong>${esc(category.shortTitle)}</strong>${esc(category.title)}</span></a></td><td>${esc(category.intent)}</td><td>${esc(category.buyerFit)}</td><td>${category.vendors.length}</td><td><a href="/vendors/${category.slug}">Open category</a></td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AI Vendors for Web3 Teams | FluidRWA</title><meta name="description" content="Compare AI vendors for Web3 teams across social media, video, voiceovers, marketing, sales, CRM, research, support, design, automation and compliance."><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><link rel="canonical" href="${siteUrl}/ai-vendors"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="stylesheet" href="/assets/styles-yellow-blue.css?v=ai-vendors-1"><meta property="og:title" content="AI Vendors for Web3 Teams | FluidRWA"><meta property="og:description" content="A practical table directory of AI tools for Web3 teams across content, growth, sales, research, support and operations."><meta property="og:url" content="${siteUrl}/ai-vendors"><meta property="og:image" content="${siteUrl}/assets/social/vendor-ecosystem.png"><script type="application/ld+json">${JSON.stringify(structured)}</script>${styles()}</head><body class="home-page light-home solutions-page">${header()}<main><section class="ai-hub-hero"><div class="light-container"><div class="ai-hub-copy"><p class="eyebrow light-eyebrow">AI vendors for Web3 teams</p><h1>Find AI tools that help Web3 teams ship, sell and grow faster</h1><p>FluidRWA now separates core Web3 infrastructure from AI vendors used by Web3 operators. Browse AI tools for social media, video, voice, marketing, sales, CRM, research, support, design, automation and compliance.</p><div class="ai-cta-row"><a href="#ai-categories">Browse AI categories</a><a href="#faq">Buyer questions</a><a href="/web3vendorecosystem">View Web3 vendors</a></div></div>${heroVisual("AI vendor categories", "/assets/ai-vendor-infrastructure.jpg")}</div></section><section class="ai-table-section" id="ai-categories"><div class="light-container"><div class="ai-section-head"><div><p class="eyebrow light-eyebrow">Category map</p><h2>AI vendor categories</h2></div><p>Start with the workflow, then compare vendors by fit, pricing model, Web3 use case and whether we have an affiliate link available.</p></div><div class="ai-category-table-wrap"><table class="ai-category-table"><thead><tr><th>Category</th><th>What it helps with</th><th>Best for</th><th>Vendors</th><th>Page</th></tr></thead><tbody>${rows}</tbody></table></div><p class="ai-disclosure">Affiliate disclosure: some outbound links may become affiliate links. FluidRWA may earn a commission if you sign up, at no extra cost to you. Listings are organized for discovery and comparison, not paid ranking.</p></div></section>${landingFaqSection(faqs)}</main>${footer()}<script src="/assets/site.js?v=forms-1" defer></script></body></html>`;
}

function categoryPage(category) {
  const canonical = categoryUrl(category.slug);
  const faqs = categoryFaqs(category);
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${canonical}#webpage`, url: canonical, name: category.title, description: category.intent, isPartOf: { "@type": "WebSite", name: "FluidRWA", url: `${siteUrl}/` }, dateModified: "2026-07-17", mainEntity: { "@id": `${canonical}#vendors` } },
      { "@type": "ItemList", "@id": `${canonical}#vendors`, name: category.title, numberOfItems: category.vendors.length, itemListElement: category.vendors.map((v, index) => ({ "@type": "ListItem", position: index + 1, url: `${canonical}#${slugify(v.name)}`, item: { "@type": "Organization", name: v.name, url: v.url, description: v.description, knowsAbout: v.tags } })) },
      faqSchema(faqs)
    ]
  };
  const rows = category.vendors.map((v) => {
    const outboundUrl = v.affiliateUrl || v.url;
    const promoNote = v.affiliateStatus === "affiliate-active" && v.affiliateNote ? `<span class="ai-promo-note">${esc(v.affiliateNote).replace("SHEFALI", "<strong>SHEFALI</strong>")}</span>` : "";
    return `<tr id="${slugify(v.name)}"><td><a class="ai-category-name" href="${esc(outboundUrl)}" target="_blank" rel="noopener noreferrer">${esc(v.name)}</a><br><span>${esc(v.type)}</span></td><td>${esc(v.description)}</td><td>${esc(bestFit(v.web3UseCase))}</td><td>${esc(watchOut(v))}</td><td><span class="ai-starting-point">${esc(v.pricing)}</span><span class="ai-muted-note">${esc(startingPoint(v))}</span></td><td><div class="ai-pill-row">${v.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div></td><td><a class="ai-website-link" href="${esc(outboundUrl)}" target="_blank" rel="noopener noreferrer">Visit website</a>${promoNote}</td></tr>`;
  }).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(category.title)} | FluidRWA</title><meta name="description" content="${esc(category.intent)} ${esc(category.buyerFit)}"><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><link rel="canonical" href="${canonical}"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="stylesheet" href="/assets/styles-yellow-blue.css?v=ai-vendors-1"><meta property="og:title" content="${esc(category.title)} | FluidRWA"><meta property="og:description" content="${esc(category.intent)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${siteUrl}/assets/social/vendor-ecosystem.png"><script type="application/ld+json">${JSON.stringify(structured)}</script>${styles()}</head><body class="home-page light-home solutions-page">${header()}<main><section class="ai-hub-hero"><div class="light-container"><div class="ai-hub-copy"><p class="eyebrow light-eyebrow">AI vendors</p><h1>${esc(category.title)}</h1><p>${esc(category.intent)} ${esc(category.buyerFit)}</p><div class="ai-cta-row"><a href="#vendor-table">Compare vendors</a><a href="#faq">Buyer questions</a><a href="/ai-vendors">All AI categories</a></div></div>${heroVisual(category.shortTitle, categoryImage(category))}</div></section><section class="ai-table-section" id="vendor-table"><div class="light-container"><div class="ai-section-head"><div><p class="eyebrow light-eyebrow">Vendor table</p><h2>Compare ${esc(category.shortTitle.toLowerCase())} vendors</h2></div></div><div class="ai-vendor-table-wrap"><table class="ai-vendor-table"><thead><tr><th>Vendor</th><th>What it does</th><th>Good for</th><th>Not ideal for</th><th>Starting point</th><th>Tags</th><th>Website</th></tr></thead><tbody>${rows}</tbody></table></div><p class="ai-disclosure">Affiliate disclosure: some outbound links may become affiliate links. FluidRWA may earn a commission if you sign up, at no extra cost to you. Pricing notes are directional and should be verified on vendor websites before purchase. Listings are organized for discovery and comparison, not paid ranking.</p></div></section>${faqSection(category, faqs)}</main>${footer()}<script src="/assets/site.js?v=forms-1" defer></script></body></html>`;
}

fs.mkdirSync(path.join(root, "ai-vendors"), { recursive: true });
fs.writeFileSync(path.join(root, "ai-vendors", "index.html"), landingPage());

for (const category of categories) {
  const dir = path.join(root, "vendors", category.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), categoryPage(category));
}

console.log(`Generated AI vendor hub and ${categories.length} AI vendor category pages.`);
