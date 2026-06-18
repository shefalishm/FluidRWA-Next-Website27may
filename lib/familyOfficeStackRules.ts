export type FamilyOfficeAnswers = Record<string, string>;

export type FamilyOfficeLead = {
  name: string;
  familyOffice: string;
  email: string;
  role: string;
  country: string;
  consent: boolean;
};

export type FamilyOfficeInput = {
  answers: FamilyOfficeAnswers;
  lead: FamilyOfficeLead;
};

export type FamilyOfficeQuestion = {
  id: string;
  pillar: "governance" | "coverage" | "risk" | "continuity";
  label: string;
  helper: string;
  options: Array<{ label: string; value: string; points: number }>;
  gapWhen: string[];
  providersWhenGap: string[];
};

export const familyOfficeProfileQuestions = [
  {
    id: "officeType",
    label: "What type of family office are you closest to?",
    helper: "This helps shape the service stack around decision-making, privacy, reporting and advisory needs.",
    options: [
      { label: "Single-family office", value: "single" },
      { label: "Multi-family office", value: "multi" },
      { label: "Founder or entrepreneur office", value: "founder" },
      { label: "Embedded family office inside a business", value: "embedded" },
      { label: "Not formally structured yet", value: "informal" }
    ]
  },
  {
    id: "complexity",
    label: "How complex is the family structure?",
    helper: "Complexity increases when there are multiple generations, entities, countries, operating businesses or asset classes.",
    options: [
      { label: "Simple, one jurisdiction", value: "simple" },
      { label: "Moderate, several entities or advisors", value: "moderate" },
      { label: "Complex, multiple jurisdictions or generations", value: "complex" },
      { label: "Very complex, global assets and operating businesses", value: "very-complex" }
    ]
  }
];

export const familyOfficeQuestions: FamilyOfficeQuestion[] = [
  {
    id: "decisionFramework",
    pillar: "governance",
    label: "Do you have a clear decision-making framework for selecting advisors and vendors?",
    helper: "This means the family knows who approves advisors, how providers are compared and when vendors are reviewed.",
    options: [{ label: "Yes", value: "yes", points: 7 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Governance Advisors", "Family Office Consultants"]
  },
  {
    id: "investmentPolicy",
    pillar: "governance",
    label: "Is there an updated investment policy or mandate?",
    helper: "An investment policy gives advisors and managers a shared view of risk, liquidity, return objectives and restrictions.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Needs update", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Investment Consultants", "Wealth Managers"]
  },
  {
    id: "advisorReview",
    pillar: "governance",
    label: "Are your core advisors reviewed at least annually?",
    helper: "Regular review reduces fee drift, stale mandates and hidden provider overlap.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Informally", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Family Office Consultants", "Performance Reporting Providers"]
  },
  {
    id: "familyRoles",
    pillar: "governance",
    label: "Are family roles and next-generation responsibilities documented?",
    helper: "Role clarity matters when multiple generations, heirs or family branches are involved.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Succession Advisors", "Family Governance Advisors"]
  },
  {
    id: "taxLegalCoverage",
    pillar: "coverage",
    label: "Do you have coordinated tax, legal and estate planning coverage?",
    helper: "Coordination matters because tax, estate, entity structuring and investment decisions often affect each other.",
    options: [{ label: "Yes", value: "yes", points: 7 }, { label: "Some gaps", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Tax Advisors", "Estate Planning Counsel", "Legal Advisors"]
  },
  {
    id: "investmentOps",
    pillar: "coverage",
    label: "Are investment operations, reporting and administration covered by the right providers?",
    helper: "This includes data aggregation, capital calls, manager reporting, document workflows and consolidated views.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Reporting Platforms", "Fund Administrators", "Investment Operations Providers"]
  },
  {
    id: "specialistAdvisors",
    pillar: "coverage",
    label: "Do you have specialist advisors for alternatives, private markets or direct deals?",
    helper: "Many families have general advisors but lack specialized coverage for private equity, real estate, venture, credit or operating-company exposure.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Some areas only", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Alternative Investment Advisors", "Due Diligence Providers", "Venture Capital Advisors"]
  },
  {
    id: "philanthropyLifestyle",
    pillar: "coverage",
    label: "Are philanthropy, insurance and lifestyle services properly covered where needed?",
    helper: "These areas are often under-managed until there is a liquidity event, claim, family transition or public exposure.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Partially", value: "partial", points: 3 }, { label: "Not needed or not covered", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Philanthropy Advisors", "Insurance Advisors", "Lifestyle Management Providers"]
  },
  {
    id: "cybersecurity",
    pillar: "risk",
    label: "Has the family office reviewed cybersecurity and privacy risk in the last 12 months?",
    helper: "Family offices are high-value targets. Cybersecurity includes devices, email, banking workflows, staff access, travel and family privacy.",
    options: [{ label: "Yes", value: "yes", points: 7 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Cybersecurity Providers", "Privacy Advisors", "Fraud Prevention Specialists"]
  },
  {
    id: "vendorConcentration",
    pillar: "risk",
    label: "Do you know where you are over-reliant on one advisor, bank or platform?",
    helper: "Vendor concentration can create operational, confidentiality, fee and continuity risk.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Somewhat", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Risk Advisors", "Family Office Consultants"]
  },
  {
    id: "fraudControls",
    pillar: "risk",
    label: "Are payment approvals, bank access and fraud controls formally documented?",
    helper: "This reduces risk around wire fraud, impersonation, vendor changes, staff turnover and family-office payment workflows.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Fraud Prevention Specialists", "Accounting Firms", "Banking Partners"]
  },
  {
    id: "insuranceReview",
    pillar: "risk",
    label: "Are insurance policies reviewed against current assets and family exposure?",
    helper: "Coverage can lag behind asset growth, new homes, aircraft, art, operating businesses, travel patterns or cyber exposure.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Needs update", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Insurance Advisors", "Risk Advisors"]
  },
  {
    id: "consolidatedReporting",
    pillar: "continuity",
    label: "Can the family see consolidated assets, liabilities and performance in one reliable view?",
    helper: "A consolidated view helps families understand exposure, liquidity, fees, performance and concentration across providers.",
    options: [{ label: "Yes", value: "yes", points: 7 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Reporting Platforms", "Data Aggregation Providers", "Accounting Firms"]
  },
  {
    id: "documentVault",
    pillar: "continuity",
    label: "Are important documents organized in a secure, accessible system?",
    helper: "This includes entity documents, wills, trusts, insurance, investment records, property records and advisor contacts.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Document Management Providers", "Family Office Technology Platforms"]
  },
  {
    id: "successionPlan",
    pillar: "continuity",
    label: "Is there a practical succession and continuity plan for the office?",
    helper: "This covers leadership continuity, advisor continuity, emergency access and next-generation decision rights.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Succession Advisors", "Estate Planning Counsel", "Family Governance Advisors"]
  },
  {
    id: "staffProcesses",
    pillar: "continuity",
    label: "Are staff roles, approval workflows and advisor handoffs documented?",
    helper: "Documented workflows reduce key-person risk when staff, advisors or family decision-makers change.",
    options: [{ label: "Yes", value: "yes", points: 6 }, { label: "Partially", value: "partial", points: 3 }, { label: "No", value: "no", points: 0 }],
    gapWhen: ["partial", "no"],
    providersWhenGap: ["Family Office Consultants", "Operations Advisors"]
  }
];

export const familyOfficePillars = [
  { id: "governance", title: "Governance & Decision Clarity", max: 25 },
  { id: "coverage", title: "Advisor & Provider Coverage", max: 25 },
  { id: "risk", title: "Risk, Privacy & Resilience", max: 25 },
  { id: "continuity", title: "Reporting & Continuity", max: 25 }
] as const;

export function classifyFamilyOfficeScore(score: number) {
  if (score <= 40) return { label: "High Provider Gap", description: "The office likely has several advisor, governance or operational gaps that should be mapped before adding more complexity." };
  if (score <= 60) return { label: "Developing Stack", description: "The family office has some important coverage, but several provider areas may need review or modernization." };
  if (score <= 80) return { label: "Structured but Review Needed", description: "The service stack appears functional, with targeted areas that may benefit from specialist review." };
  return { label: "Well-Structured Office", description: "The office appears to have strong coverage across governance, advisors, risk and continuity." };
}

export function assessFamilyOfficeStack(input: FamilyOfficeInput) {
  const pillarScores = familyOfficePillars.map((pillar) => {
    const questions = familyOfficeQuestions.filter((question) => question.pillar === pillar.id);
    const items = questions.map((question) => {
      const answerValue = input.answers[question.id] || "no";
      const option = question.options.find((item) => item.value === answerValue) || question.options[question.options.length - 1];
      return {
        questionId: question.id,
        label: question.label,
        answer: option.label,
        points: option.points
      };
    });
    return {
      id: pillar.id,
      title: pillar.title,
      max: pillar.max,
      score: items.reduce((sum, item) => sum + item.points, 0),
      items
    };
  });

  const score = pillarScores.reduce((sum, pillar) => sum + pillar.score, 0);
  const classification = classifyFamilyOfficeScore(score);
  const gaps = familyOfficeQuestions
    .filter((question) => question.gapWhen.includes(input.answers[question.id] || "no"))
    .map((question) => ({
      pillar: familyOfficePillars.find((pillar) => pillar.id === question.pillar)?.title || question.pillar,
      question: question.label,
      answer: question.options.find((option) => option.value === input.answers[question.id])?.label || "No",
      providerTypes: question.providersWhenGap
    }));

  const providerMap = new Map<string, { category: string; reasons: string[] }>();
  gaps.forEach((gap) => {
    gap.providerTypes.forEach((category) => {
      const current = providerMap.get(category) || { category, reasons: [] };
      current.reasons.push(gap.question);
      providerMap.set(category, current);
    });
  });

  const providerStack = Array.from(providerMap.values()).slice(0, 12);
  const strengths = pillarScores
    .flatMap((pillar) => pillar.items.map((item) => ({ pillar: pillar.title, ...item })))
    .filter((item) => item.points >= 6)
    .slice(0, 6);

  const riskAlerts = gaps
    .filter((gap) => gap.pillar.includes("Risk") || gap.question.toLowerCase().includes("succession") || gap.question.toLowerCase().includes("reporting"))
    .slice(0, 5);

  const nextSteps = [
    providerStack.length ? "Prioritize the missing advisor and provider categories with the highest operational risk." : "Maintain annual provider reviews and benchmark key advisors.",
    gaps.some((gap) => gap.question.includes("cybersecurity")) ? "Run a cybersecurity and privacy review for family members, staff and payment workflows." : "Keep cyber and privacy controls on an annual review cycle.",
    gaps.some((gap) => gap.question.includes("consolidated")) ? "Create a consolidated reporting plan across banks, managers, private assets and liabilities." : "Continue monitoring reporting quality and data consistency.",
    gaps.some((gap) => gap.question.includes("succession")) ? "Document succession, emergency access and decision rights before a transition event." : "Stress-test continuity planning with advisors."
  ];

  return {
    score,
    classification,
    pillarScores,
    gaps: gaps.slice(0, 10),
    strengths,
    providerStack,
    riskAlerts,
    nextSteps,
    profile: {
      officeType: familyOfficeProfileQuestions[0].options.find((option) => option.value === input.answers.officeType)?.label || "Not provided",
      complexity: familyOfficeProfileQuestions[1].options.find((option) => option.value === input.answers.complexity)?.label || "Not provided"
    }
  };
}
