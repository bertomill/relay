import { tool } from "@anthropic-ai/claude-agent-sdk";
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "fs";
import { join, basename } from "path";
import { z } from "zod";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const PLATFORM_FILES: Record<string, string> = {
  x: "x-twitter.md",
  medium: "medium-blog.md",
  linkedin: "linkedin.md",
  instagram: "instagram.md",
  youtube: "youtube-script.md",
};

// --- search_posts ---
export const searchPosts = tool(
  "search_posts",
  "Search existing themes, topics, and posts in the Supabase database. Use this to see what content already exists before creating new ideas.",
  { query: z.string().describe("Search term to match against titles and descriptions") },
  async ({ query }) => {
    const supabase = getSupabase();

    const [themes, topics, posts] = await Promise.all([
      supabase.from("themes").select("*").ilike("title", `%${query}%`),
      supabase.from("topics").select("*").ilike("title", `%${query}%`),
      supabase.from("posts").select("*").ilike("title", `%${query}%`),
    ]);

    const results = {
      themes: themes.data ?? [],
      topics: topics.data ?? [],
      posts: posts.data ?? [],
    };

    const total =
      results.themes.length + results.topics.length + results.posts.length;

    return {
      content: [
        {
          type: "text" as const,
          text:
            total === 0
              ? `No results found for "${query}".`
              : `Found ${total} results for "${query}":\n\n` +
                (results.themes.length
                  ? `**Themes (${results.themes.length}):**\n${results.themes.map((t) => `- ${t.title}: ${t.description || "no description"}`).join("\n")}\n\n`
                  : "") +
                (results.topics.length
                  ? `**Topics (${results.topics.length}):**\n${results.topics.map((t) => `- ${t.title}: ${t.description || "no description"}`).join("\n")}\n\n`
                  : "") +
                (results.posts.length
                  ? `**Posts (${results.posts.length}):**\n${results.posts.map((p) => `- [${p.platform}] ${p.title} (${p.status})`).join("\n")}`
                  : ""),
        },
      ],
    };
  }
);

// --- search_drafts ---
export const searchDrafts = tool(
  "search_drafts",
  "Search local markdown draft files in content/drafts/ for keyword matches. Use this to check what draft content exists on disk.",
  { query: z.string().describe("Keyword to search for in draft file contents") },
  async ({ query }) => {
    const draftsDir = join(process.cwd(), "content", "drafts");
    const results: { file: string; matches: string[] }[] = [];

    let dirs: string[];
    try {
      dirs = readdirSync(draftsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    } catch {
      return {
        content: [{ type: "text" as const, text: "No content/drafts/ directory found." }],
      };
    }

    const lowerQuery = query.toLowerCase();

    for (const dir of dirs) {
      const dirPath = join(draftsDir, dir);
      const files = readdirSync(dirPath).filter((f) => f.endsWith(".md"));

      for (const file of files) {
        const content = readFileSync(join(dirPath, file), "utf-8");
        if (content.toLowerCase().includes(lowerQuery)) {
          const lines = content
            .split("\n")
            .filter((line) => line.toLowerCase().includes(lowerQuery))
            .slice(0, 3);
          results.push({ file: `${dir}/${file}`, matches: lines });
        }
      }
    }

    return {
      content: [
        {
          type: "text" as const,
          text:
            results.length === 0
              ? `No draft files contain "${query}".`
              : `Found "${query}" in ${results.length} draft file(s):\n\n` +
                results
                  .map(
                    (r) =>
                      `**${r.file}:**\n${r.matches.map((m) => `  > ${m.trim()}`).join("\n")}`
                  )
                  .join("\n\n"),
        },
      ],
    };
  }
);

// --- create_content_idea ---
export const createContentIdea = tool(
  "create_content_idea",
  "Save a content idea to the content_ideas table in Supabase for later review.",
  {
    title: z.string().describe("Title of the content idea"),
    description: z.string().optional().describe("Optional description or notes about the idea"),
  },
  async ({ title, description }) => {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("content_ideas")
      .insert({ title, description: description ?? null })
      .select()
      .single();

    if (error) {
      return {
        content: [
          { type: "text" as const, text: `Error saving idea: ${error.message}` },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: `Saved content idea: "${data.title}" (id: ${data.id})`,
        },
      ],
    };
  }
);

// --- create_article ---
export const createArticle = tool(
  "create_article",
  "Create a full multi-platform article. Creates or finds the theme and topic in Supabase, inserts 5 platform posts, and writes draft markdown files to content/drafts/[slug]/.",
  {
    theme_title: z.string().describe("Theme title (broad content pillar)"),
    topic_title: z.string().describe("Topic title (specific angle)"),
    drafts: z
      .object({
        x: z.string().describe("Twitter/X thread content"),
        medium: z.string().describe("Medium blog post content"),
        linkedin: z.string().describe("LinkedIn post content"),
        instagram: z.string().describe("Instagram carousel content"),
        youtube: z.string().describe("YouTube script content"),
      })
      .describe("Draft content for each of the 5 platforms"),
  },
  async ({ theme_title, topic_title, drafts }) => {
    const supabase = getSupabase();

    // 1. Find or create theme
    const themeSlug = slugify(theme_title);
    let { data: theme } = await supabase
      .from("themes")
      .select("*")
      .eq("slug", themeSlug)
      .single();

    if (!theme) {
      const { data, error } = await supabase
        .from("themes")
        .insert({ title: theme_title, slug: themeSlug, sort_order: 0 })
        .select()
        .single();
      if (error) {
        return {
          content: [{ type: "text" as const, text: `Error creating theme: ${error.message}` }],
        };
      }
      theme = data;
    }

    // 2. Create topic
    const topicSlug = slugify(topic_title);
    let { data: topic } = await supabase
      .from("topics")
      .select("*")
      .eq("slug", topicSlug)
      .eq("theme_id", theme.id)
      .single();

    if (!topic) {
      const { data, error } = await supabase
        .from("topics")
        .insert({
          theme_id: theme.id,
          title: topic_title,
          slug: topicSlug,
          sort_order: 0,
        })
        .select()
        .single();
      if (error) {
        return {
          content: [{ type: "text" as const, text: `Error creating topic: ${error.message}` }],
        };
      }
      topic = data;
    }

    // 3. Create 5 posts
    const platforms = ["x", "medium", "linkedin", "instagram", "youtube"] as const;
    const posts: { platform: string; id: string }[] = [];

    for (const platform of platforms) {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          topic_id: topic.id,
          platform,
          title: topic_title,
          status: "draft",
        })
        .select()
        .single();
      if (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error creating ${platform} post: ${error.message}`,
            },
          ],
        };
      }
      posts.push({ platform, id: data.id });
    }

    // 4. Write markdown files
    const draftDir = join(process.cwd(), "content", "drafts", topicSlug);
    mkdirSync(draftDir, { recursive: true });

    for (const platform of platforms) {
      const filename = PLATFORM_FILES[platform];
      const content = drafts[platform];
      writeFileSync(join(draftDir, filename), content, "utf-8");
    }

    return {
      content: [
        {
          type: "text" as const,
          text:
            `Article created successfully!\n\n` +
            `**Theme:** ${theme.title} (${theme.slug})\n` +
            `**Topic:** ${topic.title} (${topic.slug})\n` +
            `**Posts created:** ${posts.map((p) => p.platform).join(", ")}\n` +
            `**Draft files written to:** content/drafts/${topicSlug}/\n` +
            `Files: ${platforms.map((p) => PLATFORM_FILES[p]).join(", ")}`,
        },
      ],
    };
  }
);

export const allTools = [searchPosts, searchDrafts, createContentIdea, createArticle];
