#!/usr/bin/env npx tsx
/**
 * Batch-save column + topic + posts to Supabase
 *
 * Usage: echo '<json>' | npx tsx scripts/content-creator/save-content.ts
 *
 * Input JSON schema:
 * {
 *   column: { title, slug, description },
 *   topic: { title, slug, description, image_url?, author?, published_date? },
 *   posts: [{ platform, title, excerpt }]
 * }
 *
 * Output: JSON { success, columnId, topicId, postIds }
 */

import { createClient } from "@supabase/supabase-js";

interface InputColumn {
  title: string;
  slug: string;
  description?: string;
}

interface InputTopic {
  title: string;
  slug: string;
  description?: string;
  image_url?: string;
  author?: string;
  published_date?: string;
}

interface InputPost {
  platform: string;
  title: string;
  excerpt?: string;
}

interface Input {
  column: InputColumn;
  topic: InputTopic;
  posts: InputPost[];
}

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
    process.exit(1);
  }

  // Read JSON from stdin
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.from(chunk));
  }
  const rawInput = Buffer.concat(chunks).toString("utf-8").trim();

  let input: Input;
  try {
    input = JSON.parse(rawInput);
  } catch {
    console.error("Error: Invalid JSON on stdin");
    process.exit(1);
  }

  if (!input.column?.slug || !input.topic?.slug) {
    console.error("Error: column.slug and topic.slug are required");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Find-or-create column by slug
  let columnId: string;
  const { data: existingColumn } = await supabase
    .from("columns")
    .select("id")
    .eq("slug", input.column.slug)
    .single();

  if (existingColumn) {
    columnId = existingColumn.id;
  } else {
    const { data: newColumn, error: colErr } = await supabase
      .from("columns")
      .insert({
        title: input.column.title,
        slug: input.column.slug,
        description: input.column.description || null,
      })
      .select("id")
      .single();

    if (colErr || !newColumn) {
      console.error("Error creating column:", colErr);
      process.exit(1);
    }
    columnId = newColumn.id;
  }

  // Create topic
  const { data: newTopic, error: topicErr } = await supabase
    .from("topics")
    .insert({
      column_id: columnId,
      title: input.topic.title,
      slug: input.topic.slug,
      description: input.topic.description || null,
      image_url: input.topic.image_url || null,
      author: input.topic.author || "Lighten AI",
      published_date: input.topic.published_date || null,
    })
    .select("id")
    .single();

  if (topicErr || !newTopic) {
    console.error("Error creating topic:", topicErr);
    process.exit(1);
  }

  // Create posts
  const postIds: string[] = [];
  for (const post of input.posts || []) {
    const { data: newPost, error: postErr } = await supabase
      .from("posts")
      .insert({
        topic_id: newTopic.id,
        platform: post.platform,
        title: post.title,
        excerpt: post.excerpt || null,
        status: "draft",
      })
      .select("id")
      .single();

    if (postErr) {
      console.error(`Error creating ${post.platform} post:`, postErr);
      continue;
    }
    if (newPost) postIds.push(newPost.id);
  }

  const output = {
    success: true,
    columnId,
    topicId: newTopic.id,
    postIds,
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error("Save content error:", err);
  process.exit(1);
});
