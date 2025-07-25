import { type PricingPlan } from "@/types"

export const pricingPlans: PricingPlan[] = [
  {
    /* -----------------------  MARKETING / FUNNEL BUILDERS  ----------------------- */
    id: "marketing-clickfunnels",
    name: "ClickFunnels 2.0",
    description:
      "All-in-one funnel-builder loved by 100k+ entrepreneurs. Build landing pages, sales funnels, and follow-up emails without code.",
    features: [
      "Drag-and-drop funnel editor",
      "Pre-built high-converting templates",
      "A/B testing & analytics",
      "30-day free trial available",
    ],
    limitations: [],
    affiliateLink:
      "https://www.clickfunnels.com/affiliate-program?utm_source=AffiliateHub",
    commission: "30–40% recurring + car bonus at 100 active referrals",
    prices: {
      monthly: 147, // base plan price (reference)
      yearly: 1764,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  PRODUCTIVITY / PROJECT MGMT  ----------------------- */
    id: "productivity-clickup",
    name: "ClickUp",
    description:
      "The highest-rated productivity platform. Manage tasks, docs, goals, and whiteboards in a single OS.",
    features: [
      "Tasks, Docs, Whiteboards, Goals",
      "1,000+ integrations",
      "Automations & AI writer",
      "Forever-free plan available",
    ],
    limitations: [],
    affiliateLink:
      "https://clickup.com/partners/affiliates?ref=affiliatehub",
    commission: "25% recurring + up to $25 for free-workspace referrals",
    prices: {
      monthly: 12,
      yearly: 120,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  SECURITY / VPN  ----------------------- */
    id: "security-nordvpn",
    name: "NordVPN",
    description:
      "World-class VPN service for privacy, streaming, and secure browsing.",
    features: [
      "6,000+ servers in 60 countries",
      "Threat Protection & Meshnet",
      "Strict no-logs policy",
      "Works on all devices",
    ],
    limitations: [],
    affiliateLink:
      "https://nordvpn.com/affiliate/affiliatehub",
    commission: "Up to 40% on new sign-ups + renewals",
    prices: {
      monthly: 12,
      yearly: 100,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  EDUCATION / COURSE CREATION  ----------------------- */
    id: "education-teachable",
    name: "Teachable",
    description:
      "Create and sell online courses, coaching, and digital downloads with ease.",
    features: [
      "Drag-and-drop course builder",
      "Built-in payment gateway",
      "Student management & certificates",
      "Mobile-friendly learning experience",
    ],
    limitations: [],
    affiliateLink: "https://teachable.sjv.io/affiliatehub",
    commission: "Up to 30% lifetime recurring",
    prices: {
      monthly: 59,
      yearly: 588,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  AGENCY / ALL-IN-ONE CRM  ----------------------- */
    id: "agency-highlevel",
    name: "HighLevel",
    description:
      "All-in-one sales & marketing platform built for agencies. Funnels, email, SMS, calls, scheduling, and more.",
    features: [
      "Unlimited sub-accounts",
      "2-way SMS & email",
      "Pipeline & CRM",
      "White-label mobile app",
      "AI Conversation bot",
    ],
    limitations: [],
    affiliateLink: "https://www.gohighlevel.com/joinaffiliate?sl=affiliatehub",
    commission: "40% monthly recurring + EV car bonus",
    prices: {
      monthly: 97,
      yearly: 1164,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  CREATIVE / DESIGN SUITE  ----------------------- */
    id: "creative-adobe-cc",
    name: "Adobe Creative Cloud",
    description:
      "Industry-standard suite for photography, video, design, UX, and more—includes Photoshop, Illustrator, Premiere Pro, and 20+ apps.",
    features: [
      "20+ desktop & mobile apps",
      "100 GB cloud storage",
      "Adobe Fonts & Stock credits",
      "Collaboration & review tools",
    ],
    limitations: [],
    affiliateLink:
      "https://clk.tradedoubler.com/click?p=264312&a=3153032&g=23787670",
    commission: "Up to 85% first month + 8.3% recurring annually",
    prices: {
      monthly: 59.99,
      yearly: 719.88,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  E-COMMERCE PLATFORM  ----------------------- */
    id: "commerce-shopify",
    name: "Shopify",
    description:
      "All-in-one commerce platform empowering millions of merchants to start, run, and grow an online store.",
    features: [
      "Drag-and-drop store builder",
      "Built-in payments & checkout",
      "Powerful app ecosystem",
      "Multi-channel selling",
    ],
    limitations: [],
    affiliateLink: "https://www.shopify.com/?ref=affiliatehub",
    commission: "Bounty up to 200% of first-month subscription",
    prices: {
      monthly: 39,
      yearly: 468,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  EMAIL MARKETING  ----------------------- */
    id: "marketing-convertkit",
    name: "ConvertKit",
    description:
      "Creator-centric email marketing platform with automation, landing pages, and paid newsletters.",
    features: [
      "Visual automations",
      "Unlimited landing pages",
      "Subscriber tagging & segments",
      "Commerce for digital products",
    ],
    limitations: [],
    affiliateLink: "https://convertkit.com?lmref=affiliatehub",
    commission: "30% lifetime recurring",
    prices: {
      monthly: 29,
      yearly: 290,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  DESIGN / GRAPHICS  ----------------------- */
    id: "design-canva-pro",
    name: "Canva Pro",
    description:
      "Drag-and-drop design platform with millions of templates, photos, and assets—perfect for non-designers.",
    features: [
      "Brand kits & templates",
      "1 TB cloud storage",
      "Magic resize & background remover",
      "Social scheduler",
    ],
    limitations: [],
    affiliateLink: "https://partner.canva.com/affiliatehub",
    commission: "Up to $36 bounty (≈25% revenue share)",
    prices: {
      monthly: 14.99,
      yearly: 119.99,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  PRODUCTIVITY / KNOWLEDGE BASE  ----------------------- */
    id: "productivity-notion",
    name: "Notion",
    description:
      "All-in-one workspace for notes, docs, tasks, databases, and team collaboration.",
    features: [
      "Pages & databases",
      "Real-time collaboration",
      "AI assistant add-on",
      "Unlimited file uploads (Pro)",
    ],
    limitations: [],
    affiliateLink: "https://notion.so/ref/affiliatehub",
    commission: "50% of first-year payments",
    prices: {
      monthly: 10,
      yearly: 96,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  UI / UX DESIGN TOOL  ----------------------- */
    id: "design-figma",
    name: "Figma",
    description:
      "Collaborative interface-design tool for design systems, prototyping, and developer hand-off.",
    features: [
      "Real-time multiplayer editing",
      "Interactive prototyping",
      "Component libraries",
      "Dev mode hand-off",
    ],
    limitations: [],
    affiliateLink: "https://figma.com/partners?ref=affiliatehub",
    commission: "30% first-year revenue share",
    prices: {
      monthly: 15,
      yearly: 180,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
  {
    /* -----------------------  FINANCE / CHARTING  ----------------------- */
    id: "finance-tradingview",
    name: "TradingView",
    description:
      "Leading charting platform and social network for traders and investors across markets.",
    features: [
      "Powerful web & mobile charts",
      "Pine Script strategy builder",
      "Market screeners & alerts",
      "10M+ community ideas",
    ],
    limitations: [],
    affiliateLink:
      "https://www.tradingview.com/?aff_id=137954&source=affiliatehub",
    commission: "30% lifetime recurring",
    prices: {
      monthly: 29.95,
      yearly: 299,
    },
    stripeIds: {
      monthly: undefined,
      yearly: undefined,
    },
  },
]
