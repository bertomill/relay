import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { getTopicBySlug } from "@/lib/content";
import { PLATFORMS, PLATFORM_ORDER } from "../../platforms";

interface PageProps {
  params: Promise<{ columnSlug: string; topicSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { columnSlug, topicSlug } = await params;
  const result = await getTopicBySlug(columnSlug, topicSlug);

  if (!result) {
    return { title: "Not Found | Lighten AI" };
  }

  return {
    title: `${result.topic.title} | Lighten AI`,
    description: result.topic.description ?? undefined,
  };
}

async function getArticleMarkdown(topicSlug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "content", "drafts", topicSlug, "medium-blog.md");
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export default async function TopicDetailPage({ params }: PageProps) {
  const { columnSlug, topicSlug } = await params;
  const result = await getTopicBySlug(columnSlug, topicSlug);

  if (!result) notFound();

  const { column, topic } = result;
  const markdown = await getArticleMarkdown(topicSlug);

  const publishedByPlatform = new Map(
    topic.posts
      .filter((p) => p.status === "published")
      .map((p) => [p.platform, p])
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] relative overflow-x-hidden">
      {/* Soft background gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6B8F71] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4E5D7] opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />

      <Navigation />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Breadcrumb */}
        <nav className="py-6 text-sm text-[#999] flex items-center gap-2 flex-wrap">
          <Link href="/content" className="hover:text-[#6B8F71] transition-colors">
            Content
          </Link>
          <span>/</span>
          <Link href="/content" className="hover:text-[#6B8F71] transition-colors">
            {column.title}
          </Link>
          <span>/</span>
          <span className="text-[#666]">{topic.title}</span>
        </nav>

        {/* Header */}
        <header className="pb-8 border-b border-[#E8E6E1]">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.15] mb-4 text-[#1C1C1C]">
            {topic.title}
          </h1>
          {topic.description && (
            <p className="text-lg text-[#555] leading-relaxed mb-6">
              {topic.description}
            </p>
          )}

          {/* Platform links */}
          {publishedByPlatform.size > 0 && (
            <div className="flex flex-wrap gap-2">
              {PLATFORM_ORDER.map((key) => {
                const published = publishedByPlatform.get(key);
                if (!published?.url) return null;
                const meta = PLATFORMS[key];
                if (!meta) return null;
                return (
                  <a
                    key={key}
                    href={published.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B8F71]/10 text-[#6B8F71] text-sm font-medium hover:bg-[#6B8F71]/20 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={meta.iconPath} />
                    </svg>
                    Read on {meta.name}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                );
              })}
            </div>
          )}
        </header>

        {/* Article body */}
        {markdown ? (
          <article className="py-12 prose prose-lg max-w-none prose-headings:text-[#1C1C1C] prose-headings:font-bold prose-p:text-[#444] prose-p:leading-relaxed prose-a:text-[#6B8F71] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1C1C1C] prose-li:text-[#444] prose-th:text-[#1C1C1C] prose-td:text-[#444] prose-hr:border-[#E8E6E1]">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </article>
        ) : (
          <div className="py-16 text-center">
            <p className="text-[#999] text-lg">
              Full article coming soon. Check out the platform links above.
            </p>
          </div>
        )}

        {/* Back link */}
        <div className="py-8 border-t border-[#E8E6E1]">
          <Link
            href="/content"
            className="inline-flex items-center gap-2 text-[#6B8F71] font-medium hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m0 0l7 7m-7-7l7-7" />
            </svg>
            Back to Content
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
