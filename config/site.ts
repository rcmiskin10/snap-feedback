import { Camera, Zap, Monitor, LayoutDashboard, DollarSign, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  socialProof?: { text: string; rating: string }
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  company: string
  mainNav: NavItem[]
  dashboardNav: NavItem[]
  hero: HeroContent
  features: Feature[]
  techStack: Array<{ name: string; color: string }>
  footerSections: FooterSection[]
  footerCopyright: string
  social: {
    twitter?: string
    github?: string
    discord?: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'SnapFeedback',
  tagline: 'Visual bug reports and feature requests in one lightweight widget',
  description: 'Collect visual bug reports and feature requests from your website visitors with a single embeddable widget.',
  url: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000',
  company: 'SnapFeedback',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Docs', href: '/docs' },
    { title: 'Blog', href: '/blog' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Feedback', href: '/dashboard/entities' },
    { title: 'Projects', href: '/dashboard/projects' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Now in Public Beta',
    headline: 'Collect Bug Reports & Feature Requests',
    headlineHighlight: 'With One Simple Widget',
    subheadline: 'Add a floating feedback widget to your website in under 5 minutes. Your users can screenshot, annotate, and submit reports with one click — no per-seat fees, no complexity, just feedback that actually helps you ship better software.',
    primaryCta: { text: 'Get Started Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 500+ indie founders and small teams', rating: '4.9/5' },
  },

  features: [
    {
      icon: Camera,
      title: 'Screenshot & Annotate',
      description: 'Users capture screenshots directly in the browser and annotate with arrows, rectangles, and text — no extensions required.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Zap,
      title: '5-Minute Setup',
      description: 'Paste a single script tag into your site. Zero configuration needed — the widget works out of the box with sensible defaults.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Monitor,
      title: 'Auto-Captured Metadata',
      description: 'Every submission automatically includes browser, OS, screen resolution, page URL, and console errors — no more back-and-forth.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: LayoutDashboard,
      title: 'Priority Dashboard',
      description: 'View all submissions in one place with status tracking, priority sorting, and filtering by type — bugs, feature requests, or general feedback.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: DollarSign,
      title: 'Flat, Predictable Pricing',
      description: 'Pay per project, not per seat or pageview. Add your whole team without worrying about surprise charges as you grow.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Privacy-First by Default',
      description: 'No session recordings, no tracking cookies. GDPR-compliant out of the box so you can collect feedback without compromising user privacy.',
      gradient: 'from-indigo-500 to-violet-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
    { name: 'TypeScript', color: 'bg-blue-600 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Docs', href: '/docs' },
        { title: 'Changelog', href: '/changelog' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'GDPR', href: '/gdpr' }
      ],
    }
  ],

  footerCopyright: '2026 SnapFeedback. All rights reserved.',

  social: {
    discord: 'https://discord.gg/snapfeedback',
    github: 'https://github.com/snapfeedback',
    twitter: 'https://twitter.com/snapfeedback'
  },
}
