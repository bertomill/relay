import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ContactForm } from "./components/ContactForm";
import { CalendlyWidget } from "./components/CalendlyWidget";
import { AnimateIn } from "./components/AnimateIn";
import { CountUp } from "./components/CountUp";
import { HeroBackground } from "./components/HeroBackground";
import { GrainTexture } from "./components/GrainTexture";
import { ContentIllustration, SupportIllustration, MarketingIllustration } from "./components/illustrations/FeatureIllustrations";
import { ServicePills } from "./components/ServicePills";
import Link from "next/link";

const FEATURE_ILLUSTRATIONS: Record<string, React.FC> = {
  CONTENT: ContentIllustration,
  "MULTI-PLATFORM": SupportIllustration,
  WORKFLOW: MarketingIllustration,
};

const AI_SYSTEMS = [
  { name: "Blog & Article Agents", description: "AI agents that research, draft, and polish long-form content. Blog posts, thought leadership, and SEO articles, all in your brand voice.", icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" },
  { name: "Social Media Agents", description: "Agents that create platform-native content for LinkedIn, X, Instagram, and more. Consistent posting without the burnout.", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
  { name: "Video & Script Agents", description: "From YouTube scripts to short-form video outlines and captions. AI agents that turn ideas into production-ready content.", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
  { name: "Email & Newsletter Agents", description: "AI agents that craft email sequences, newsletters, and drip campaigns. Personalized messaging at scale.", icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" },
] as const;

const METRICS = [
  { end: 50, suffix: "+", label: "AI agents deployed" },
  { end: 10, suffix: "x", label: "Content output" },
  { end: 70, suffix: "%", label: "Less production time" },
  { end: 5, suffix: "x", label: "Faster time to publish" },
] as const;

const FEATURES = [
  {
    label: "CONTENT",
    title: "Your voice, amplified by agents.",
    description: "Blog posts, social threads, video scripts, newsletters. AI agents trained on your voice that produce content you actually want to publish. Not generic AI slop.",
    icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
  },
  {
    label: "MULTI-PLATFORM",
    title: "One idea, every platform.",
    description: "Your agents repurpose a single piece of content into LinkedIn posts, X threads, Instagram captions, email sequences, and more. Consistent presence without the grind.",
    icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
  {
    label: "WORKFLOW",
    title: "From idea to published in minutes.",
    description: "AI agents handle the entire content pipeline: research, drafting, editing, formatting, and scheduling. You approve, they execute.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
] as const;

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Content audit",
    description: "We map your content workflows, identify bottlenecks, and find where AI agents create the biggest impact.",
  },
  {
    step: 2,
    title: "Custom agent build",
    description: "Agents trained on your brand voice, tone, and audience. Not generic templates.",
  },
  {
    step: 3,
    title: "Launch & scale",
    description: "Your agents start producing. We monitor quality, refine outputs, and expand your content system monthly.",
  },
] as const;

export default function Home() {
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
                Fractional AI Officer
              </span>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={50}>
            <h1 className="font-sans font-light text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6">
              Scale <span className="text-[#6B8F71]">lighter.</span>
            </h1>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={100}>
            <p className="text-lg md:text-xl text-[#555] leading-relaxed mb-10 max-w-2xl mx-auto">
              Your trusted partner that identifies profit gaps, wasted hours, bottlenecks, and inefficiencies, and shows you where AI can run your processes strategically.
            </p>
          </AnimateIn>

          {/* ─── SERVICE PILLS ─── */}
          <AnimateIn animation="fade-up" delay={200}>
            <div className="max-w-2xl mx-auto mb-10">
              <ServicePills />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ─── PROBLEMS WE SOLVE ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <AnimateIn animation="fade-up">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">SOUND FAMILIAR?</p>
            <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight">Problems we solve.</h2>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {[
            { title: "Sales bleeding leads", description: "Your pipeline is leaking because nobody follows up fast enough. Opportunities go cold while your team juggles too many priorities." },
            { title: "Support drowning in tickets", description: "Your customer support team spends hours on repetitive questions that could be resolved instantly with the right system." },
            { title: "Marketing running on guesswork", description: "Your marketing team is guessing instead of using data. Campaigns launch without clear insight into what actually drives results." },
            { title: "Admin buried in manual work", description: "Your admin team is stuck in spreadsheets, copy-pasting, and chasing approvals. Hours lost to work that should run itself." },
          ].map((problem, i) => (
            <AnimateIn key={problem.title} animation="fade-up" delay={i * 100}>
              <div className="bg-white border border-[#E8E6E1] rounded-2xl p-7 h-full">
                <div className="w-10 h-10 rounded-full bg-[#FDF2F2] flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#C45C5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{problem.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">WHAT WE DO</p>
              <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight">
                We expose the gaps. Then we close them.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Find the gaps", description: "We audit your operations and surface the inefficiencies hiding in your sales, support, marketing, and admin workflows." },
              { step: "02", title: "Put a dollar sign on it", description: "Every gap gets a cost. You see exactly how much wasted time, lost revenue, and missed opportunity is on the table." },
              { step: "03", title: "Show what it\u2019s worth to close it", description: "We map the ROI of closing each gap with AI. You see the before, the after, and the path to get there." },
            ].map((item, i) => (
              <AnimateIn key={item.step} animation="fade-up" delay={i * 120}>
                <div className="border border-white/10 rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 h-full">
                  <span className="text-[#6B8F71] text-sm font-semibold tracking-[0.1em]">{item.step}</span>
                  <h3 className="text-xl font-semibold mt-3 mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{item.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DARK METRICS BAR ─── */}
      <section className="grain-green bg-[#6B8F71]">
        <GrainTexture density={0.2} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS.map((metric, i) => (
              <AnimateIn key={metric.label} animation="fade-up" delay={i * 100}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-sans font-light text-white">
                    <CountUp end={metric.end} suffix={metric.suffix} />
                  </p>
                  <p className="text-xs text-white/50 uppercase tracking-[0.15em] mt-2">{metric.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE SECTIONS (Origin-style split layout) ─── */}
      {FEATURES.map((feature, i) => {
        const isReversed = i % 2 === 1;
        return (
          <section key={feature.label} className={isReversed ? "bg-[#F5F4F1]/50" : ""}>
            <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <AnimateIn animation={isReversed ? "slide-left" : "slide-right"} className={isReversed ? "lg:order-2" : ""}>
                  <div>
                    <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">{feature.label}</p>
                    <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">{feature.title}</h2>
                    <p className="text-[#555] text-lg leading-relaxed mb-8">{feature.description}</p>
                    <Link
                      href="/offer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1C1C] uppercase tracking-[0.1em] hover:text-[#6B8F71] transition-colors duration-200"
                    >
                      LEARN MORE
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </AnimateIn>
                <AnimateIn animation={isReversed ? "slide-right" : "slide-left"} delay={100} className={isReversed ? "lg:order-1" : ""}>
                  {(() => {
                    const Illustration = FEATURE_ILLUSTRATIONS[feature.label];
                    return Illustration ? <Illustration /> : null;
                  })()}
                </AnimateIn>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── DARK SECTION: WHAT WE BUILD ─── */}
      <section className="grain-green bg-[#6B8F71] text-white">
        <GrainTexture density={0.45} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-white/70 uppercase tracking-[0.15em] mb-4">WHAT WE BUILD</p>
              <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight">
                AI agents built<br className="hidden md:block" /> for your content.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 gap-6">
            {AI_SYSTEMS.map((system, i) => (
              <AnimateIn key={system.name} animation="fade-up" delay={i * 100}>
                <div className="group border border-white/15 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 hover:bg-white/5">
                  <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={system.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{system.name}</h3>
                  <p className="text-white/60 leading-relaxed">{system.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <AnimateIn animation="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">PROCESS</p>
            <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight">Three steps to lighter content.</h2>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-[#E8E6E1]" aria-hidden="true" />

          {HOW_IT_WORKS.map((item, i) => (
            <AnimateIn key={item.step} animation="fade-up" delay={i * 150}>
              <div className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-[#6B8F71] text-white flex items-center justify-center mx-auto mb-6 text-lg font-sans font-light relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[#666] leading-relaxed">{item.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ─── CONTACT + CALENDLY ─── */}
      <section id="contact" className="bg-[#F5F4F1]/50">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">GET IN TOUCH</p>
              <h2 className="font-sans font-light text-3xl md:text-5xl leading-[1.1] tracking-tight mb-4">
                Let&apos;s build your content agents.
              </h2>
              <p className="text-lg text-[#555] max-w-xl mx-auto">
                30 minutes. We&apos;ll show you exactly how AI agents can scale your content without hiring.
              </p>
            </div>
          </AnimateIn>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <AnimateIn animation="fade-up" delay={100}>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E6E1]">
                <ContactForm />
              </div>
            </AnimateIn>
            <AnimateIn animation="fade-in" delay={200}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-[#E8E6E1]" />
                  <span className="text-xs text-[#888] uppercase tracking-[0.15em]">or book directly</span>
                  <div className="flex-1 h-px bg-[#E8E6E1]" />
                </div>
                <div className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden">
                  <CalendlyWidget />
                </div>
              </div>
            </AnimateIn>
          </div>
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
