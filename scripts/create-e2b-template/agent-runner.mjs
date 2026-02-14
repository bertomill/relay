/**
 * agent-runner.mjs — Generic runner that lives inside the Vercel Sandbox snapshot.
 *
 * Reads config.json for message, options, and API key,
 * calls query() from the Agent SDK, and writes SSE events to stdout.
 *
 * The API route streams this stdout back to the browser.
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync, existsSync } from "fs";

// Try multiple paths for config
const configPaths = ["config.json", "/home/user/config.json", "/vercel/sandbox/config.json"];
let configPath = configPaths.find((p) => existsSync(p));

if (!configPath) {
  process.stderr.write(`Config not found. Tried: ${configPaths.join(", ")}\n`);
  process.stderr.write(`CWD: ${process.cwd()}\n`);
  process.exit(1);
}

const config = JSON.parse(readFileSync(configPath, "utf-8"));
const { message, options, apiKey } = config;

// Set API key in env so the SDK can find it
if (apiKey) {
  process.env.ANTHROPIC_API_KEY = apiKey;
}

function sendEvent(data) {
  process.stdout.write(`data: ${JSON.stringify(data)}\n\n`);
}

async function run() {
  const rawMessages = [];
  // Track processed assistant message IDs to avoid sending duplicate content.
  // The SDK may yield the same assistant message more than once (e.g. streaming
  // partial then complete, or echoing it in a result event).
  const processedAssistantIds = new Set();

  // Content-level dedup: track lines already sent to the client.
  // After tool calls, the LLM often repeats content from previous turns.
  // We skip lines (>40 chars) that we've already emitted.
  const sentLines = new Set();

  // When we emit an AskUserQuestion event, we should stop processing further
  // messages. The sandbox SDK auto-completes the tool call, which causes the
  // agent to generate a duplicate response. The real user interaction happens
  // in the frontend UI — the user's answer triggers a fresh sandbox invocation.
  let sentAskUserQuestion = false;

  try {
    process.stderr.write(`[runner] Starting query with message: ${message.slice(0, 100)}...\n`);
    process.stderr.write(`[runner] Options keys: ${Object.keys(options).join(", ")}\n`);

    for await (const msg of query({ prompt: message, options })) {
      rawMessages.push(msg);

      // Once we've sent an AskUserQuestion to the frontend, ignore everything
      // else the agent produces — it's just the post-tool-result duplicate.
      if (sentAskUserQuestion) {
        continue;
      }

      // Session init
      if (msg.type === "system" && msg.subtype === "init" && msg.session_id) {
        sendEvent({ type: "session", sessionId: msg.session_id });
      }

      // Assistant messages with content blocks
      if (msg.type === "assistant" && msg.message?.content) {
        // Deduplicate: skip if we already processed this assistant message
        const msgId = msg.message?.id;
        if (msgId && processedAssistantIds.has(msgId)) {
          sendEvent({ type: "raw", rawMessage: msg });
          continue;
        }
        if (msgId) processedAssistantIds.add(msgId);

        for (const block of msg.message.content) {
          if (block.type === "text") {
            // Line-level dedup: filter out lines the LLM repeated from earlier turns
            const lines = block.text.split("\n");
            const novelLines = [];
            for (const line of lines) {
              const trimmed = line.trim();
              // Only dedup substantial lines (>40 chars) to avoid false positives
              // on short lines like "---", blank lines, or common phrases
              if (trimmed.length > 40 && sentLines.has(trimmed)) {
                process.stderr.write(`[runner] Skipping duplicate line: ${trimmed.slice(0, 60)}...\n`);
                continue;
              }
              if (trimmed.length > 40) {
                sentLines.add(trimmed);
              }
              novelLines.push(line);
            }
            const novelText = novelLines.join("\n");
            // Only send if there's meaningful content left after dedup
            if (novelText.replace(/\s+/g, "").length > 0) {
              sendEvent({ type: "text", text: novelText, rawMessage: msg });
            }
          } else if (
            block.type === "tool_use" &&
            block.name === "AskUserQuestion"
          ) {
            sendEvent({
              type: "ask_user_question",
              toolUseId: block.id,
              questions: block.input?.questions || [],
              rawMessage: msg,
            });
            sentAskUserQuestion = true;
            break; // Stop processing content blocks in this message
          } else if (block.type === "tool_use" && block.name === "Task") {
            sendEvent({
              type: "subagent_start",
              agentType: block.input?.subagent_type || "unknown",
              description: block.input?.description || "Working...",
              rawMessage: msg,
            });
          } else if (block.type === "tool_use") {
            let status = "";
            switch (block.name) {
              case "Skill":
                status = "Loading guidelines…";
                break;
              case "WebSearch":
                status = block.input?.query
                  ? `Searching "${block.input.query}"`
                  : "Searching the web…";
                break;
              case "WebFetch":
                try {
                  const host = new URL(block.input?.url || "").hostname.replace(/^www\./, "");
                  status = `Reading ${host}`;
                } catch {
                  status = "Reading page…";
                }
                break;
              case "Bash":
                status = block.input?.description || "Running command…";
                break;
              case "Read":
                status = "Reading file…";
                break;
              case "Glob":
                status = "Finding files…";
                break;
              case "Grep":
                status = "Searching code…";
                break;
              case "Write":
                status = "Writing file…";
                // Detect writes to the draft document and emit document_update
                const targetPath = block.input?.file_path || "";
                if (targetPath.endsWith("draft.md")) {
                  sendEvent({
                    type: "document_update",
                    content: block.input?.content || "",
                  });
                }
                break;
              default:
                status = `Using ${block.name}…`;
                break;
            }
            if (status) {
              sendEvent({ type: "thinking_step", step: status });
              sendEvent({ type: "status", status });
            }
          }
        }
      } else {
        if (msg.type === "result") {
          sendEvent({ type: "status", status: "Thinking..." });
        }
        sendEvent({ type: "raw", rawMessage: msg });
      }
    }

    process.stderr.write(`[runner] Query complete. ${rawMessages.length} messages.\n`);
    sendEvent({ type: "complete", allRawMessages: rawMessages });
    process.stdout.write("data: [DONE]\n\n");
  } catch (error) {
    process.stderr.write(`[runner] Error: ${error}\n`);
    sendEvent({
      type: "error",
      error: "An error occurred",
      rawError: String(error),
    });
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    process.stderr.write(`[runner] Fatal: ${err}\n`);
    process.exit(1);
  });
