import { createClient } from "@/lib/supabase/server";
import type { ColumnWithTopics, TopicWithPosts, Column } from "@/lib/types/content";

export async function getPublishedContent(): Promise<ColumnWithTopics[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_published_content");

  if (error) {
    console.error("Error fetching content:", error.message, error.code, error.details);
    return [];
  }

  return (data as ColumnWithTopics[]) ?? [];
}

export async function getAllContent(): Promise<ColumnWithTopics[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_all_content");

  if (error) {
    console.error("Error fetching all content:", error.message, error.code, error.details);
    return [];
  }

  return (data as ColumnWithTopics[]) ?? [];
}

export async function getTopicBySlug(
  columnSlug: string,
  topicSlug: string
): Promise<{ column: Column; topic: TopicWithPosts } | null> {
  const supabase = await createClient();

  // Fetch column by slug
  const { data: column, error: columnError } = await supabase
    .from("columns")
    .select("*")
    .eq("slug", columnSlug)
    .single();

  if (columnError || !column) return null;

  // Fetch topic by slug and column_id
  const { data: topic, error: topicError } = await supabase
    .from("topics")
    .select("*")
    .eq("slug", topicSlug)
    .eq("column_id", column.id)
    .single();

  if (topicError || !topic) return null;

  // Fetch posts for this topic
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("topic_id", topic.id)
    .order("created_at", { ascending: true });

  return {
    column,
    topic: { ...topic, posts: posts ?? [] },
  };
}
