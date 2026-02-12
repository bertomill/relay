import { Metadata } from "next";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AnimateIn } from "../components/AnimateIn";
import { CalendlyWidget } from "../components/CalendlyWidget";
import { HeroBackground } from "../components/HeroBackground";
import { GrainTexture } from "../components/GrainTexture";

export const metadata: Metadata = {
  title: "Our Offer | Lighten AI",
  description: "See how Lighten AI builds custom AI agents that create content in your voice — from audit to launch and beyond.",
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Content Audit",
    description: "We map your entire content workflow — what you're producing, where the bottlenecks are, and where AI agents will have the biggest impact.",
    details: [
      "Audit of your current content channels and output",
      "Brand voice and tone analysis",
      "Bottleneck mapping across your content pipeline",
      "Identify the highest-ROI agent opportunities",
    ],
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    step: "02",
    title: "Custom Agent Build",
    description: "We build AI agents trained on your brand voice, audience, and goals — not generic templates. Blog agents, social agents, video agents, whatever you need.",
    details: [
      "Agents trained on your brand voice and tone",
      "Platform-specific content formatting built in",
      "Review and approval workflows customized to your team",
      "Integration with your existing tools and processes",
    ],
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
  },
  {
    step: "03",
    title: "Launch & Scale",
    description: "Your agents start producing content. We monitor quality, refine outputs, and expand your content system as you grow.",
    details: [
      "Agents go live across your content channels",
      "Ongoing quality monitoring and output refinement",
      "Monthly expansion into new content types",
      "Performance tracking so you always see the ROI",
    ],
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
  },
] as const;

const GAP_EXAMPLES = [
  {
    area: "Inconsistent posting",
    cost: "Weeks go by without publishing. Your audience forgets you exist.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    area: "Hours spent writing",
    cost: "Blog posts that should take an hour take all day — and you still aren't happy with them.",
    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
  },
  {
    area: "One platform at a time",
    cost: "You're active on one channel but invisible everywhere else. Growth stalls.",
    icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
  {
    area: "Generic AI output",
    cost: "You've tried ChatGPT but everything sounds the same. It doesn't sound like you.",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
  },
] as const;

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] relative overflow-x-hidden">
      <Navigation />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <HeroBackground />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32 text-center relative z-10">
          <AnimateIn animation="fade-up">
            <div className="inline-flex items-center gap-2 border border-[#E8E6E1] rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#6B8F71]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#555]">
                How We Work
              </span>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={50}>
            <h1 className="font-sans font-light text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6">
              AI agents that create content{" "}
              <span className="text-[#6B8F71]">in your voice.</span>
            </h1>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={100}>
            <p className="text-lg md:text-xl text-[#555] leading-relaxed mb-10 max-w-2xl mx-auto">
              We build custom AI agents that handle your entire content pipeline — blog posts, social media, video scripts, newsletters — so you can publish more without hiring more.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ─── THE CONTENT GAP (green grain section) ─── */}
      <section className="grain-green bg-[#6B8F71] text-white">
        <GrainTexture density={0.45} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="max-w-3xl mb-16">
              <p className="text-xs font-semibold text-white/70 uppercase tracking-[0.15em] mb-4">THE CONTENT GAP</p>
              <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                Great businesses, invisible online.
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                You know you need to publish more, but content creation eats hours you don&apos;t have. The result? Your competitors own the conversation while you stay quiet.
              </p>
            </div>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-6">
            {GAP_EXAMPLES.map((gap, i) => (
              <AnimateIn key={gap.area} animation="fade-up" delay={i * 100}>
                <div className="border border-white/15 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 hover:bg-white/5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={gap.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{gap.area}</h3>
                      <p className="text-white/60 leading-relaxed">{gap.cost}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn animation="fade-up" delay={400}>
            <div className="mt-12 border border-white/15 rounded-2xl p-8 lg:p-10">
              <p className="text-xl font-sans font-light mb-2">
                The real question isn&apos;t &ldquo;Should we create more content?&rdquo;
              </p>
              <p className="text-white/60 leading-relaxed">
                It&apos;s &ldquo;How do we create 10x more without 10x the effort?&rdquo; That&apos;s exactly what AI agents are built for.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── PROCESS STEPS ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <AnimateIn animation="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">OUR PROCESS</p>
            <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
              Three steps to lighter content.
            </h2>
            <p className="text-[#555] text-lg leading-relaxed">
              No generic templates. No cookie-cutter AI. Custom agents built around your brand, your voice, and your content goals.
            </p>
          </div>
        </AnimateIn>

        <div className="space-y-8">
          {PROCESS_STEPS.map((step, i) => (
            <AnimateIn key={step.step} animation={i % 2 === 0 ? "slide-right" : "slide-left"} delay={i * 100}>
              <div className="bg-white border border-[#E8E6E1] rounded-2xl p-8 lg:p-10 hover:border-[#6B8F71]/40 transition-all duration-300">
                <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#6B8F71] text-white flex items-center justify-center font-sans font-light text-lg">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-sans font-light text-2xl md:text-3xl mb-3">{step.title}</h3>
                    <p className="text-[#555] leading-relaxed">{step.description}</p>
                  </div>
                  <div className="bg-[#FAFAF8] rounded-xl p-6">
                    <p className="text-xs font-semibold text-[#999] uppercase tracking-[0.15em] mb-4">What this includes</p>
                    <ul className="space-y-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#6B8F71] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="text-[#555] text-sm leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ─── ROI FRAMING (green grain section) ─── */}
      <section className="grain-green bg-[#6B8F71] text-white">
        <GrainTexture density={0.3} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-semibold text-white/70 uppercase tracking-[0.15em] mb-4">THE MATH</p>
              <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                10x the content output without hiring a single writer.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                When you add up the hours spent writing, editing, and repurposing — plus the content you never got around to publishing — the case for AI agents makes itself.
              </p>
              <div className="w-16 h-px bg-white/30 mx-auto" />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <AnimateIn animation="fade-up">
            <div>
              <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">IS THIS FOR YOU?</p>
              <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                For brands ready to scale their content.
              </h2>
              <p className="text-[#555] text-lg leading-relaxed">
                We work best with businesses and creators who know content matters but can&apos;t keep up with the demand — and want agents that actually sound like them.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={100}>
            <div className="space-y-4">
              {[
                "You're spending more time creating content than running your business",
                "You know you should post more but can't find the hours",
                "You've tried AI writing tools but the output sounds generic",
                "You want to be on every platform without doing 5x the work",
                "You're ready for a content system, not another one-off tool",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white border border-[#E8E6E1] rounded-xl p-4">
                  <svg className="w-5 h-5 text-[#6B8F71] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-[#555] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── CTA + CALENDLY ─── */}
      <section className="bg-[#F5F4F1]/50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">NEXT STEP</p>
              <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight mb-4">Start with a content audit.</h2>
              <p className="text-lg text-[#555] max-w-xl mx-auto mb-6">
                Book a call and we&apos;ll show you exactly how AI agents can scale your content — and what that looks like for your brand.
              </p>
              <a
                href="/lighten-ai-one-pager.pdf"
                download
                className="inline-flex items-center gap-2 text-sm text-[#6B8F71] hover:text-[#5A7D60] font-medium transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Or download our one-pager (PDF)
              </a>
            </div>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={100}>
            <div className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden max-w-3xl mx-auto">
              <CalendlyWidget />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="grain-green bg-[#6B8F71] text-white">
        <GrainTexture density={0.3} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <AnimateIn animation="fade-up">
            <h2 className="font-sans font-light text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
              Ready to create more<br className="hidden md:block" /> <span className="italic text-white/90">with less effort?</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              Join the brands using AI agents to 10x content output and grow without hiring a full content team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="bg-white text-[#6B8F71] text-sm font-semibold tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-white/90 transition-colors duration-200"
              >
                START A CONVERSATION
              </a>
              <a
                href="/lighten-ai-one-pager.pdf"
                download
                className="border border-white/30 text-white text-sm font-semibold tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:border-white/60 transition-colors duration-200"
              >
                DOWNLOAD ONE-PAGER
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
