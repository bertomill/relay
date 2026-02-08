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
const AGENTS = [
  { name: "Data Entry", description: "Automates structured data input across spreadsheets, CRMs, and databases — eliminating manual keying errors.", icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" },
  { name: "Compliance Docs", description: "Generates, reviews, and files compliance documents so your team stays audit-ready without the busywork.", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" },
  { name: "Client Follow-ups", description: "Sends timely, personalized follow-ups so no lead or client request ever falls through the cracks.", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
  { name: "Document Processing", description: "Extracts, classifies, and routes documents — turning hours of manual review into seconds.", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  { name: "Reporting", description: "Pulls data from multiple sources and builds clear, ready-to-share reports automatically.", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
  { name: "Email Management", description: "Triages, drafts, and schedules emails — keeping your inbox under control without lifting a finger.", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
] as const;

const WHO_WE_SERVE = [
  {
    title: "Professional Services",
    description: "Law firms, accounting practices, and consultancies drowning in compliance and client admin.",
    icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z",
  },
  {
    title: "Growing Teams",
    description: "Startups and SMBs scaling fast but not ready to hire for every operational gap.",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
  },
  {
    title: "Operations Leaders",
    description: "COOs and ops managers looking to automate workflows without a massive IT overhaul.",
    icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
  },
] as const;

const METRICS = [
  { end: 50, suffix: "+", label: "Hours saved weekly" },
  { end: 2, suffix: "", label: "Firms served" },
  { end: 100, suffix: "%", label: "Client satisfaction" },
  { end: 24, suffix: "/7", label: "Always available" },
] as const;

const RESULT_CARDS = [
  {
    metric: { end: 15, suffix: "+" },
    metricLabel: "hours saved per partner weekly",
    title: "Partners move faster",
    description: "More time for strategy, clients, and the work that actually grows your firm.",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  },
  {
    metric: { end: 40, suffix: "%" },
    metricLabel: "less operational overhead",
    title: "Managers breathe easier",
    description: "Scale output without scaling stress. Your team does more, not more hours.",
    icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
  },
  {
    metric: { end: 10, suffix: "x" },
    metricLabel: "faster document processing",
    title: "Staff do meaningful work",
    description: "Less busywork, more growth. The kind of work people actually want to do.",
    icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  },
] as const;

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Tell us what weighs you down",
    description: "We listen to your team, map your workflows, and find the tasks draining the most time.",
  },
  {
    step: 2,
    title: "We build your custom agents",
    description: "Tailored AI agents designed around your processes — not the other way around.",
  },
  {
    step: 3,
    title: "Your team gets lighter, fast",
    description: "Deploy in days, not months. See measurable time savings from week one.",
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
                <h1 className="text-3xl md:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-3 md:mb-4 text-[#1C1C1C]">
                  Work should feel{" "}
                  <span className="text-[#6B8F71]">lighter.</span>
                </h1>
              </AnimateIn>
              <AnimateIn animation="fade-up" delay={100}>
                <p className="text-base md:text-xl text-[#555] leading-relaxed mb-4 md:mb-6">
                  We build AI agents that carry the load — so you can move faster, think bigger, and do more of what matters.
                </p>
              </AnimateIn>

              {/* Trust indicators */}
              <AnimateIn animation="fade-up" delay={150}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#777]">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span>Custom-built for your firm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Hours back, every week</span>
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
              <p className="text-xs font-semibold text-[#999] uppercase tracking-[0.15em] mb-4">Our Agents</p>
              <AgentsGrid agents={AGENTS} />
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
            <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">The Results</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C]">Real impact, measured in hours.</h2>
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
            A lighter firm is a better firm — more responsive, more profitable, and somewhere people actually want to be.
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
                <span className="inline-block text-xs font-semibold text-[#999] uppercase tracking-[0.15em] mb-4">The Problem</span>
                <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">Every hour on repetitive work is weight that slows everything down.</h3>
                <p className="text-[#666] leading-relaxed mb-4">
                  Compliance, manual data entry, routine client requests — it&apos;s all weight you&apos;re carrying that keeps you from the work that matters.
                </p>
                <p className="text-[#1C1C1C] font-semibold">You didn&apos;t build your practice to grind. You built it to grow.</p>
              </div>
            </AnimateIn>

            {/* Solution */}
            <AnimateIn animation="slide-left">
              <div className="bg-white border border-[#E8E6E1] rounded-[2rem] p-8 lg:p-10">
                <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">What We Do</span>
                <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">Custom agents for how your team actually works.</h3>
                <p className="text-[#666] leading-relaxed mb-4">
                  Lighten AI designs and deploys AI agents tailored to your firm&apos;s workflows — document intake, client correspondence, first-pass analysis.
                </p>
                <p className="text-[#1C1C1C] font-semibold">Not generic chatbots. Custom agents trained on how your team actually works.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1C1C]">Three steps to a lighter team.</h2>
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
                Businesses ready to punch above their weight.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to feel lighter?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Let&apos;s talk about what&apos;s weighing your team down — and how to lift it.
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
