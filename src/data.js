export const PROGRAMS = [
  {
    id: "fha",
    name: "FHA Loan",
    badge: "3.5% Down",
    badgeColor: "#D97706",
    badgeBg: "#FFFBEB",
    description:
      "Backed by the Federal Housing Administration. Designed for buyers with lower savings or less-than-perfect credit.",
    eligibility: [
      "Minimum 3.5% down payment (580+ credit score)",
      "10% down if credit score is 500–579",
      "Mortgage insurance premium (MIP) required",
      "Must be primary residence",
    ],
    link: "https://www.hud.gov/fha",
    linkLabel: "Learn more at HUD.gov",
  },
  {
    id: "va",
    name: "VA Loan",
    badge: "0% Down",
    badgeColor: "#1D4ED8",
    badgeBg: "#EFF6FF",
    description:
      "Exclusively for veterans, active-duty service members, and surviving spouses. No down payment and no PMI.",
    eligibility: [
      "No down payment required",
      "No private mortgage insurance (PMI)",
      "Competitive interest rates",
      "Requires qualifying military service history",
    ],
    link: "https://www.va.gov/housing-assistance/home-loans/",
    linkLabel: "Learn more at VA.gov",
  },
  {
    id: "usda",
    name: "USDA Loan",
    badge: "0% Down",
    badgeColor: "#15803D",
    badgeBg: "#F0FDF4",
    description:
      "For buyers purchasing in USDA-eligible rural and suburban areas. Income limits apply based on household size.",
    eligibility: [
      "No down payment required",
      "Property must be in a USDA-eligible area",
      "Household income at or below 115% of area median",
      "Must be primary residence",
    ],
    link: "https://www.rd.usda.gov/programs-services/single-family-housing-programs",
    linkLabel: "Learn more at USDA.gov",
  },
  {
    id: "state",
    name: "State & Local Programs",
    badge: "Down Payment Help",
    badgeColor: "#7C3AED",
    badgeBg: "#F5F3FF",
    description:
      "Most states offer first-time buyer grants, forgivable loans, and down payment assistance — many go unclaimed every year.",
    eligibility: [
      "Eligibility and amounts vary by state and city",
      "Often have income and purchase price limits",
      "May require a homebuyer education course",
      "Some are forgivable loans or outright grants",
    ],
    link: "https://www.hud.gov/states",
    linkLabel: "Find programs in your state →",
  },
];

export const RESOURCES = [
  {
    title: "CFPB: Owning a Home",
    description: "Step-by-step mortgage guide from the Consumer Financial Protection Bureau.",
    type: "Guide",
    link: "https://www.consumerfinance.gov/owning-a-home/",
  },
  {
    title: "HUD: Buying a Home",
    description: "Official HUD resources covering every phase of the homebuying journey.",
    type: "Guide",
    link: "https://www.hud.gov/buying",
  },
  {
    title: "VA Loan Eligibility",
    description: "Check your VA eligibility and apply for a Certificate of Eligibility.",
    type: "Tool",
    link: "https://www.va.gov/housing-assistance/home-loans/eligibility/",
  },
  {
    title: "USDA Property Eligibility Map",
    description: "Enter any address to see if it qualifies for a zero-down USDA loan.",
    type: "Tool",
    link: "https://eligibility.sc.egov.usda.gov/eligibility/welcomeAction.do",
  },
  {
    title: "HUD: Local Homebuying Programs",
    description: "State and local down payment assistance programs searchable by location.",
    type: "Tool",
    link: "https://www.hud.gov/buying/localbuying",
  },
  {
    title: "Keller Williams Buyer Resources",
    description: "Homebuying guides, market insights, and agent tools from KW Realty.",
    type: "Guide",
    link: "https://www.kw.com/",
  },
];
