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
  name: "Affiliate Hub",
  description:
    "A curated marketplace of top-rated digital tools and software. Discover, compare, and grab exclusive deals—every listing uses vetted affiliate links so you can support our content at no extra cost.",
  links,
  url: "https://github.com/drewsepeczi/saasy-land-project",
  ogImage: links.openGraphImage,
  author: "drew.dev",
  hostingRegion: "fra1",
  keywords: ["Affiliate Marketing", "Digital Products", "Deals", "Software"],
  navItems: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Categories",
      href: "/categories",
    },
    {
      title: "Deals",
      href: "/deals",
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
