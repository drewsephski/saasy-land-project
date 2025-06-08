import Link from "next/link"
import { cn, getGitHubStars } from "@/lib/utils"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"

import { buttonVariants } from "@/components/ui/button"
import { ButtonCtaDemo } from "@/components/ui/demo"
import { Icons } from "@/components/icons"

export function HeroSection() {
  return (
    <section
      id="hero-section"
      aria-label="hero section"
      className="mt-16 w-full md:mt-12"
    >
      <div className="container flex flex-col items-center gap-6 text-center">
        <ButtonCtaDemo />
        <h1 className="animate-fade-up font-urbanist text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <Balancer>
            Fast-Track Your Business Launch with{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text font-extrabold text-transparent">
              SaaSy Land
            </span>
          </Balancer>
        </h1>

        <h3 className="max-w-2xl animate-fade-up text-muted-foreground sm:text-xl sm:leading-8">
          <Balancer>
            Your shortcut to startup success. The ultimate, modern, open-source
            Next.js template, with everything you need set up and ready to use.
          </Balancer>
        </h3>

        <div className="z-10 flex animate-fade-up flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="https://github.com/drewsephski/saasy-land-project"
            className={cn(
              buttonVariants({ size: "lg" }),
              "transition-all duration-1000 ease-out md:hover:-translate-y-2"
            )}
          >
            Get Started
          </Link>

          <Link
            href="https://github.com/drewsephski/saasy-land-project"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "transition-all duration-1000 ease-out md:hover:-translate-y-2"
            )}
          >
            See on GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
