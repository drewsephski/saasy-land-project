import "@/styles/globals.css"
import "@/styles/mdx.css"

import * as React from "react"
import type { Metadata, Viewport } from "next"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"

import { env } from "@/env.mjs"
import { fontHeading, fontInter, fontUrbanist } from "@/config/fonts"
import { siteConfig } from "@/config/site"

import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider"
import { ThemeProvider } from "@/providers/theme-provider"

import { SplashCursor } from "@/components/ui/splash-cursor"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const dynamic = "force-dynamic"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  metadataBase: env.NEXT_PUBLIC_APP_URL
    ? new URL(env.NEXT_PUBLIC_APP_URL)
    : undefined,
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.links.authorsWebsite,
    },
  ],
  creator: siteConfig.author,
  keywords: siteConfig.keywords,
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.links.openGraphImage],
    creator: siteConfig.author,
  },
  icons: {
    icon: "/favicon.ico",
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" className="overflow-x-hidden overflow-y-scroll">
      <body
        className={cn(
          "w-full bg-background bg-gradient-to-r from-background to-pink-400/10 font-sans antialiased",
          fontInter.variable,
          fontUrbanist.variable,
          fontHeading.variable
        )}
      >
        <SmoothScrollProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Analytics />
            <TailwindIndicator />
            <SplashCursor />
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
