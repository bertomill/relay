import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ContactForm } from "./components/ContactForm";
import { CalendlyWidget } from "./components/CalendlyWidget";
import { AnimateIn } from "./components/AnimateIn";
import { CountUp } from "./components/CountUp";
import { HeroBackground } from "./components/HeroBackground";
import { ContentIllustration, SupportIllustration, MarketingIllustration } from "./components/illustrations/FeatureIllustrations";
import Link from "next/link";

const FEATURE_ILLUSTRATIONS: Record<string, React.FC> = {
  CONTENT: ContentIllustration,
  SUPPORT: SupportIllustration,
  MARKETING: MarketingIllustration,
};

const AI_SYSTEMS = [
  { name: "Content Engine", description: "AI generates product descriptions, collection pages, email flows, and social content, all in your brand voice.", icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" },
  { name: "Customer Support AI", description: "Smart chatbots handle FAQs, order status, returns, and sizing questions 24/7. Your team focuses on complex issues.", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" },
  { name: "Marketing Automation", description: "AI-powered ad copy, SEO optimization, campaign automation, and personalization. Right message, right time.", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
  { name: "Operations Intelligence", description: "Inventory forecasting, order automation, and sales analytics. Data-driven decisions without a data team.", icon: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" },
] as const;

const METRICS = [
  { end: 200, suffix: "+", label: "AI systems built" },
  { end: 3, suffix: "x", label: "Content output" },
  { end: 70, suffix: "%", label: "Less production time" },
  { end: 24, suffix: "/7", label: "Customer support" },
] as const;

const FEATURES = [
  {
    label: "CONTENT",
    title: "Keep your brand voice everywhere.",
    description: "Product descriptions, email flows, collection pages, social content. All generated in your voice. Not generic AI slop. Custom systems trained on your brand, your products, your customers.",
    icon: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z",
  },
  {
    label: "SUPPORT",
    title: "Customer support that never sleeps.",
    description: "Smart AI handles FAQs, order status, returns, and sizing questions 24/7. Your team only steps in when it matters. Lower response time, higher satisfaction, fraction of the cost.",
    icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
  {
    label: "MARKETING",
    title: "Scale your marketing machine.",
    description: "AI-powered ad copy, SEO optimization, campaign automation, and personalization. The right message to the right customer at the right time, without a full marketing team.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
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
    description: "Systems trained on your brand voice, products, and customers. Not generic templates.",
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
      <Navigation />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <HeroBackground />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 lg:py-32 text-center relative z-10">
          <AnimateIn animation="fade-up">
            <div className="inline-flex items-center gap-2 border border-[#E8E6E1] rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#6B8F71]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#555]">
                Fractional AI Officer for Shopify Stores
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
              Your fractional AI officer. We build content engines, support bots, and marketing automation custom-fit for your Shopify store.
            </p>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={150}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#1C1C1C] text-[#1C1C1C] text-sm font-semibold tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-[#1C1C1C] hover:text-white transition-colors duration-200 mb-12"
            >
              GET STARTED
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </AnimateIn>

          <AnimateIn animation="fade-up" delay={200}>
            <Link
              href="/agents"
              className="group block max-w-xl mx-auto bg-white border border-[#E8E6E1] rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-[#6B8F71]/40 hover:shadow-lg hover:shadow-[#6B8F71]/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-[#6B8F71]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <span className="text-[#999] text-sm flex-1 text-left">How can AI help my Shopify store?</span>
              <svg className="w-4 h-4 text-[#CCC] group-hover:text-[#6B8F71] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </AnimateIn>

          <AnimateIn animation="fade-in" delay={300}>
            <p className="text-xs text-[#999] uppercase tracking-[0.15em] mt-10">
              Automate everything. Scale anything.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ─── DARK METRICS BAR ─── */}
      <section className="bg-[#1C1C1C]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS.map((metric, i) => (
              <AnimateIn key={metric.label} animation="fade-up" delay={i * 100}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-serif text-white">
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
                    <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">{feature.title}</h2>
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
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <AnimateIn animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">WHAT WE BUILD</p>
              <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight">
                AI systems designed<br className="hidden md:block" /> for your Shopify store.
              </h2>
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 gap-6">
            {AI_SYSTEMS.map((system, i) => (
              <AnimateIn key={system.name} animation="fade-up" delay={i * 100}>
                <div className="group border border-white/10 rounded-2xl p-8 hover:border-[#6B8F71]/40 transition-all duration-300 hover:bg-white/5">
                  <div className="w-14 h-14 rounded-full bg-[#6B8F71]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight">Three steps to a lighter store.</h2>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-[#E8E6E1]" aria-hidden="true" />

          {HOW_IT_WORKS.map((item, i) => (
            <AnimateIn key={item.step} animation="fade-up" delay={i * 150}>
              <div className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center mx-auto mb-6 text-lg font-serif relative z-10">
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
              <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight mb-4">
                Let&apos;s audit your store for free.
              </h2>
              <p className="text-lg text-[#555] max-w-xl mx-auto">
                30 minutes. We&apos;ll show you exactly where AI fits your brand and how to scale without hiring.
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
      <section className="bg-[#1C1C1C] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <AnimateIn animation="fade-up">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
              Ready to scale<br className="hidden md:block" /> <span className="italic text-[#6B8F71]">without the overhead?</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              Join the Shopify brands using AI to 3x content output, cut support costs, and grow without hiring.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="bg-[#6B8F71] text-white text-sm font-semibold tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-[#5A7D60] transition-colors duration-200"
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
