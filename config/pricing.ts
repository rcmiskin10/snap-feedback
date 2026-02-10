export interface PlanLimit {
  [key: string]: number
}

export interface Plan {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly?: number }
  priceId?: string
  yearlyPriceId?: string
  limits: PlanLimit
  features: string[]
  highlighted?: boolean
  cta: string
}

export const pricingConfig: {
  model: 'freemium' | 'free-trial' | 'paid-only'
  trialDays?: number
  defaultLimits: PlanLimit
  plans: Plan[]
} = {
  model: 'freemium',

  defaultLimits: {
    entities: 50
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for trying SnapFeedback on a side project',
      price: { monthly: 0 },
      limits: {
        entities: 50
      },
      features: [
        '1 project / website',
        '50 feedback submissions per month',
        'Screenshot and basic annotation',
        'Email notifications on new submissions',
        '7-day submission history',
        'SnapFeedback branding on widget'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For indie founders shipping real products',
      price: { monthly: 24, yearly: 228 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1
      },
      features: [
        '3 projects / websites',
        'Unlimited feedback submissions',
        'Advanced annotations (arrows, text, blur)',
        'Priority sorting & status tracking',
        'Slack, Linear, GitHub & Trello integrations',
        'Auto-captured browser metadata & console errors',
        'Remove SnapFeedback branding',
        '90-day submission history',
        'AI duplicate detection'
      ],
      highlighted: true,
      cta: 'Start Pro Plan',
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For growing teams that need collaboration and roadmaps',
      price: { monthly: 59, yearly: 588 },
      priceId: process.env.STRIPE_PRICE_TEAM,
      limits: {
        entities: -1
      },
      features: [
        '10 projects / websites',
        'Everything in Pro',
        'Unlimited team members — no per-seat fees',
        'Public roadmap & feature voting page',
        'AI auto-categorization & trend analysis',
        'Custom domain for feedback portal',
        'Webhooks and API access',
        'Priority email & chat support',
        'Unlimited submission history',
        'Export to CSV / JSON'
      ],
      cta: 'Start Team Plan',
    },
    {
      id: 'agency',
      name: 'Agency',
      description: 'For agencies managing feedback across client sites',
      price: { monthly: 119, yearly: 1188 },
      priceId: process.env.STRIPE_PRICE_AGENCY,
      limits: {
        entities: -1
      },
      features: [
        'Unlimited projects / websites',
        'Everything in Team',
        'White-label widget & portal',
        'Client-specific access & permissions',
        'Custom branding per project',
        'Dedicated onboarding support'
      ],
      cta: 'Start Agency Plan',
    }
  ],
}

const planMap = new Map<string, Plan>()
for (const plan of pricingConfig.plans) {
  planMap.set(plan.id, plan)
}

export function getPlan(tier: string): Plan {
  return planMap.get(tier) || pricingConfig.plans[0]
}

export function getPlanByPriceId(priceId: string): string | null {
  for (const plan of pricingConfig.plans) {
    if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
      return plan.id
    }
  }
  return null
}

export function getLimits(tier: string | null): PlanLimit {
  if (!tier) return pricingConfig.defaultLimits
  const plan = planMap.get(tier)
  return plan?.limits || pricingConfig.defaultLimits
}

export function checkLimit(tier: string | null, limitKey: string, currentUsage: number): boolean {
  const limits = getLimits(tier)
  const limit = limits[limitKey]
  if (limit === undefined) return false
  if (limit === -1) return true
  return currentUsage < limit
}

export function isPaidTier(tier: string | null): boolean {
  if (!tier) return false
  const plan = planMap.get(tier)
  return plan ? plan.price.monthly > 0 : false
}

export function getFreePlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.price.monthly === 0)
}

export function getPaidPlans(): Plan[] {
  return pricingConfig.plans.filter((p) => p.price.monthly > 0)
}

export function getHighlightedPlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.highlighted)
}

export function getPlanPrice(tier: string | null): number {
  if (!tier) return 0
  const plan = planMap.get(tier)
  return plan?.price.monthly || 0
}
