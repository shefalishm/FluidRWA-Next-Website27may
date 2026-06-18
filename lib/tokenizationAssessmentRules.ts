export type ChoiceValue = "yes" | "partial" | "no";

export type BudgetValue = "over100" | "50to100" | "25to50" | "10to25" | "below10";

export type PillarId = "legal" | "asset" | "investor" | "execution";

export type AssessmentAnswers = Record<string, string>;

export type LeadDetails = {
  name: string;
  company: string;
  email: string;
  role: string;
  country: string;
  consent: boolean;
};

export type AssessmentInput = {
  answers: AssessmentAnswers;
  lead: LeadDetails;
};

export type QuestionRule = {
  id: string;
  pillar: PillarId;
  label: string;
  helper?: string;
  options: Array<{ label: string; value: string; points: number }>;
  gapWhen?: string[];
};

export type PillarRule = {
  id: PillarId;
  title: string;
  maxPoints: number;
  description: string;
  questions: QuestionRule[];
};

export const readinessPillars: PillarRule[] = [
  {
    id: "legal",
    title: "Legal & Regulatory Readiness",
    maxPoints: 25,
    description: "Tests whether the project has the legal foundation to structure and offer a tokenized asset.",
    questions: [
      { id: "ownershipDocumented", pillar: "legal", label: "Asset ownership is clearly documented", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "legalEntity", pillar: "legal", label: "Legal entity exists", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "No", value: "no", points: 0 }], gapWhen: ["no"] },
      { id: "jurisdictionSelected", pillar: "legal", label: "Jurisdiction selected", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "No", value: "no", points: 0 }], gapWhen: ["no"] },
      { id: "investorEligibility", pillar: "legal", label: "Investor eligibility requirements identified", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "No", value: "no", points: 0 }], gapWhen: ["no"] },
      { id: "complianceRequirements", pillar: "legal", label: "Compliance requirements understood", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "No", value: "no", points: 0 }], gapWhen: ["no"] }
    ]
  },
  {
    id: "asset",
    title: "Asset & Operational Readiness",
    maxPoints: 25,
    description: "Reviews asset data, financial records, reporting and performance history.",
    questions: [
      { id: "assetValuation", pillar: "asset", label: "Asset valuation available", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "financialRecords", pillar: "asset", label: "Financial records available", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "cashFlowInfo", pillar: "asset", label: "Cash flow information available", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "reportingProcess", pillar: "asset", label: "Reporting process exists", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "performanceHistory", pillar: "asset", label: "Asset performance history available", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] }
    ]
  },
  {
    id: "investor",
    title: "Investor & Distribution Readiness",
    maxPoints: 25,
    description: "Assesses whether the investor audience and go-to-market path are clear enough to support launch.",
    questions: [
      { id: "targetInvestor", pillar: "investor", label: "Target investor profile identified", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "No", value: "no", points: 0 }], gapWhen: ["no"] },
      { id: "onboardingProcess", pillar: "investor", label: "Investor onboarding process exists", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "capitalStrategy", pillar: "investor", label: "Capital raising strategy defined", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "liquidityExpectations", pillar: "investor", label: "Secondary liquidity expectations defined", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "distributionChannels", pillar: "investor", label: "Distribution channels identified", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] }
    ]
  },
  {
    id: "execution",
    title: "Budget & Execution Readiness",
    maxPoints: 25,
    description: "Checks whether there is enough internal ownership, budget and implementation clarity.",
    questions: [
      { id: "projectBudget", pillar: "execution", label: "Project budget available", options: [{ label: "Over $100k", value: "over100", points: 5 }, { label: "$50k-$100k", value: "50to100", points: 4 }, { label: "$25k-$50k", value: "25to50", points: 3 }, { label: "$10k-$25k", value: "10to25", points: 2 }, { label: "Below $10k", value: "below10", points: 1 }], gapWhen: ["10to25", "below10"] },
      { id: "internalTeam", pillar: "execution", label: "Internal team available", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "timelineDefined", pillar: "execution", label: "Project timeline defined", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "technologyStrategy", pillar: "execution", label: "Technology strategy defined", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] },
      { id: "serviceBudget", pillar: "execution", label: "Service provider budget allocated", options: [{ label: "Yes", value: "yes", points: 5 }, { label: "Partial", value: "partial", points: 2 }, { label: "No", value: "no", points: 0 }], gapWhen: ["partial", "no"] }
    ]
  }
];

export const complexityInputs = {
  assetType: [
    ["real-estate", "Real estate", 1],
    ["fund", "Fund or private market product", 2],
    ["company-equity", "Company equity or private shares", 2],
    ["debt-credit", "Debt, credit or receivables", 2],
    ["commodity", "Commodity or carbon credit", 2],
    ["digital-security", "Digital security or regulated investment product", 3],
    ["other", "Other asset type", 2]
  ],
  jurisdiction: [
    ["single-clear", "Single clear jurisdiction", 0],
    ["single-regulated", "Single highly regulated jurisdiction", 1],
    ["multi-jurisdiction", "Multiple jurisdictions", 2],
    ["not-sure", "Not sure yet", 2]
  ],
  investorCount: [
    ["under25", "Under 25 investors", 0],
    ["25to100", "25-100 investors", 1],
    ["101to500", "101-500 investors", 2],
    ["500plus", "500+ investors", 3]
  ],
  investorType: [
    ["accredited", "Accredited / qualified investors only", 1],
    ["mixed", "Mixed accredited and non-accredited", 2],
    ["retail", "Retail investors", 3]
  ],
  secondaryTrading: [
    ["no", "No secondary trading required", 0],
    ["later", "Possibly later", 1],
    ["yes", "Yes, secondary trading is required", 2]
  ],
  crossBorder: [
    ["no", "No cross-border investors", 0],
    ["maybe", "Possibly", 1],
    ["yes", "Yes, cross-border investors expected", 2]
  ]
} as const;

export const budgetAssumptions = [
  { category: "Legal", low: 15000, high: 40000, rule: "Base legal structuring and offering review range" },
  { category: "Compliance", low: 5000, high: 25000, rule: "KYC/AML, investor eligibility, policy and compliance workflow review" },
  { category: "Tokenization Platform", low: 10000, high: 50000, rule: "Platform setup, issuance workflow, asset lifecycle and investor portal support" },
  { category: "Smart Contract Development", low: 8000, high: 35000, rule: "Contract customization, token logic, integrations and deployment support" },
  { category: "Security Audit", low: 5000, high: 20000, rule: "Security review based on smart contract and integration complexity" },
  { category: "Custody", low: 5000, high: 25000, rule: "Wallet, key management or institutional custody setup" },
  { category: "KYC/AML", low: 3000, high: 15000, rule: "Identity verification and investor screening workflow" },
  { category: "Distribution", low: 5000, high: 30000, rule: "Investor acquisition, marketplace, broker, channel or placement support" },
  { category: "Reporting", low: 3000, high: 15000, rule: "Investor reporting, asset performance reporting and data workflows" }
];

export const recommendationRules = [
  { category: "Legal & Regulatory", triggers: ["ownershipDocumented", "legalEntity", "jurisdictionSelected", "investorEligibility", "complianceRequirements"], values: ["partial", "no", "10to25", "below10"], reason: "Legal or regulatory foundations need more definition before issuance." },
  { category: "Tokenization Platforms", triggers: ["technologyStrategy"], values: ["partial", "no"], reason: "The technology strategy is not fully defined." },
  { category: "KYC / AML", triggers: ["investorEligibility", "onboardingProcess"], values: ["partial", "no"], reason: "Investor eligibility or onboarding controls need support." },
  { category: "Custody", triggers: ["technologyStrategy", "serviceBudget"], values: ["partial", "no"], reason: "Custody and wallet operations should be planned before launch." },
  { category: "Smart Contract Development", triggers: ["technologyStrategy"], values: ["partial", "no"], reason: "Custom token logic or integrations may require engineering support." },
  { category: "Security Audits", triggers: ["technologyStrategy", "secondaryTrading"], values: ["yes", "later"], reason: "Security review is recommended when token logic, integrations or secondary trading are expected." },
  { category: "Payments & Stablecoins", triggers: ["distributionChannels", "onboardingProcess"], values: ["partial", "no"], reason: "Investor funding and settlement flows need clearer vendor support." },
  { category: "Compliance Infrastructure", triggers: ["complianceRequirements", "investorEligibility"], values: ["no"], reason: "Compliance monitoring and policy enforcement should be mapped." },
  { category: "Growth & Marketing", triggers: ["capitalStrategy", "distributionChannels"], values: ["partial", "no"], reason: "Capital raising and distribution channels are not fully defined." },
  { category: "AI Infrastructure", triggers: ["reportingProcess"], values: ["partial", "no"], reason: "AI-enabled analytics or reporting can support ongoing investor and asset intelligence." },
  { category: "Blockchain Development", triggers: ["technologyStrategy"], values: ["partial", "no"], reason: "Blockchain integration planning needs technical support." }
];

const money = (amount: number) => `$${Math.round(amount / 1000)}k`;

export function classifyReadiness(score: number) {
  if (score <= 40) return { label: "Not Ready", description: "High preparation required before tokenization." };
  if (score <= 60) return { label: "Early Stage", description: "Several foundational gaps must be addressed." };
  if (score <= 80) return { label: "Moderately Ready", description: "Project appears viable but requires improvements." };
  return { label: "Ready for Tokenization", description: "Strong readiness across most categories." };
}

export function assessTokenization(input: AssessmentInput) {
  const answerLookup = new Map(readinessPillars.flatMap((pillar) => pillar.questions.map((question) => [question.id, question])));
  const pillarScores = readinessPillars.map((pillar) => {
    const items = pillar.questions.map((question) => {
      const value = input.answers[question.id] || question.options[question.options.length - 1]?.value || "no";
      const option = question.options.find((item) => item.value === value) || question.options[question.options.length - 1];
      return { questionId: question.id, label: question.label, answer: option.label, points: option.points, max: 5 };
    });
    return { id: pillar.id, title: pillar.title, max: pillar.maxPoints, score: items.reduce((sum, item) => sum + item.points, 0), items };
  });

  const score = pillarScores.reduce((sum, pillar) => sum + pillar.score, 0);
  const classification = classifyReadiness(score);

  const complexityBreakdown = [
    ["Asset type", input.answers.assetType, complexityInputs.assetType],
    ["Jurisdiction", input.answers.complexityJurisdiction, complexityInputs.jurisdiction],
    ["Investor count", input.answers.investorCount, complexityInputs.investorCount],
    ["Investor type", input.answers.investorType, complexityInputs.investorType],
    ["Secondary trading", input.answers.secondaryTrading, complexityInputs.secondaryTrading],
    ["Cross-border investors", input.answers.crossBorder, complexityInputs.crossBorder]
  ].map(([label, value, rules]) => {
    const match = (rules as readonly (readonly [string, string, number])[]).find((rule) => rule[0] === value) || (rules as readonly (readonly [string, string, number])[])[0];
    return { label: label as string, answer: match[1], points: match[2] };
  });
  const complexityPoints = complexityBreakdown.reduce((sum, item) => sum + item.points, 0);
  const complexityRating = complexityPoints <= 3 ? "Low" : complexityPoints <= 6 ? "Medium" : complexityPoints <= 9 ? "High" : "Very High";
  const multiplier = complexityRating === "Low" ? 0.85 : complexityRating === "Medium" ? 1 : complexityRating === "High" ? 1.25 : 1.55;

  const budget = budgetAssumptions.map((item) => ({
    ...item,
    low: Math.round(item.low * multiplier),
    high: Math.round(item.high * multiplier),
    range: `${money(item.low * multiplier)}-${money(item.high * multiplier)}`
  }));
  const budgetLow = budget.reduce((sum, item) => sum + item.low, 0);
  const budgetHigh = budget.reduce((sum, item) => sum + item.high, 0);

  const gaps = readinessPillars.flatMap((pillar) =>
    pillar.questions
      .filter((question) => question.gapWhen?.includes(input.answers[question.id] || ""))
      .map((question) => ({
        pillar: pillar.title,
        question: question.label,
        answer: question.options.find((option) => option.value === input.answers[question.id])?.label || "Not answered"
      }))
  );
  const strengths = pillarScores
    .flatMap((pillar) => pillar.items.map((item) => ({ pillar: pillar.title, ...item })))
    .filter((item) => item.points === 5)
    .slice(0, 5);

  const recommended = recommendationRules
    .filter((rule) => rule.triggers.some((trigger) => rule.values.includes(input.answers[trigger])))
    .map((rule) => ({ category: rule.category, reason: rule.reason }));
  const requiredAlways = [{ category: "Tokenization Platforms", reason: "Every tokenization project needs an issuance, lifecycle or platform layer." }];
  const dedupedRecommendations = [...requiredAlways, ...recommended].filter((item, index, array) => array.findIndex((candidate) => candidate.category === item.category) === index);

  const timelineMonths = complexityRating === "Low" ? "2-4 months" : complexityRating === "Medium" ? "4-6 months" : complexityRating === "High" ? "6-9 months" : "9-12+ months";

  return {
    score,
    classification,
    pillarScores,
    complexityRating,
    complexityPoints,
    complexityBreakdown,
    budget,
    totalBudgetRange: `${money(budgetLow)}-${money(budgetHigh)}`,
    timelineMonths,
    gaps: gaps.slice(0, 8),
    strengths,
    recommendations: dedupedRecommendations,
    answerTrace: Array.from(answerLookup.values()).map((question) => {
      const value = input.answers[question.id];
      const option = question.options.find((item) => item.value === value);
      return { questionId: question.id, question: question.label, answer: option?.label || "Not answered", points: option?.points || 0 };
    })
  };
}
