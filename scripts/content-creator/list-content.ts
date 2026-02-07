#!/usr/bin/env npx tsx
/**
 * List existing columns and topics from Supabase
 *
 * Usage: npx tsx scripts/content-creator/list-content.ts
 * Output: JSON array of columns with their topics
 */

import { createClient } from "@supabase/supabase-js";

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: columns, error: colErr } = await supabase
    .from("columns")
    .select("id, title, slug, description, sort_order")
    .order("sort_order");

  if (colErr) {
    console.error("Error fetching columns:", colErr);
    process.exit(1);
  }

  const result = [];
  for (const col of columns || []) {
    const { data: topics } = await supabase
      .from("topics")
      .select("id, title, slug, description, author, published_date, sort_order")
      .eq("column_id", col.id)
      .order("sort_order");

    result.push({
      ...col,
      topics: topics || [],
    });
  }

  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("List content error:", err);
  process.exit(1);
});
