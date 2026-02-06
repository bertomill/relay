import { readFileSync } from "fs";
import { resolve } from "path";
import { query, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { SYSTEM_PROMPT } from "./prompt.js";
import { allTools } from "./tools.js";

// --- Inline .env loader ---
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env file not found — rely on existing env vars
  }
}

loadEnv();

// --- CLI arg parsing ---
const userPrompt = process.argv.slice(2).join(" ").trim();
if (!userPrompt) {
  console.error("Usage: npx tsx agents/lumen/index.ts \"<your prompt>\"");
  process.exit(1);
}

// --- MCP server with Lumen tools ---
const mcpServer = createSdkMcpServer({
  name: "lumen-tools",
  tools: allTools,
});

// --- Run the agent ---
async function main() {
  console.log(`\n🪶 Lumen — Lighten AI Content Strategist\n`);
  console.log(`Prompt: ${userPrompt}\n`);
  console.log("---\n");

  const stream = query({
    prompt: userPrompt,
    options: {
      systemPrompt: SYSTEM_PROMPT,
      tools: ["WebSearch"],
      mcpServers: { "lumen-tools": mcpServer },
      permissionMode: "bypassPermissions",
      allowDangerouslySkipPermissions: true,
      maxTurns: 20,
    },
  });

  for await (const message of stream) {
    if (message.type === "assistant") {
      for (const block of message.message.content) {
        if (block.type === "text") {
          process.stdout.write(block.text);
        }
      }
    } else if (message.type === "result") {
      if (message.subtype === "error") {
        console.error("\n\nError:", JSON.stringify(message, null, 2));
      }
    }
  }

  console.log("\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
