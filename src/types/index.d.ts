import type { Account, Profile, Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface NavItemFooter {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export interface SessionCallbackParams {
  session: Session
  token: JWT
  user: User
}

export interface JWTCallbackParams {
  token: JWT
  user?: User | undefined
  account?: Account | null | undefined
  profile?: Profile | undefined
  isNewUser?: boolean | undefined
}

export interface BlogPostParamsProps {
  params: {
    slug: string[]
  }
}

export interface PricingPlan {
  /** Unique product identifier (slug-style). */
  id: string
  name: string
  description: string
  features: string[]
  limitations: string[]
  /** Partner (affiliate) URL with tracking parameters. */
  affiliateLink?: string
  /** Public commission disclosure, e.g. “30 % recurring”. */
  commission?: string
  /** Optional reference pricing (used for comparisons). */
  prices?: {
    monthly: number
    yearly: number
  }
  /** Stripe price identifiers – optional for affiliate products. */
  stripeIds?: {
    monthly?: string
    yearly?: string
  }
}

export interface UserSubscriptionPlan extends SubscriptionPlan {
  stripeSubscriptionId?: string | null
  stripeCurrentPeriodEnd?: string | null
  stripeCustomerId?: string | null
  isSubscribed: boolean
  isCanceled: boolean
  isActive: boolean
}

export interface FrequentlyAskedQuestion {
  question: string
  answer: string
}

export interface Feature {
  title: string
  description: string
  image: string
}

export interface Testimonial {
  title: string
  body: string
  name: string
  role: string
  avatar: string
}
