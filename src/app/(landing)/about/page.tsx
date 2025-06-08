import { FAQSection } from "@/components/sections/faq-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

export default function AboutPage(): JSX.Element {
  return (
    <div className="mt-12 grid w-full grid-cols-1 items-center justify-center gap-16 md:gap-32">
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  )
}
