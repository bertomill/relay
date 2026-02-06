import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { getPublishedContent } from "@/lib/content";
import { PLATFORMS, PLATFORM_ORDER } from "./platforms";
import type { ThemeWithTopics, TopicWithPosts } from "@/lib/types/content";

export const metadata: Metadata = {
  title: "Content | Lighten AI",
  description:
    "Follow Lighten AI on X, Medium, LinkedIn, and Instagram for insights on AI automation for businesses.",
};

function PlatformIcon({ platformKey }: { platformKey: string }) {
  const meta = PLATFORMS[platformKey];
  if (!meta) return null;
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d={meta.iconPath} />
    </svg>
  );
}

function TopicCard({ topic, themeSlug }: { topic: TopicWithPosts; themeSlug: string }) {
  const publishedByPlatform = new Map(
    topic.posts
      .filter((p) => p.status === "published")
      .map((p) => [p.platform, p])
  );

  const hasAnyPublished = publishedByPlatform.size > 0;

  return (
    <div className="bg-white border border-[#E8E6E1] rounded-2xl overflow-hidden hover:border-[#6B8F71]/40 transition-all duration-300">
      {topic.image_url && (
        <Link href={`/content/${themeSlug}/${topic.slug}`} className="block">
          <div className="relative w-full h-48 md:h-56">
            <Image
              src={topic.image_url}
              alt={topic.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </Link>
      )}
      <div className="p-8">
        <Link href={`/content/${themeSlug}/${topic.slug}`} className="block mb-5">
          <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2 group-hover:text-[#6B8F71]">
            {topic.title}
          </h3>
          {topic.description && (
            <p className="text-[#666] leading-relaxed">{topic.description}</p>
          )}
        </Link>

        <div className="flex flex-wrap gap-2">
        {PLATFORM_ORDER.map((key) => {
          const published = publishedByPlatform.get(key);

          if (published?.url) {
            return (
              <a
                key={key}
                href={published.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B8F71]/10 text-[#6B8F71] text-sm font-medium hover:bg-[#6B8F71]/20 transition-colors"
              >
                <PlatformIcon platformKey={key} />
                {PLATFORMS[key].name}
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            );
          }

          // Show "Coming soon" only when there are no published posts at all
          if (!hasAnyPublished) {
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F4F1] text-[#999] text-sm"
              >
                <PlatformIcon platformKey={key} />
                Coming soon
              </span>
            );
          }

          return null;
        })}
        </div>
      </div>
    </div>
  );
}

function ThemeSection({ theme }: { theme: ThemeWithTopics }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1C1C1C]">
          {theme.title}
        </h2>
        {theme.description && (
          <p className="text-[#666] mt-2 leading-relaxed">
            {theme.description}
          </p>
        )}
      </div>

      <div className="grid gap-6">
        {theme.topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} themeSlug={theme.slug} />
        ))}
      </div>
    </div>
  );
}

export default async function ContentPage() {
  const themes = await getPublishedContent();

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] relative overflow-x-hidden">
      {/* Soft background gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6B8F71] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4E5D7] opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />

      <Navigation />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold text-[#6B8F71] uppercase tracking-[0.15em] mb-4">
              Content
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6 text-[#1C1C1C]">
              Insights to help you work{" "}
              <span className="text-[#6B8F71]">smarter.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#555] leading-relaxed">
              Guides, ideas, and resources on how AI can lighten the load for
              your business. Follow us where you hang out.
            </p>
          </div>
        </section>

        {/* Channel bar */}
        <section className="pb-12 border-b border-[#E8E6E1]">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-[#999] uppercase tracking-wide mr-2">
              Find us on
            </span>
            {PLATFORM_ORDER.map((key) => {
              const p = PLATFORMS[key];
              return (
                <a
                  key={key}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${p.name} — ${p.handle}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8E6E1] text-[#555] hover:border-[#6B8F71]/40 hover:text-[#6B8F71] transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={p.iconPath} />
                  </svg>
                  <span className="text-sm font-medium hidden sm:inline">
                    {p.name}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Theme sections */}
        {themes.length > 0 ? (
          <section className="py-16 space-y-16">
            {themes.map((theme) => (
              <ThemeSection key={theme.id} theme={theme} />
            ))}
          </section>
        ) : (
          <section className="py-16 text-center">
            <p className="text-[#999] text-lg">
              Content is on the way — check back soon.
            </p>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 border-t border-[#E8E6E1]">
          <div className="bg-[#6B8F71] rounded-3xl p-10 lg:p-14 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to stay in the loop?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Reach out and we&apos;ll keep you updated when new content drops.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white text-[#6B8F71] font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 cursor-pointer active:scale-[0.98]"
            >
              Get in touch
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
