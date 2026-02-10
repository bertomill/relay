import { Metadata } from "next";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AnimateIn } from "../components/AnimateIn";
import { CalendlyWidget } from "../components/CalendlyWidget";

export const metadata: Metadata = {
  title: "Our Offer | Lighten AI",
  description: "See how Lighten AI helps Shopify brands scale with a clear AI strategy — from assessment to advisory.",
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "AI Growth Assessment",
    description: "We dig into your operations — interviews, process mapping, gap analysis — to find where time and money are quietly leaking out.",
    details: [
      "Stakeholder interviews across your team",
      "Process mapping to surface hidden inefficiencies",
      "Gap analysis with real dollar amounts attached",
      "Clear picture of what's costing you the most",
    ],
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    step: "02",
    title: "Custom Roadmap",
    description: "We build a prioritized AI strategy tailored to your business — what to fix first, what to automate, and the ROI you can expect.",
    details: [
      "Prioritized action plan ranked by impact",
      "AI agent recommendations for your workflows",
      "Expected ROI projections for each initiative",
      "Timeline with quick wins and long-term plays",
    ],
    icon: "M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z",
  },
  {
    step: "03",
    title: "Ongoing Advisory",
    description: "We stay in your corner — overseeing execution, tracking ROI, and evolving your AI strategy as your business grows.",
    details: [
      "Monthly strategy sessions with your team",
      "Oversight of AI implementation and vendors",
      "ROI tracking so you always see the return",
      "Roadmap refreshes as new opportunities emerge",
    ],
    icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
  },
] as const;

const GAP_EXAMPLES = [
  {
    area: "Slow follow-ups",
    cost: "Missed deals pile up when leads wait days for a response.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    area: "Manual data entry",
    cost: "Hours of skilled staff time spent on work a machine should handle.",
    icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z",
  },
  {
    area: "Compliance bottlenecks",
    cost: "Documents that should take minutes take hours — and still have errors.",
    icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  },
  {
    area: "Reporting overhead",
    cost: "People pulling reports by hand instead of making decisions with them.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
] as const;

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] relative overflow-x-hidden">
      <Navigation />

      {/* ─── HERO ─── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
        <AnimateIn animation="fade-up">
          <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-6">HOW WE WORK</p>
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={50}>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-8 max-w-4xl">
            Stop losing money to work{" "}
            <span className="italic text-[#6B8F71]">nobody should be doing.</span>
          </h1>
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={100}>
          <p className="text-lg md:text-xl text-[#555] leading-relaxed max-w-2xl">
            Most businesses are bleeding time and profit on repetitive tasks they don&apos;t even realize are costing them. We find the gaps, build the strategy, and stay in your corner to make sure the ROI is real.
          </p>
        </AnimateIn>
      </section>

      {/* ─── DARK SECTION: THE COST OF DOING NOTHING ─── */}
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="max-w-3xl mb-16">
              <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">THE HIDDEN COST</p>
              <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                Every inefficiency has a price tag.
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                When we sit down with clients, we consistently uncover six figures of wasted time, missed revenue, and operational drag hiding in plain sight.
              </p>
            </div>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-6">
            {GAP_EXAMPLES.map((gap, i) => (
              <AnimateIn key={gap.area} animation="fade-up" delay={i * 100}>
                <div className="border border-white/10 rounded-2xl p-8 hover:border-[#6B8F71]/40 transition-all duration-300 hover:bg-white/5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#6B8F71]/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="mt-12 border border-white/10 rounded-2xl p-8 lg:p-10">
              <p className="text-xl font-serif mb-2">
                The real question isn&apos;t &ldquo;Can we afford to invest in AI?&rdquo;
              </p>
              <p className="text-white/60 leading-relaxed">
                It&apos;s &ldquo;Can we afford not to?&rdquo; The gap between where you are and where you could be is costing you every single month.
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
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
              Three steps to a lighter business.
            </h2>
            <p className="text-[#555] text-lg leading-relaxed">
              No guesswork. No generic playbooks. A tailored process that starts with understanding your business and ends with measurable results.
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
                      <div className="w-12 h-12 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center font-serif text-lg">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl mb-3">{step.title}</h3>
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

      {/* ─── DARK SECTION: ROI FRAMING ─── */}
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">THE MATH</p>
              <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                Our clients typically see 10x+ return within the first year.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                When you put a dollar amount on the time wasted, the deals missed, and the overhead you&apos;re carrying — the decision to invest in a clear AI strategy isn&apos;t even close.
              </p>
              <div className="w-16 h-px bg-[#6B8F71] mx-auto" />
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
              <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                For businesses ready to stop guessing.
              </h2>
              <p className="text-[#555] text-lg leading-relaxed">
                We work best with teams that know they need AI but don&apos;t know where to start — and want a strategic partner, not another tool to manage.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={100}>
            <div className="space-y-4">
              {[
                "You're spending more time on admin than on your actual expertise",
                "You know AI could help but aren't sure where to start",
                "You've tried tools before but they didn't stick",
                "You want measurable ROI, not vague promises",
                "You're ready to invest in strategy, not just software",
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
              <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight mb-4">Start with the Assessment.</h2>
              <p className="text-lg text-[#555] max-w-xl mx-auto mb-6">
                Book a call and we&apos;ll show you exactly where your business is leaving money on the table — and what to do about it.
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

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
