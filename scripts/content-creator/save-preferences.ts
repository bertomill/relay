#!/usr/bin/env npx tsx
/**
 * Manage agent style preferences in Supabase
 *
 * Usage: echo '<json>' | npx tsx scripts/content-creator/save-preferences.ts
 *
 * Input JSON schema:
 * { action: "add" | "remove" | "list", rule?: string, userId: string }
 *
 * Output: JSON { success, rules }
 */

import { createClient } from "@supabase/supabase-js";

interface Input {
  action: "add" | "remove" | "list";
  rule?: string;
  userId: string;
}

const AGENT_ID = "content-creator";

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required"
    );
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

  if (!input.userId) {
    console.error("Error: userId is required");
    process.exit(1);
  }

  if (!input.action) {
    console.error("Error: action (add | remove | list) is required");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Fetch current preferences
  const { data: existing } = await supabase
    .from("agent_preferences")
    .select("id, custom_rules")
    .eq("user_id", input.userId)
    .eq("agent_id", AGENT_ID)
    .single();

  const currentRules: string[] = (existing?.custom_rules as string[]) || [];

  if (input.action === "list") {
    console.log(JSON.stringify({ success: true, rules: currentRules }));
    return;
  }

  if (input.action === "add") {
    if (!input.rule) {
      console.error("Error: rule is required for add action");
      process.exit(1);
    }

    // Avoid duplicates
    if (currentRules.includes(input.rule)) {
      console.log(
        JSON.stringify({
          success: true,
          rules: currentRules,
          message: "Rule already exists",
        })
      );
      return;
    }

    const updatedRules = [...currentRules, input.rule];

    if (existing) {
      const { error } = await supabase
        .from("agent_preferences")
        .update({ custom_rules: updatedRules, updated_at: new Date().toISOString() })
        .eq("id", existing.id);

      if (error) {
        console.error("Error updating preferences:", error);
        process.exit(1);
      }
    } else {
      const { error } = await supabase.from("agent_preferences").insert({
        user_id: input.userId,
        agent_id: AGENT_ID,
        custom_rules: updatedRules,
      });

      if (error) {
        console.error("Error creating preferences:", error);
        process.exit(1);
      }
    }

    console.log(JSON.stringify({ success: true, rules: updatedRules }));
    return;
  }

  if (input.action === "remove") {
    if (!input.rule) {
      console.error("Error: rule is required for remove action");
      process.exit(1);
    }

    const updatedRules = currentRules.filter(
      (r) => r.toLowerCase() !== input.rule!.toLowerCase()
    );

    if (existing) {
      const { error } = await supabase
        .from("agent_preferences")
        .update({ custom_rules: updatedRules, updated_at: new Date().toISOString() })
        .eq("id", existing.id);

      if (error) {
        console.error("Error updating preferences:", error);
        process.exit(1);
      }
    }

    console.log(JSON.stringify({ success: true, rules: updatedRules }));
    return;
  }

  console.error("Error: Unknown action. Use add, remove, or list.");
  process.exit(1);
}

main().catch((err) => {
  console.error("Save preferences error:", err);
  process.exit(1);
});
