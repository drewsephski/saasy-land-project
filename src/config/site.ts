import { type NavItem, type NavItemFooter } from "@/types"

const links = {
  github:
    "https://github.com/drewsephski/saasy-land-project",
  twitter: "https://github.com/drewsephski/saasy-land-project",
  linkedin: "https://github.com/drewsephski/saasy-land-project",
  discord: "https://github.com/drewsephski/saasy-land-project",
  authorsWebsite: "https://github.com/drewsephski/saasy-land-project",
  authorsGitHub: "https://github.com/drewsephski/saasy-land-project",
  openGraphImage: "https://github.com/drewsephski/saasy-land-project",
}

export const siteConfig = {
  name: "SaaSy Land",
  description:
    "An open-source starter for Next.js 14 full-stack projects with advanced authentication and several database configurations. The aim of this project is to provide a solid foundation for faster building and launching SaaS products, marketing sites, blogs, and more.",
  links,
  url: "https://github.com/drewsepeczi/saasy-land-project",
  ogImage: links.openGraphImage,
  author: "drew.dev",
  hostingRegion: "fra1",
  keywords: ["SaaS", "Next.js", "Template"],
  navItems: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Features",
      href: "/features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ] satisfies NavItem[],
  navItemsMobile: [],
  navItemsFooter: [
    {
      title: "Company",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
        {
          title: "Terms",
          href: "/tos",
          external: false,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Docs",
          href: "/docs",
          external: false,
        },
        {
          title: "FAQ",
          href: "/faq",
          external: false,
        },
        {
          title: "Blog",
          href: "/blog",
          external: false,
        },
      ],
    },
    {
      title: "Inspiration",
      items: [
        {
          title: "Shadcn",
            href: "https://github.com/drewsephski/saasy-land-project",
          external: true,
        },
        {
          title: "Taxonomy",
          href: "https://github.com/drewsepeczi/saasy-land-project",
          external: true,
        },
        {
          title: "Skateshop",
          href: "https://github.com/drewsepeczi/saasy-land-project",
          external: true,
        },
        {
          title: "Acme Corp",
          href: "https://github.com/drewsepeczi/saasy-land-project",
          external: true,
        },
      ],
    },
  ] satisfies NavItemFooter[],
}
