/**
 * agent-runner.mjs — Generic runner that lives inside the Vercel Sandbox snapshot.
 *
 * Reads config.json for message, options, and API key,
 * calls query() from the Agent SDK, and writes SSE events to stdout.
 *
 * The API route streams this stdout back to the browser.
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { readFileSync, existsSync, watch } from "fs";

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

// Track whether we've sent a document_update so we can use a fallback if not
let sentDocumentUpdate = false;

// Watch for draft.md changes as a fallback (handles Bash writes, Edit tool, etc.)
const DRAFT_PATH = "/home/user/draft.md";
let draftWatcher = null;
try {
  // Watch the directory since the file may not exist yet
  draftWatcher = watch("/home/user", (eventType, filename) => {
    if (filename === "draft.md" && existsSync(DRAFT_PATH)) {
      try {
        const content = readFileSync(DRAFT_PATH, "utf-8");
        if (content.trim()) {
          sendEvent({ type: "document_update", content });
          sentDocumentUpdate = true;
        }
      } catch {
        // Ignore read errors during writes
      }
    }
  });
} catch {
  // Watcher setup may fail in some environments
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

  // --- Streaming state ---
  // When includePartialMessages is enabled, the SDK yields stream_event
  // messages with token-level deltas. We track whether we're inside a tool
  // call so we can suppress text echoes while a tool runs.
  let inToolBlock = false;
  let currentToolName = "";
  let inThinkingBlock = false;
  // Track content block indices that were streamed so we skip their text
  // when the full assistant message arrives.
  const streamedTextBlockIndices = new Set();
  // Track which tool_use content blocks have been streamed (by block index)
  const streamedToolBlockIndices = new Set();

  try {
    process.stderr.write(`[runner] Starting query with message: ${message.slice(0, 100)}...\n`);
    process.stderr.write(`[runner] Options keys: ${Object.keys(options).join(", ")}\n`);

    // Enable streaming for real-time token delivery
    const queryOptions = { ...options, includePartialMessages: true };

    for await (const msg of query({ prompt: message, options: queryOptions })) {
      rawMessages.push(msg);

      // Once we've sent an AskUserQuestion to the frontend, ignore everything
      // else the agent produces — it's just the post-tool-result duplicate.
      if (sentAskUserQuestion) {
        continue;
      }

      // --- Handle streaming events (token-by-token) ---
      if (msg.type === "stream_event") {
        const event = msg.event;

        if (event.type === "content_block_start") {
          if (event.content_block?.type === "thinking") {
            inThinkingBlock = true;
            sendEvent({ type: "thinking_start" });
          } else if (event.content_block?.type === "tool_use") {
            inToolBlock = true;
            currentToolName = event.content_block.name || "";
            streamedToolBlockIndices.add(event.index);

            // Emit a status indicator for tool start
            if (currentToolName === "AskUserQuestion") {
              // AskUserQuestion will be handled when the full message arrives
            } else if (currentToolName === "Task") {
              // Subagent — handled on full message
            } else {
              let status = `Using ${currentToolName}…`;
              switch (currentToolName) {
                case "Skill": status = "Loading guidelines…"; break;
                case "WebSearch": status = "Searching the web…"; break;
                case "WebFetch": status = "Reading page…"; break;
                case "Bash": status = "Running command…"; break;
                case "Read": status = "Reading file…"; break;
                case "Glob": status = "Finding files…"; break;
                case "Grep": status = "Searching code…"; break;
                case "Write": status = "Writing file…"; break;
                case "Edit": status = "Editing file…"; break;
              }
              sendEvent({ type: "thinking_step", step: status });
              sendEvent({ type: "status", status });
            }
          } else if (event.content_block?.type === "text") {
            streamedTextBlockIndices.add(event.index);
          }
        } else if (event.type === "content_block_delta") {
          if (event.delta?.type === "thinking_delta" && event.delta.thinking) {
            sendEvent({ type: "thinking", text: event.delta.thinking });
          } else if (event.delta?.type === "text_delta" && !inToolBlock) {
            const text = event.delta.text;
            if (text) {
              sendEvent({ type: "text", text });
              // Track lines for dedup against full-message processing
              for (const line of text.split("\n")) {
                const trimmed = line.trim();
                if (trimmed.length > 40) sentLines.add(trimmed);
              }
            }
          }
          // Tool input deltas — we could parse these for more granular status
          // (e.g. extracting WebSearch query), but the full message handles it.
        } else if (event.type === "content_block_stop") {
          if (inThinkingBlock) {
            inThinkingBlock = false;
            sendEvent({ type: "thinking_end" });
          }
          if (inToolBlock) {
            inToolBlock = false;
            currentToolName = "";
          }
        }
        continue; // Don't process stream_event as a regular message
      }

      // Session init
      if (msg.type === "system" && msg.subtype === "init" && msg.session_id) {
        sendEvent({ type: "session", sessionId: msg.session_id });
      }

      // Assistant messages with content blocks
      if (msg.type === "assistant" && msg.message?.content) {
        const msgId = msg.message?.id;
        const isRepeat = msgId && processedAssistantIds.has(msgId);
        if (msgId) processedAssistantIds.add(msgId);

        for (let blockIdx = 0; blockIdx < msg.message.content.length; blockIdx++) {
          const block = msg.message.content[blockIdx];

          // For repeat messages, only process tool_use blocks we haven't seen
          if (isRepeat && block.type === "text") {
            continue; // Skip duplicate text — already sent
          }
          if (block.type === "tool_use" && block.id && processedAssistantIds.has(`tool:${block.id}`)) {
            continue; // Skip duplicate tool_use
          }
          if (block.type === "tool_use" && block.id) {
            processedAssistantIds.add(`tool:${block.id}`);
          }

          // Skip text blocks that were already streamed token-by-token
          if (block.type === "text" && streamedTextBlockIndices.has(blockIdx)) {
            continue;
          }

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
            // Only emit status for tools that weren't already streamed
            if (streamedToolBlockIndices.has(blockIdx)) {
              // Still need to handle Write → document_update detection
              if (block.name === "Write") {
                const writeTargetPath = block.input?.file_path || "";
                if (writeTargetPath.endsWith("draft.md")) {
                  sendEvent({ type: "document_update", content: block.input?.content || "" });
                  sentDocumentUpdate = true;
                }
              }
              continue;
            }
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
                const writeTargetPath = block.input?.file_path || "";
                if (writeTargetPath.endsWith("draft.md")) {
                  sendEvent({
                    type: "document_update",
                    content: block.input?.content || "",
                  });
                  sentDocumentUpdate = true;
                }
                break;
              case "Edit":
                status = "Editing file…";
                // Edit tool targets draft.md — we can't reconstruct full content
                // from old_string/new_string, but the fs watcher will catch the result
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

        // Reset streamed block indices after processing the full message,
        // since block indices reset per assistant message
        streamedTextBlockIndices.clear();
        streamedToolBlockIndices.clear();
      } else {
        if (msg.type === "result") {
          sendEvent({ type: "status", status: "Thinking..." });
        }
        sendEvent({ type: "raw", rawMessage: msg });
      }
    }

    // Final fallback: if no document_update was sent via tool detection,
    // check if draft.md exists on disk (agent may have used Bash or Edit)
    if (!sentDocumentUpdate && existsSync(DRAFT_PATH)) {
      try {
        const content = readFileSync(DRAFT_PATH, "utf-8");
        if (content.trim()) {
          process.stderr.write(`[runner] Sending fallback document_update from disk\n`);
          sendEvent({ type: "document_update", content });
        }
      } catch {
        // Ignore
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
  } finally {
    // Clean up file watcher
    if (draftWatcher) {
      try { draftWatcher.close(); } catch { /* ignore */ }
    }
  }
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    process.stderr.write(`[runner] Fatal: ${err}\n`);
    process.exit(1);
  });
