import { createClient } from "@/lib/supabase/server";
import type { ThemeWithTopics, TopicWithPosts, Theme } from "@/lib/types/content";

export async function getPublishedContent(): Promise<ThemeWithTopics[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_published_content");

  if (error) {
    console.error("Error fetching content:", error.message, error.code, error.details);
    return [];
  }

  return (data as ThemeWithTopics[]) ?? [];
}

export async function getTopicBySlug(
  themeSlug: string,
  topicSlug: string
): Promise<{ theme: Theme; topic: TopicWithPosts } | null> {
  const supabase = await createClient();

  // Fetch theme by slug
  const { data: theme, error: themeError } = await supabase
    .from("themes")
    .select("*")
    .eq("slug", themeSlug)
    .single();

  if (themeError || !theme) return null;

  // Fetch topic by slug and theme_id
  const { data: topic, error: topicError } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", topicSlug)
    .eq("theme_id", theme.id)
    .single();

  if (topicError || !topic) return null;

  // Fetch posts for this topic
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("topic_id", topic.id)
    .order("created_at", { ascending: true });

  return {
    theme,
    topic: { ...topic, posts: posts ?? [] },
  };
}
