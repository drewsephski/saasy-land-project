import Image from "next/image"
import Balancer from "react-wrap-balancer"

import { siteConfig } from "@/config/site"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function BenefitsSection(): JSX.Element {
  return (
    <section id="about-section" aria-label="about section" className="w-full">
      <div className="container grid max-w-6xl justify-center gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-urbanist text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              Why{" "}
              <span className="relative bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text font-extrabold text-transparent">
                Affiliate Hub?
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-2xl text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>
              Discover insider-level software savings, explore emerging tools
              before they go mainstream, and support the creators you love —
              all in one transparent marketplace.
            </Balancer>
          </h3>
        </div>

        <div className="grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="space-y-4 md:mt-20 md:space-y-6">
            <Card
              id="1"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Exclusive Savings
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>
                    Save Hundreds <br className="hidden md:inline-block" />
                    on Essential Software
                  </Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                    We negotiate partner-only coupons and extended trials you
                    won't find elsewhere. Keep more cash in your pocket while
                    still getting world-class tools to run and scale your
                    business.
                  </Balancer>
                </p>
                <div>
                  <div className="pr-8">
                    <div className="relative z-10 flex flex-col gap-3 rounded-xl bg-background p-4 text-center shadow-xl">
                      <p className="text-3xl font-bold text-pink-800 dark:text-pink-600">
                        $1.2M
                      </p>
                      <p className="text-xs font-bold tracking-wide text-purple-600 dark:text-purple-300">
                        Community Savings
                      </p>
                      <p className="text-xs text-muted-foreground">
                        23% More Than Last Month
                      </p>
                    </div>
                  </div>
                  <div className="-mt-14 pl-8">
                    <div className="flex flex-col gap-3 rounded-xl bg-background p-4 text-center opacity-30 shadow-xl">
                      <p className="text-3xl font-bold">$942k</p>
                      <p className="text-xs font-bold tracking-wide">
                        Partner Discounts Redeemed
                      </p>
                      <p className="text-xs text-muted-foreground">
                        17% YoY Growth
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              id="2"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Discover Breakthrough Tools
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>Uncover the Next Must-Have App</Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                    Our research team spots rising-star software before it goes
                    mainstream. Browse curated collections and stay ahead of
                    the curve without sifting through endless blog posts.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/3.jpeg"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 md:space-y-6">
            <Card
              id="3"
              className="h-fit bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Radical Transparency
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>Trust Every Review & Rating</Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                    Each product is hands-on tested by our team. We publish
                    honest pros, cons, and the exact commission we receive so
                    you can decide with full confidence.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/2.jpeg"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>

            <Card
              id="4"
              className="h-fit w-full bg-gradient-to-br from-pink-600/10 to-purple-400/10 transition-all duration-1000 ease-out md:hover:-translate-y-3"
            >
              <CardHeader>
                <CardDescription className="py-2 text-base font-medium tracking-wide text-muted-foreground">
                  Support Creators
                </CardDescription>
                <CardTitle className="font-urbanist text-3xl font-black tracking-wide">
                  <Balancer>
                    Give Back Without <br /> Paying More
                  </Balancer>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-0">
                <p className="px-4 text-base leading-8 tracking-wide text-muted-foreground">
                  <Balancer>
                    Purchases made through Affiliate Hub links fund more
                    in-depth reviews and tutorials—at zero extra cost to you.
                    Help independent creators keep producing great content and
                    tools for the community.
                  </Balancer>
                </p>
                <Image
                  width={600}
                  height={400}
                  alt="illustration"
                  src="/images/benefits/1.jpeg"
                  className="overflow-hidden rounded-b-xl"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
