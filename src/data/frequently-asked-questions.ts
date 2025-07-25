import { type FrequentlyAskedQuestion } from "@/types"

import { siteConfig } from "@/config/site"

export const frequentlyAskedQuestions: FrequentlyAskedQuestion[] = [
  {
    question: `What is ${siteConfig.name}?`,
    answer: `${siteConfig.name} is a curated affiliate-marketing marketplace that showcases hand-picked digital products and SaaS tools. Each listing includes transparent commission information, detailed reviews, and an exclusive deal so you can purchase with confidence while supporting our work.`,
  },
  {
    question: "How does Affiliate Hub make money?",
    answer:
      "We earn a commission when you click a partner link and complete a purchase. This comes at no extra cost to you and funds new product reviews, site improvements, and the exclusive discounts we negotiate.",
  },
  {
    question: "Are your reviews unbiased if you earn commissions?",
    answer:
      "Yes. Affiliate partnerships do not influence our ratings or editorial verdicts. We rigorously test every tool, disclose pros & cons, and publish the commission rate so you can judge potential bias yourself.",
  },
  {
    question: "What commission rates can I expect from the promoted tools?",
    answer:
      "Rates vary by vendor—most products featured on Affiliate Hub pay between 25 % and 40 % recurring commission to affiliates. We list the exact percentage in the “Commission” row on every product card.",
  },
  {
    question: "How often do you update deals and coupon codes?",
    answer:
      "We monitor partner portals and tracking links daily. Limited-time coupons are updated in real-time; evergreen deals are reviewed at least once per month.",
  },
  {
    question: "A link isn’t working or the deal has changed—what should I do?",
    answer:
      "First, try disabling ad-blockers—they sometimes break affiliate tracking URLs. If the problem persists, reach out via our contact form and we’ll fix or replace the link within 24 hours.",
  },
  {
    question: "How do you choose which products get listed?",
    answer:
      "We evaluate tools on feature-set, user reviews, support quality, commission competitiveness, and longevity. Only products scoring 85 / 100 or higher in our internal rubric are published.",
  },
]
