import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ContactForm } from "./components/ContactForm";
import { CalendlyWidget } from "./components/CalendlyWidget";
import { AnimateIn } from "./components/AnimateIn";
import { CountUp } from "./components/CountUp";
import { HeroGlow } from "./components/HeroGlow";
import { FloatingFeathers, FeatherAccent } from "./components/FloatingFeathers";
import { FeatherDivider } from "./components/FeatherDivider";
import { FeatherRise } from "./components/FeatherRise";
import { AgentsGrid } from "./components/AgentsGrid";

// Hoisted static data - avoids recreation on every render
const AI_SYSTEMS = [
  { name: "Content Engine", description: "AI generates product descriptions, collection pages, email flows, and social content — all in your brand voice.", icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" },
  { name: "Customer Support AI", description: "Smart chatbots handle FAQs, order status, returns, and sizing questions 24/7 — your team focuses on complex issues.", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
  { name: "Marketing Automation", description: "AI-powered ad copy, SEO optimization, campaign automation, and personalization — right message, right time.", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
  { name: "Operations Intelligence", description: "Inventory forecasting, order automation, and sales analytics — data-driven decisions without a data team.", icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" },
] as const;

const WHO_WE_SERVE = [
  {
    title: "Shopify Brands Scaling Fast",
    description: "You\u2019re growing but can\u2019t hire fast enough. AI systems let you 3x content output without adding headcount.",
    icon: "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z",
  },
  {
    title: "DTC Founders ($10K\u2013$500K/mo)",
    description: "You\u2019re doing well but wearing too many hats. We take content, support, and marketing off your plate.",
    icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  },
  {
    title: "AI-Curious, No Time to Build",
    description: "You know AI can help but you don\u2019t have time to figure it out. We build the systems and train your team.",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
  },
] as const;

const METRICS = [
  { end: 200, suffix: "+", label: "AI systems built" },
  { end: 3, suffix: "x", label: "Content output" },
  { end: 70, suffix: "%", label: "Less production time" },
  { end: 24, suffix: "/7", label: "Customer support" },
] as const;

const RESULT_CARDS = [
  {
    metric: { end: 3, suffix: "x" },
    metricLabel: "content output",
    title: "Launch products faster",
    description: "Product descriptions, email flows, and social content generated in your brand voice — not generic AI slop.",
    icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  },
  {
    metric: { end: 70, suffix: "%" },
    metricLabel: "faster production time",
    title: "Support on autopilot",
    description: "AI handles FAQs, order status, and returns around the clock. Your team only steps in when it matters.",
    icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
  {
    metric: { end: 10, suffix: "x" },
    metricLabel: "product listings per day",
    title: "Grow without hiring",
    description: "Scale content, marketing, and operations with AI systems — not new headcount.",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
] as const;

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Store audit",
    description: "We map your workflows, identify bottlenecks, and find where AI creates the biggest impact for your store.",
  },
  {
    step: 2,
    title: "Custom AI build",
    description: "Systems trained on your brand voice, products, and customers \u2014 not generic templates.",
  },
  {
    step: 3,
    title: "Launch & optimize",
    description: "Plugged into your Shopify stack. As your fractional AI officer, we refine and expand monthly.",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] relative overflow-x-hidden">
      {/* Soft background gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6B8F71] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4E5D7] opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />

      <Navigation />

      {/* Hero Section — compact so form fits above the fold */}
      <section className="relative">
        <HeroGlow />
        <FloatingFeathers />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-4 pb-6 md:pt-6 md:pb-10 lg:pt-10 lg:pb-14">
          <div className="grid lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
            {/* Left: Headline only */}
            <div className="flex flex-col justify-center">
              <AnimateIn animation="fade-up">
                <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-3">Fractional AI Officer for Shopify Brands</p>
                <h1 className="text-3xl md:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-3 md:mb-4 text-[#1C1C1C]">
                  Scale your store with AI.{" "}
                  <span className="text-[#6B8F71]">Not more headcount.</span>
                </h1>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <p className="text-base md:text-xl text-[#555] leading-relaxed mb-4 md:mb-6">
                  We embed as your fractional AI officer and build content engines, customer support bots, marketing automation, and operations intelligence — all custom-built for your Shopify store.
                </p>
              </AnimateIn>

              {/* Trust indicators */}
              <AnimateIn animation="fade-up" delay={150}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#777]">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span>Built for Shopify brands</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>200+ AI systems delivered</span>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right: Contact Form */}
            <AnimateIn animation="fade-in" delay={200}>
              <div id="contact" className="bg-white rounded-2xl md:rounded-[2rem] p-4 md:p-6 shadow-xl shadow-[#6B8F71]/8 border border-[#E8E6E1]">
                <ContactForm />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Agents + Calendly strip */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Agents list */}
          <AnimateIn animation="fade-up" delay={200}>
            <div>
              <p className="text-xs font-semibold text-[#999] uppercase tracking-[0.15em] mb-4">AI Systems We Build</p>
              <AgentsGrid agents={AI_SYSTEMS} />
            </div>
          </AnimateIn>

          {/* Right: Calendly */}
          <AnimateIn animation="fade-in" delay={200}>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#E8E6E1]" />
                <span className="text-sm text-[#888]">or book a call directly</span>
                <div className="flex-1 h-px bg-[#E8E6E1]" />
              </div>
              <div className="bg-white rounded-[2rem] shadow-xl shadow-[#6B8F71]/8 border border-[#E8E6E1] overflow-hidden">
                <CalendlyWidget />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Feather divider */}
      <div className="max-w-md mx-auto px-6">
        <FeatherDivider />
      </div>

      {/* Social Proof Metrics Bar — full-width tinted */}
      <section className="bg-[#F5F4F1]/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS.map((metric, i) => (
              <AnimateIn key={metric.label} animation="fade-up" delay={i * 100}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-[#6B8F71]">
                    <CountUp end={metric.end} suffix={metric.suffix} />
                  </p>
                  <p className="text-sm text-[#666] mt-1">{metric.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Result - Cards with metrics */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        <FeatherAccent position="right" size={48} />
        <AnimateIn animation="fade-up">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">Expected Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C]">Real results for real stores.</h2>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6">
          {RESULT_CARDS.map((card, i) => (
            <AnimateIn key={card.title} animation="fade-up" delay={i * 100}>
              <div className="group bg-white border border-[#E8E6E1] hover:border-[#6B8F71]/40 rounded-[2rem] p-8 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#6B8F71]/8">
                <div className="w-12 h-12 rounded-3xl bg-[#6B8F71]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-[#6B8F71] mb-1">
                  <CountUp end={card.metric.end} suffix={card.metric.suffix} />
                </p>
                <p className="text-xs text-[#999] uppercase tracking-wide mb-4">{card.metricLabel}</p>
                <h3 className="text-xl font-semibold mb-3 text-[#1C1C1C]">{card.title}</h3>
                <p className="text-[#666] leading-relaxed">{card.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn animation="fade-up" delay={300}>
          <p className="text-lg text-[#555] mt-10 max-w-2xl">
            You should be building your brand and talking to customers — not grinding out product descriptions and email sequences every week.
          </p>
        </AnimateIn>
      </section>

      {/* The problem & solution — full-width tinted */}
      <section className="bg-[#F5F4F1]/30">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Problem */}
            <AnimateIn animation="slide-right">
              <div className="bg-[#F5F4F1] rounded-[2rem] p-8 lg:p-10">
                <span className="inline-block text-xs font-semibold text-[#999] uppercase tracking-[0.15em] mb-4">Sound Familiar?</span>
                <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">You&apos;re doing everything manually — and it&apos;s holding you back.</h3>
                <p className="text-[#666] leading-relaxed mb-4">
                  Writing product descriptions one at a time. Customer support tickets piling up overnight. Marketing that feels inconsistent because nobody has time. You tried ChatGPT but everything sounds generic.
                </p>
                <p className="text-[#1C1C1C] font-semibold">You need a system — not another tool to figure out.</p>
              </div>
            </AnimateIn>

            {/* Solution */}
            <AnimateIn animation="slide-left">
              <div className="bg-white border border-[#E8E6E1] rounded-[2rem] p-8 lg:p-10">
                <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">What We Do</span>
                <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">AI systems built around your brand, your store, your voice.</h3>
                <p className="text-[#666] leading-relaxed mb-4">
                  Lighten AI embeds as your fractional AI officer — building content engines, support bots, marketing automation, and operations intelligence custom-fit to your Shopify store.
                </p>
                <p className="text-[#1C1C1C] font-semibold">Not generic chatbots. Custom AI trained on your brand voice, products, and customers.</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Feather divider */}
      <div className="max-w-md mx-auto px-6">
        <FeatherDivider />
      </div>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        <FeatherAccent position="left" size={36} />
        <AnimateIn animation="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C]">Three steps to a lighter store.</h2>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-[#E8E6E1]" aria-hidden="true" />

          {HOW_IT_WORKS.map((item, i) => (
            <AnimateIn key={item.step} animation="fade-up" delay={i * 150}>
              <div className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-[#6B8F71] text-white flex items-center justify-center mx-auto mb-5 text-lg font-bold relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1C1C1C]">{item.title}</h3>
                <p className="text-[#666] leading-relaxed">{item.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Who we serve — full-width tinted */}
      <section className="bg-[#F5F4F1]/50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <AnimateIn animation="fade-up">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">Who We Serve</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1C1C]">
                Shopify brands ready to scale smarter.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-6">
            {WHO_WE_SERVE.map((item, i) => (
              <AnimateIn key={item.title} animation="fade-up" delay={i * 100}>
                <div className="bg-white border border-[#E8E6E1] rounded-[2rem] p-8 hover:border-[#6B8F71]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#6B8F71]/8">
                  <div className="w-12 h-12 rounded-3xl bg-[#6B8F71]/10 flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[#1C1C1C]">{item.title}</h3>
                  <p className="text-[#666] leading-relaxed">{item.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 relative">
        <FeatherRise />
        <AnimateIn animation="fade-up">
          <div className="bg-[#6B8F71] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 lg:p-14 text-center text-white relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s audit your Shopify store — free.</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              30 minutes. We&apos;ll show you exactly where AI fits your brand and how to scale without hiring.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-[#6B8F71] font-semibold rounded-full hover:bg-white/90 transition-all duration-200 active:scale-[0.98]"
              >
                Start a Conversation
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200 active:scale-[0.98]"
              >
                Book a Call
              </a>
            </div>
            <a
              href="/lighten-ai-one-pager.pdf"
              download
              className="inline-flex items-center gap-2 mt-4 text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download our one-pager (PDF)
            </a>
          </div>
        </AnimateIn>
      </section>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
