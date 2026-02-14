"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { StatefulButton } from "@/components/ui/stateful-button";

interface QuestionOption {
  label: string;
  description?: string;
}

interface Question {
  question: string;
  header: string;
  options: QuestionOption[];
  multiSelect: boolean;
}

interface PendingQuestion {
  toolUseId: string;
  questions: Question[];
}

interface SubagentStatus {
  agentType: string;
  description: string;
  isComplete: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  rawInput?: unknown;
  rawOutput?: unknown[];
  pendingQuestion?: PendingQuestion;
  subagentStatus?: SubagentStatus;
}

interface Session {
  id: string;
  preview: string;
  createdAt: Date;
  messages: Message[];
}

interface UploadedFile {
  name: string;
  mimeType: string;
  filePath: string;
  url?: string;
}

interface FileUploadConfig {
  accept: string;
  maxSizeMB: number;
  endpoint: string;
  imageEndpoint?: string;
}

interface AgentChatProps {
  agentId: string;
  apiEndpoint: string;
  storageKey: string;
  placeholder: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  loadingText: string;
  agentIcon: string;
  agentName: string;
  variant: "full" | "embedded";
  starterPrompts?: string[];
  fileUpload?: FileUploadConfig;
  initialPrompt?: string;
  connectedPlatforms?: string[];
  linkedInOrgId?: string | null;
  linkedInOrgName?: string | null;
  /** Ref to a DOM element where header controls (session ID, History, New, Online) will be portaled */
  headerPortalRef?: React.RefObject<HTMLDivElement | null>;
  /** When this value changes (non-empty), insert it into the textarea input */
  insertText?: string;
  /** Increment to re-trigger insertText even with the same value */
  insertTextKey?: number;
  /** Called when the agent writes to draft.md (document_update SSE event) */
  onDocumentUpdate?: (content: string) => void;
  /** Current document content to send with API requests */
  documentContent?: string;
}

export default function AgentChat({
  apiEndpoint,
  storageKey,
  placeholder,
  emptyStateTitle,
  emptyStateDescription,
  loadingText,
  agentIcon,
  agentName,
  variant,
  starterPrompts = [],
  fileUpload,
  initialPrompt,
  connectedPlatforms = [],
  linkedInOrgId,
  linkedInOrgName,
  headerPortalRef,
  insertText,
  insertTextKey,
  onDocumentUpdate,
  documentContent,
}: AgentChatProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRaw, setExpandedRaw] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showSessions, setShowSessions] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const loadingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectionPos, setSelectionPos] = useState<{ x: number; y: number } | null>(null);
  const [selectionQuery, setSelectionQuery] = useState("");
  const [postingState, setPostingState] = useState<Record<string, "idle" | "posting" | "posted" | "error">>({});
  const [sessionIdCopied, setSessionIdCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titledSessions = useRef<Set<string>>(new Set());
  const hasAutoSent = useRef(false);

  const isFull = variant === "full";
  const accent = "#6B8F71";

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      const restored = parsed.map((s: Session) => ({ ...s, createdAt: new Date(s.createdAt) }));
      setSessions(restored);
      // Mark all restored sessions as already titled
      restored.forEach((s: Session) => titledSessions.current.add(s.id));
      // Auto-resume the most recent session (skip if initialPrompt will auto-send)
      if (restored.length > 0 && messages.length === 0 && !sessionId && !initialPrompt) {
        const latest = restored[0];
        setSessionId(latest.id);
        setMessages(latest.messages);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Auto-send initialPrompt on mount (e.g. when opened from a platform card with context)
  useEffect(() => {
    if (initialPrompt && !hasAutoSent.current) {
      hasAutoSent.current = true;
      setInput(initialPrompt);
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  // Insert text into input when insertText/insertTextKey changes
  useEffect(() => {
    if (insertText && insertTextKey) {
      setInput(insertText);
      // Focus the textarea
      const textarea = formRef.current?.querySelector("textarea");
      if (textarea) {
        setTimeout(() => textarea.focus(), 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insertTextKey]);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(sessions));
    }
  }, [sessions, storageKey]);

  useEffect(() => {
    if (sessionId && messages.length > 0) {
      setSessions((prev) => {
        const existing = prev.find((s) => s.id === sessionId);
        if (existing) {
          return prev.map((s) =>
            s.id === sessionId ? { ...s, messages } : s
          );
        } else {
          const firstUserMsg = messages.find((m) => m.role === "user");
          return [
            {
              id: sessionId,
              preview: firstUserMsg?.content.slice(0, 50) || "New conversation",
              createdAt: new Date(),
              messages,
            },
            ...prev,
          ].slice(0, 20);
        }
      });
    }
  }, [sessionId, messages]);

  // Generate a title for the session after first exchange completes
  useEffect(() => {
    if (
      isLoading ||
      !sessionId ||
      messages.length < 2 ||
      titledSessions.current.has(sessionId)
    ) {
      return;
    }
    // Check that we have at least one user + one non-empty assistant message
    const hasAssistantContent = messages.some(
      (m) => m.role === "assistant" && m.content.length > 0
    );
    if (!hasAssistantContent) return;

    titledSessions.current.add(sessionId);

    const summaryMessages = messages
      .filter((m) => m.content)
      .slice(0, 3)
      .map((m) => ({ role: m.role, content: m.content }));

    fetch("/api/summarize-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: summaryMessages }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.title) {
          setSessions((prev) =>
            prev.map((s) =>
              s.id === sessionId ? { ...s, preview: data.title } : s
            )
          );
        }
      })
      .catch(() => {
        // Silent fail — keep the existing preview
      });
  }, [isLoading, sessionId, messages]);

  // Elapsed time tracker for long-running operations
  useEffect(() => {
    if (isLoading) {
      setElapsedSeconds(0);
      loadingTimerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (loadingTimerRef.current) {
        clearInterval(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
      setElapsedSeconds(0);
    }
    return () => {
      if (loadingTimerRef.current) clearInterval(loadingTimerRef.current);
    };
  }, [isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
    setExpandedRaw(null);
    setShowSessions(false);
  };

  const handleResumeSession = (session: Session) => {
    setSessionId(session.id);
    setMessages(session.messages);
    setExpandedRaw(null);
    setShowSessions(false);
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionToDelete: Session) => {
    e.stopPropagation();
    setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete.id));
    if (sessionId === sessionToDelete.id) {
      handleNewChat();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!fileUpload || !e.target.files?.length) return;
    const file = e.target.files[0];

    if (file.size > fileUpload.maxSizeMB * 1024 * 1024) {
      alert(`File too large. Max size: ${fileUpload.maxSizeMB}MB`);
      return;
    }

    const isImage = file.type.startsWith("image/");
    const useImageEndpoint = isImage && fileUpload.imageEndpoint;
    const endpoint = useImageEndpoint ? fileUpload.imageEndpoint! : fileUpload.endpoint;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadedFiles((prev) => [
          ...prev,
          {
            name: data.fileName,
            mimeType: data.mimeType,
            filePath: data.filePath || "",
            url: data.url,
          },
        ]);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isUploading) return;

    let userMessage = input.trim();

    // Prepend uploaded file info
    if (uploadedFiles.length > 0) {
      const fileLines = uploadedFiles
        .map((f) => {
          if (f.url) {
            return `[Uploaded image: ${f.url}]`;
          }
          return `[Uploaded: ${f.name} (${f.mimeType}) at ${f.filePath}]`;
        })
        .join("\n");
      userMessage = fileLines + "\n\n" + userMessage;
      setUploadedFiles([]);
    }

    setInput("");
    const textarea = formRef.current?.querySelector("textarea");
    if (textarea) textarea.style.height = "auto";
    setIsLoading(true);
    setThinkingSteps([]);

    setMessages((prev) => [...prev, {
      role: "user",
      content: userMessage,
      rawInput: { message: userMessage, sessionId }
    }]);

    setMessages((prev) => [...prev, {
      role: "assistant",
      content: "",
      rawOutput: []
    }]);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
          // Send conversation history for multi-turn continuity (sandboxes are ephemeral)
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          // Include current document content so the agent can see user edits
          ...(documentContent ? { documentContent } : {}),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      // SSE buffer to handle events that span TCP chunk boundaries
      let sseBuffer = "";
      // Stop appending text once we receive an AskUserQuestion (the agent
      // may continue generating duplicate content after the sandbox auto-
      // completes the tool call)
      let receivedQuestion = false;
      // Track accumulated content to detect near-duplicate text blocks.
      // The SDK may yield a second assistant message with very similar (but not
      // identical) text — e.g. stripped markdown or slight rewording.
      let accumulatedContent = "";
      // Track whether a non-text event (status, tool use, etc.) occurred
      // since the last text chunk — used to insert paragraph breaks between
      // separate text blocks from the agent.
      let hadNonTextEvent = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Append to buffer; split on double-newline (SSE event boundary)
        sseBuffer += decoder.decode(value, { stream: true });
        const parts = sseBuffer.split("\n\n");
        sseBuffer = parts.pop() || ""; // last part may be incomplete

        for (const part of parts) {
          for (const line of part.split("\n")) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);

              if (parsed.type === "session" && parsed.sessionId) {
                setSessionId(parsed.sessionId);
              }

              if (parsed.type === "status" && parsed.status) {
                setStatusText(parsed.status);
                hadNonTextEvent = true;
              }

              if (parsed.type === "thinking_step" && parsed.step) {
                setThinkingSteps((prev) => {
                  // Avoid duplicate consecutive steps
                  if (prev.length > 0 && prev[prev.length - 1] === parsed.step) return prev;
                  return [...prev, parsed.step];
                });
              }

              if (parsed.type === "text" && parsed.text) {
                // Skip text after we've received an interactive question
                if (receivedQuestion) continue;

                // Near-duplicate detection: if the beginning of this text
                // chunk already appears in the content we've accumulated so
                // far, this is the agent repeating itself (common after the
                // sandbox auto-completes a tool call).
                const trimmed = parsed.text.trim();
                if (trimmed.length > 50 && accumulatedContent.length > 50) {
                  const probe = trimmed.slice(0, 80);
                  if (accumulatedContent.includes(probe)) continue;
                }

                // If a non-text event occurred since the last text chunk,
                // this is a new text block — prepend a paragraph break.
                const separator = hadNonTextEvent && accumulatedContent.length > 0 ? "\n\n" : "";
                hadNonTextEvent = false;

                const newText = separator + parsed.text;
                accumulatedContent += newText;
                setStatusText(null);
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastIdx = newMessages.length - 1;
                  const lastMessage = newMessages[lastIdx];
                  if (lastMessage.role === "assistant") {
                    newMessages[lastIdx] = {
                      ...lastMessage,
                      content: lastMessage.content + newText,
                      rawOutput: parsed.rawMessage
                        ? [...(lastMessage.rawOutput || []), parsed.rawMessage]
                        : lastMessage.rawOutput,
                    };
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "input") {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const userIdx = newMessages.length - 2;
                  const userMsg = newMessages[userIdx];
                  if (userMsg?.role === "user") {
                    newMessages[userIdx] = { ...userMsg, rawInput: parsed.rawInput };
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "raw" && parsed.rawMessage) {
                hadNonTextEvent = true;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastIdx = newMessages.length - 1;
                  const lastMessage = newMessages[lastIdx];
                  if (lastMessage.role === "assistant") {
                    newMessages[lastIdx] = {
                      ...lastMessage,
                      rawOutput: [...(lastMessage.rawOutput || []), parsed.rawMessage],
                    };
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "complete" && parsed.allRawMessages) {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastIdx = newMessages.length - 1;
                  const lastMessage = newMessages[lastIdx];
                  if (lastMessage.role === "assistant") {
                    newMessages[lastIdx] = {
                      ...lastMessage,
                      rawOutput: parsed.allRawMessages,
                    };
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "ask_user_question") {
                receivedQuestion = true;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastIdx = newMessages.length - 1;
                  const lastMessage = newMessages[lastIdx];
                  if (lastMessage.role === "assistant") {
                    newMessages[lastIdx] = {
                      ...lastMessage,
                      pendingQuestion: {
                        toolUseId: parsed.toolUseId,
                        questions: parsed.questions,
                      },
                    };
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "subagent_start") {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastIdx = newMessages.length - 1;
                  const lastMessage = newMessages[lastIdx];
                  if (lastMessage.role === "assistant") {
                    newMessages[lastIdx] = {
                      ...lastMessage,
                      subagentStatus: {
                        agentType: parsed.agentType,
                        description: parsed.description,
                        isComplete: false,
                      },
                    };
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "document_update" && parsed.content != null) {
                onDocumentUpdate?.(parsed.content);
              }

              if (parsed.type === "error") {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastIdx = newMessages.length - 1;
                  const lastMessage = newMessages[lastIdx];
                  if (lastMessage.role === "assistant") {
                    newMessages[lastIdx] = {
                      ...lastMessage,
                      content: "Sorry, an error occurred. Please try again.",
                      rawOutput: [{ error: parsed.error, rawError: parsed.rawError }],
                    };
                  }
                  return newMessages;
                });
              }
            } catch {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIdx = newMessages.length - 1;
        const lastMessage = newMessages[lastIdx];
        if (lastMessage.role === "assistant") {
          newMessages[lastIdx] = {
            ...lastMessage,
            content: "Sorry, I couldn't connect to the server. Please try again.",
            rawOutput: [{ error: String(error) }],
          };
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      setStatusText(null);
      setThinkingSteps([]);
    }
  };

  const toggleRaw = (index: number) => {
    setExpandedRaw(expandedRaw === index ? null : index);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleSelectOption = (messageIndex: number, questionIndex: number, optionLabel: string) => {
    setSelectedAnswers((prev) => {
      const key = messageIndex * 100 + questionIndex;
      const current = prev[key] || [];
      const question = messages[messageIndex]?.pendingQuestion?.questions[questionIndex];

      if (question?.multiSelect) {
        if (current.includes(optionLabel)) {
          return { ...prev, [key]: current.filter((l) => l !== optionLabel) };
        } else {
          return { ...prev, [key]: [...current, optionLabel] };
        }
      } else {
        return { ...prev, [key]: [optionLabel] };
      }
    });
  };

  const handleSubmitAnswers = async (messageIndex: number) => {
    const message = messages[messageIndex];
    if (!message?.pendingQuestion) return;

    const answers: Record<string, string> = {};
    message.pendingQuestion.questions.forEach((q, qIdx) => {
      const key = messageIndex * 100 + qIdx;
      const selected = selectedAnswers[key] || [];
      answers[q.header] = selected.join(", ");
    });

    const answerText = Object.entries(answers)
      .map(([header, value]) => `${header}: ${value}`)
      .join("\n");

    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages[messageIndex]) {
        newMessages[messageIndex] = { ...newMessages[messageIndex], pendingQuestion: undefined };
      }
      return newMessages;
    });

    setSelectedAnswers({});

    setInput(answerText);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }
    }, 0);
  };

  const handleStarterPrompt = (prompt: string) => {
    setInput(prompt);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }
    }, 0);
  };

  const clearSelection = useCallback(() => {
    setSelectedText("");
    setSelectionPos(null);
    setSelectionQuery("");
  }, []);

  const handleTextSelect = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || "";
    if (!text || text.length < 3) {
      clearSelection();
      return;
    }

    const range = selection?.getRangeAt(0);
    if (!range || !chatAreaRef.current) return;

    // Only trigger on assistant message content
    const bubble = range.startContainer.parentElement?.closest("[data-assistant-content]");
    if (!bubble) {
      clearSelection();
      return;
    }

    const rect = range.getBoundingClientRect();
    const containerRect = chatAreaRef.current.getBoundingClientRect();

    setSelectedText(text);
    setSelectionPos({
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + chatAreaRef.current.scrollTop - 8,
    });
    setSelectionQuery("");
  }, [clearSelection]);

  // Dismiss popover on click outside
  useEffect(() => {
    if (!selectionPos) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        clearSelection();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectionPos, clearSelection]);

  // Dismiss popover on scroll
  useEffect(() => {
    if (!selectionPos || !chatAreaRef.current) return;
    const el = chatAreaRef.current;
    const handleScroll = () => clearSelection();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [selectionPos, clearSelection]);

  // Dismiss popover on new messages
  useEffect(() => {
    clearSelection();
  }, [messages.length, clearSelection]);

  const handleAskAboutSelection = (customQuestion?: string) => {
    const truncated = selectedText.length > 300 ? selectedText.slice(0, 300) + "..." : selectedText;
    const prompt = customQuestion
      ? `Regarding this section:\n> ${truncated}\n\n${customQuestion}`
      : `Regarding this section:\n> ${truncated}\n\nCan you explain this further?`;
    clearSelection();
    handleStarterPrompt(prompt);
  };

  const handlePostToSocial = async (messageIndex: number, platform: string, asOrganization?: boolean) => {
    const message = messages[messageIndex];
    if (!message?.content) return;

    const key = `${messageIndex}-${platform}${asOrganization ? "-org" : ""}`;
    setPostingState((prev) => ({ ...prev, [key]: "posting" }));

    // Strip markdown for posting
    const plainText = message.content
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/^\s*[-*]\s+/gm, "- ")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .replace(/^---+$/gm, "")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    try {
      const res = await fetch("/api/social/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, text: plainText, asOrganization }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`Post to ${platform} failed:`, data);
        if (data.error === "TOKEN_EXPIRED") {
          alert(data.message || `Please reconnect your ${platform === "x" ? "X" : "LinkedIn"} account.`);
        } else {
          alert(`Post failed: ${data.error || data.details || "Unknown error"}`);
        }
        setPostingState((prev) => ({ ...prev, [key]: "error" }));
        return;
      }

      setPostingState((prev) => ({ ...prev, [key]: "posted" }));
    } catch {
      setPostingState((prev) => ({ ...prev, [key]: "error" }));
    }
  };

  // Header controls (session ID, History, New, Online) — rendered inline or portaled
  const headerControls = isFull ? (
    <div className="flex items-center gap-3">
      {sessionId && (
        <button
          onClick={() => {
            navigator.clipboard.writeText(sessionId);
            setSessionIdCopied(true);
            setTimeout(() => setSessionIdCopied(false), 2000);
          }}
          className="group/sid relative text-xs font-mono bg-[#F5F4F0] px-2 py-1 rounded border border-[#E8E6E1] hover:border-[#6B8F71]/50 hover:bg-[#6B8F71]/5 transition-all cursor-pointer"
          title="Click to copy session ID"
        >
          {sessionIdCopied ? (
            <span className="text-[#6B8F71] flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="text-[#888] group-hover/sid:text-[#6B8F71] transition-colors">
              <span className="group-hover/sid:hidden">{sessionId.slice(0, 8)}...</span>
              <span className="hidden group-hover/sid:inline">{sessionId}</span>
            </span>
          )}
        </button>
      )}

      {/* Sessions dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSessions(!showSessions)}
          className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#6B8F71] transition-colors bg-white px-3 py-1.5 rounded-lg border border-[#E8E6E1] hover:border-[#6B8F71]/50"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History
          {sessions.length > 0 && (
            <span className="bg-[#6B8F71]/10 text-[#6B8F71] px-1.5 py-0.5 rounded text-[10px] font-medium">
              {sessions.length}
            </span>
          )}
        </button>

        {showSessions && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowSessions(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#E8E6E1] rounded-xl shadow-lg z-20 overflow-hidden">
              <div className="p-3 border-b border-[#E8E6E1] flex items-center justify-between">
                <span className="text-xs font-medium text-[#888]">Recent Sessions</span>
                <button
                  onClick={handleNewChat}
                  className="text-xs text-[#6B8F71] hover:underline"
                >
                  + New Chat
                </button>
              </div>
              {sessions.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#999]">
                  No previous sessions
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleResumeSession(session)}
                      className={`w-full px-3 py-2.5 text-left hover:bg-[#FAFAF8] transition-colors flex items-start gap-3 group ${
                        sessionId === session.id ? "bg-[#FAFAF8]" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1C1C1C] truncate">
                          {session.preview}
                          {session.preview.length >= 50 && "..."}
                        </p>
                        <p className="text-xs text-[#999] mt-0.5">
                          {formatTimeAgo(new Date(session.createdAt))} · {session.messages.length} messages
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteSession(e, session)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-[#999] hover:text-red-500 transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleNewChat}
        className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#6B8F71] transition-colors bg-white px-3 py-1.5 rounded-lg border border-[#E8E6E1] hover:border-[#6B8F71]/50"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        New
      </button>

      <span className="flex items-center gap-1.5 text-xs text-[#888] bg-white px-3 py-1.5 rounded-full border border-[#E8E6E1]">
        <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
        {isLoading ? (statusText || loadingText) : "Online"}
      </span>
    </div>
  ) : null;

  return (
    <div className={`flex flex-col ${isFull ? `flex-1 min-h-0 ${headerPortalRef ? "pt-4 pb-8" : "py-8"}` : "h-full"}`}>
      {/* Portal header controls to external container if ref provided */}
      {headerControls && headerPortalRef?.current && createPortal(headerControls, headerPortalRef.current)}

      {/* Agent info bar (full variant only, hidden when portaled) */}
      {isFull && !headerPortalRef && (
        <div className="mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#6B8F71]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={agentIcon} />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1C]">{agentName}</h1>
            <p className="text-sm text-[#888]">{emptyStateDescription.split(".")[0]}</p>
          </div>
          {headerControls}
        </div>
      )}

      {/* Chat area */}
      <div className={`flex flex-col overflow-hidden ${isFull ? "flex-1 min-h-0" : "h-full"}`}>
        {/* Compact session bar (embedded variant) */}
        {!isFull && (messages.length > 0 || sessions.length > 0) && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#E8E6E1] bg-[#FAFAF8]">
            <div className="flex items-center gap-2">
              {sessionId && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sessionId);
                    setSessionIdCopied(true);
                    setTimeout(() => setSessionIdCopied(false), 2000);
                  }}
                  className="group/sid text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E8E6E1] hover:border-[#6B8F71]/50 hover:bg-[#6B8F71]/5 transition-all cursor-pointer"
                  title="Click to copy session ID"
                >
                  {sessionIdCopied ? (
                    <span className="text-[#6B8F71]">Copied!</span>
                  ) : (
                    <span className="text-[#888] group-hover/sid:text-[#6B8F71] transition-colors">
                      <span className="group-hover/sid:hidden">{sessionId.slice(0, 8)}</span>
                      <span className="hidden group-hover/sid:inline">{sessionId}</span>
                    </span>
                  )}
                </button>
              )}
              {isLoading && (
                <span className="flex items-center gap-1 text-[10px] text-[#6B8F71]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B8F71] animate-pulse" />
                  {statusText || loadingText}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {/* History dropdown */}
              {sessions.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowSessions(!showSessions)}
                    className="flex items-center gap-1 text-[10px] text-[#999] hover:text-[#6B8F71] px-2 py-1 rounded-lg hover:bg-[#F5F4F0] transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    History ({sessions.length})
                  </button>
                  {showSessions && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowSessions(false)} />
                      <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-[#E8E6E1] rounded-xl shadow-lg z-20 overflow-hidden">
                        <div className="max-h-48 overflow-y-auto">
                          {sessions.map((session) => (
                            <button
                              key={session.id}
                              onClick={() => handleResumeSession(session)}
                              className={`w-full px-3 py-2 text-left hover:bg-[#FAFAF8] transition-colors flex items-start gap-2 group ${
                                sessionId === session.id ? "bg-[#FAFAF8]" : ""
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-[#1C1C1C] truncate">{session.preview}</p>
                                <p className="text-[10px] text-[#999] mt-0.5">
                                  {formatTimeAgo(new Date(session.createdAt))} · {session.messages.length} msgs
                                </p>
                              </div>
                              <button
                                onClick={(e) => handleDeleteSession(e, session)}
                                className="opacity-0 group-hover:opacity-100 p-0.5 text-[#999] hover:text-red-500 transition-all"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              <button
                onClick={handleNewChat}
                className="flex items-center gap-1 text-[10px] text-[#999] hover:text-[#6B8F71] px-2 py-1 rounded-lg hover:bg-[#F5F4F0] transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New
              </button>
            </div>
          </div>
        )}
        {/* Messages */}
        <div ref={chatAreaRef} onMouseUp={handleTextSelect} className="flex-1 p-6 overflow-y-auto space-y-4 relative">
          {messages.length === 0 ? (
            <div className={`h-full flex flex-col items-center justify-center text-center ${isFull ? "py-12" : "py-6"}`}>
              {isFull && (
                <div className="w-16 h-16 rounded-2xl bg-[#6B8F71]/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={agentIcon} />
                  </svg>
                </div>
              )}
              <h3 className={`font-semibold mb-2 text-[#1C1C1C] ${isFull ? "text-lg" : "text-base"}`}>
                {emptyStateTitle}
              </h3>
              <p className={`max-w-sm text-[#666] ${isFull ? "text-sm mb-4" : "text-xs mb-4"}`}>
                {emptyStateDescription}
              </p>
              {starterPrompts.length > 0 && (
                <div className={`flex flex-wrap justify-center gap-2 ${isFull ? "max-w-lg" : "max-w-md"}`}>
                  {starterPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleStarterPrompt(prompt)}
                      className="text-xs px-3 py-2 rounded-lg border border-[#E8E6E1] text-[#666] hover:border-[#6B8F71]/50 hover:text-[#6B8F71] hover:bg-[#6B8F71]/5 transition-all text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              {isFull && sessions.length > 0 && (
                <button
                  onClick={() => setShowSessions(true)}
                  className="text-xs text-[#6B8F71] hover:underline mt-4"
                >
                  Or resume a previous session →
                </button>
              )}
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex flex-col gap-1 max-w-[80%]">
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-[#6B8F71] text-white"
                            : "bg-[#F5F4F0] text-[#1C1C1C]"
                        }`}
                      >
                        {message.content ? (
                          message.role === "assistant" ? (
                            <div data-assistant-content className="text-sm prose prose-sm max-w-none prose-headings:text-[#1C1C1C] prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2 prose-p:text-[#444] prose-p:my-1.5 prose-p:leading-relaxed prose-a:text-[#6B8F71] prose-strong:text-[#1C1C1C] prose-li:text-[#444] prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 prose-hr:border-[#E8E6E1] prose-hr:my-4 prose-code:text-[#6B8F71] prose-code:bg-[#6B8F71]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none prose-pre:bg-white prose-pre:border prose-pre:border-[#E8E6E1] prose-pre:rounded-lg prose-blockquote:border-[#6B8F71] prose-blockquote:text-[#555]">
                              <ReactMarkdown
                                components={{
                                  p: ({ node, children, ...props }) => {
                                    // If paragraph contains an image, render as div to avoid
                                    // invalid <figure> inside <p> HTML nesting
                                    const hasImage = node?.children?.some(
                                      (child) => "tagName" in child && child.tagName === "img"
                                    );
                                    if (hasImage) {
                                      return <div {...props}>{children}</div>;
                                    }
                                    return <p {...props}>{children}</p>;
                                  },
                                  img: ({ src, alt }) => {
                                    const imgSrc = typeof src === "string" ? src : "";
                                    return (
                                      <figure className="my-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                          src={imgSrc}
                                          alt={alt || "Generated image"}
                                          className="w-full rounded-xl border border-[#E8E6E1] shadow-sm"
                                        />
                                        <figcaption className="flex items-center gap-2 mt-2">
                                          {alt && <span className="text-xs text-[#888]">{alt}</span>}
                                          <a
                                            href={imgSrc}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-xs text-[#6B8F71] hover:text-[#5A7D60] transition-colors ml-auto"
                                          >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                            Download
                                          </a>
                                        </figcaption>
                                      </figure>
                                    );
                                  },
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          )
                        ) : (
                          message.role === "assistant" && isLoading ? (
                            <div className="space-y-1.5 py-0.5">
                              {thinkingSteps.length > 0 ? (
                                <>
                                  {thinkingSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      {i === thinkingSteps.length - 1 ? (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#6B8F71] animate-pulse shrink-0" />
                                      ) : (
                                        <svg className="w-3 h-3 text-[#6B8F71] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                      <span className={`text-xs ${i === thinkingSteps.length - 1 ? "text-[#6B8F71]" : "text-[#999]"}`}>
                                        {step}
                                      </span>
                                    </div>
                                  ))}
                                  {/* Progress bar for long-running operations */}
                                  {elapsedSeconds >= 5 && (() => {
                                    const estimatedTotal = 300; // 5 minutes
                                    const progress = Math.min(elapsedSeconds / estimatedTotal, 0.95);
                                    const remaining = Math.max(0, estimatedTotal - elapsedSeconds);
                                    const mins = Math.floor(remaining / 60);
                                    const secs = remaining % 60;
                                    return (
                                      <div className="mt-2 space-y-1">
                                        <div className="w-full h-1.5 bg-[#E8E6E1] rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-[#6B8F71] rounded-full transition-all duration-1000 ease-linear"
                                            style={{ width: `${progress * 100}%` }}
                                          />
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-[10px] text-[#999]">
                                            {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, "0")} elapsed
                                          </span>
                                          <span className="text-[10px] text-[#999]">
                                            ~{mins > 0 ? `${mins}m ` : ""}{secs > 0 ? `${secs}s` : ""} remaining
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })()}
                                </>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[#6B8F71]" style={{ animationDelay: "0ms" }} />
                                  <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[#6B8F71]" style={{ animationDelay: "150ms" }} />
                                  <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[#6B8F71]" style={{ animationDelay: "300ms" }} />
                                </span>
                              )}
                            </div>
                          ) : null
                        )}
                      </div>

                      {/* Thinking steps timeline while agent is working between text outputs */}
                      {message.role === "assistant" && message.content && isLoading && index === messages.length - 1 && thinkingSteps.length > 0 && (
                        <div className="mt-2 ml-1 space-y-1">
                          {thinkingSteps.map((step, i) => (
                            <div key={i} className="flex items-center gap-2">
                              {i === thinkingSteps.length - 1 ? (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6B8F71] animate-pulse shrink-0" />
                              ) : (
                                <svg className="w-3 h-3 text-[#6B8F71] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              <span className={`text-xs ${i === thinkingSteps.length - 1 ? "text-[#6B8F71]" : "text-[#999]"}`}>
                                {step}
                              </span>
                            </div>
                          ))}
                          {/* Progress bar for long-running operations */}
                          {elapsedSeconds >= 5 && (() => {
                            const estimatedTotal = 300;
                            const progress = Math.min(elapsedSeconds / estimatedTotal, 0.95);
                            const remaining = Math.max(0, estimatedTotal - elapsedSeconds);
                            const mins = Math.floor(remaining / 60);
                            const secs = remaining % 60;
                            return (
                              <div className="mt-2 space-y-1">
                                <div className="w-full h-1.5 bg-[#E8E6E1] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#6B8F71] rounded-full transition-all duration-1000 ease-linear"
                                    style={{ width: `${progress * 100}%` }}
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-[#999]">
                                    {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, "0")} elapsed
                                  </span>
                                  <span className="text-[10px] text-[#999]">
                                    ~{mins > 0 ? `${mins}m ` : ""}{secs > 0 ? `${secs}s` : ""} remaining
                                  </span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {/* Copy + Post buttons for assistant messages */}
                      {message.role === "assistant" && message.content && !isLoading && (
                        <div className="self-start flex flex-wrap items-center gap-2">
                          {/* Copy as plain text (for LinkedIn) */}
                          <button
                            onClick={() => {
                              // Strip markdown formatting for plain text paste
                              const plain = message.content
                                .replace(/^#{1,6}\s+/gm, "")          // headings
                                .replace(/\*\*(.+?)\*\*/g, "$1")      // bold
                                .replace(/\*(.+?)\*/g, "$1")          // italic
                                .replace(/`(.+?)`/g, "$1")            // inline code
                                .replace(/^\s*[-*]\s+/gm, "- ")       // normalize list markers
                                .replace(/\[(.+?)\]\(.+?\)/g, "$1")   // links → text only
                                .replace(/^---+$/gm, "")              // horizontal rules
                                .replace(/!\[.*?\]\(.*?\)/g, "")      // remove images
                                .replace(/\n{3,}/g, "\n\n")           // collapse extra newlines
                                .trim();
                              navigator.clipboard.writeText(plain);
                              setCopiedIndex(index * 10);
                              setTimeout(() => setCopiedIndex(null), 2000);
                            }}
                            className="flex items-center gap-1.5 text-xs font-medium text-[#666] hover:text-[#6B8F71] bg-[#FAFAF8] hover:bg-[#6B8F71]/10 border border-[#E8E6E1] hover:border-[#6B8F71]/30 px-3 py-1.5 rounded-lg transition-all"
                            title="Copy as plain text (for LinkedIn)"
                          >
                            {copiedIndex === index * 10 ? (
                              <>
                                <svg className="w-3.5 h-3.5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[#6B8F71]">Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                Copy Text
                              </>
                            )}
                          </button>

                          {/* Copy as markdown (for Medium) */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(message.content);
                              setCopiedIndex(index * 10 + 1);
                              setTimeout(() => setCopiedIndex(null), 2000);
                            }}
                            className="flex items-center gap-1.5 text-xs font-medium text-[#666] hover:text-[#6B8F71] bg-[#FAFAF8] hover:bg-[#6B8F71]/10 border border-[#E8E6E1] hover:border-[#6B8F71]/30 px-3 py-1.5 rounded-lg transition-all"
                            title="Copy as markdown (for Medium)"
                          >
                            {copiedIndex === index * 10 + 1 ? (
                              <>
                                <svg className="w-3.5 h-3.5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-[#6B8F71]">Copied!</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                </svg>
                                Copy Markdown
                              </>
                            )}
                          </button>

                          {/* Post to X */}
                          {connectedPlatforms.includes("x") && (() => {
                            const state = postingState[`${index}-x`] || "idle";
                            return (
                              <button
                                onClick={() => handlePostToSocial(index, "x")}
                                disabled={state === "posting" || state === "posted"}
                                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                                  state === "posted"
                                    ? "text-[#6B8F71] bg-[#6B8F71]/10 border-[#6B8F71]/30"
                                    : state === "error"
                                    ? "text-red-500 bg-red-50 border-red-200 hover:bg-red-100"
                                    : "text-[#666] hover:text-[#1C1C1C] bg-[#FAFAF8] hover:bg-[#F5F4F0] border-[#E8E6E1] hover:border-[#999]"
                                } disabled:opacity-60`}
                                title="Post to X"
                              >
                                {state === "posting" ? (
                                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                  </svg>
                                )}
                                {state === "posted" ? "Posted!" : state === "error" ? "Retry" : state === "posting" ? "Posting..." : "Post to X"}
                              </button>
                            );
                          })()}

                          {/* Post to LinkedIn (Personal) */}
                          {connectedPlatforms.includes("linkedin") && (() => {
                            const state = postingState[`${index}-linkedin`] || "idle";
                            return (
                              <button
                                onClick={() => handlePostToSocial(index, "linkedin")}
                                disabled={state === "posting" || state === "posted"}
                                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                                  state === "posted"
                                    ? "text-[#6B8F71] bg-[#6B8F71]/10 border-[#6B8F71]/30"
                                    : state === "error"
                                    ? "text-red-500 bg-red-50 border-red-200 hover:bg-red-100"
                                    : "text-[#666] hover:text-[#0077B5] bg-[#FAFAF8] hover:bg-blue-50/50 border-[#E8E6E1] hover:border-[#0077B5]/30"
                                } disabled:opacity-60`}
                                title="Post to LinkedIn (Personal)"
                              >
                                {state === "posting" ? (
                                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                  </svg>
                                )}
                                {state === "posted" ? "Posted!" : state === "error" ? "Retry" : state === "posting" ? "Posting..." : linkedInOrgId ? "LinkedIn (Personal)" : "Post to LinkedIn"}
                              </button>
                            );
                          })()}

                          {/* Post to LinkedIn (Company Page) */}
                          {connectedPlatforms.includes("linkedin_org") && (() => {
                            const state = postingState[`${index}-linkedin-org`] || "idle";
                            return (
                              <button
                                onClick={() => handlePostToSocial(index, "linkedin", true)}
                                disabled={state === "posting" || state === "posted"}
                                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                                  state === "posted"
                                    ? "text-[#6B8F71] bg-[#6B8F71]/10 border-[#6B8F71]/30"
                                    : state === "error"
                                    ? "text-red-500 bg-red-50 border-red-200 hover:bg-red-100"
                                    : "text-[#666] hover:text-[#0077B5] bg-[#FAFAF8] hover:bg-blue-50/50 border-[#E8E6E1] hover:border-[#0077B5]/30"
                                } disabled:opacity-60`}
                                title={`Post to ${linkedInOrgName || "Company Page"}`}
                              >
                                {state === "posting" ? (
                                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                  </svg>
                                )}
                                {state === "posted" ? "Posted!" : state === "error" ? "Retry" : state === "posting" ? "Posting..." : `LinkedIn (${linkedInOrgName || "Company"})`}
                              </button>
                            );
                          })()}
                        </div>
                      )}

                      {/* Question UI */}
                      {message.pendingQuestion && (
                        <div className="mt-3 space-y-4">
                          {message.pendingQuestion.questions.map((question, qIdx) => {
                            const key = index * 100 + qIdx;
                            const selected = selectedAnswers[key] || [];

                            return (
                              <div key={qIdx} className="bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-xs font-medium px-2 py-0.5 rounded text-[#6B8F71] bg-[#6B8F71]/10">
                                    {question.header}
                                  </span>
                                  {question.multiSelect && (
                                    <span className="text-xs text-[#999]">Select multiple</span>
                                  )}
                                </div>
                                <p className="text-sm mb-3 text-[#1C1C1C]">{question.question}</p>
                                <div className="space-y-2">
                                  {question.options.map((option, oIdx) => (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleSelectOption(index, qIdx, option.label)}
                                      className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all ${
                                        selected.includes(option.label)
                                          ? "border-[#6B8F71] bg-[#6B8F71]/10 text-[#1C1C1C]"
                                          : "border-[#E8E6E1] hover:border-[#999] text-[#666] hover:text-[#1C1C1C]"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                            selected.includes(option.label)
                                              ? ""
                                              : "border-[#D5D3CE]"
                                          }`}
                                          style={selected.includes(option.label) ? { borderColor: accent, backgroundColor: accent } : {}}
                                        >
                                          {selected.includes(option.label) && (
                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                          )}
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">{option.label}</p>
                                          {option.description && (
                                            <p className="text-xs mt-0.5 text-[#888]">{option.description}</p>
                                          )}
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                          <button
                            onClick={() => handleSubmitAnswers(index)}
                            disabled={message.pendingQuestion.questions.some((_, qIdx) => {
                              const key = index * 100 + qIdx;
                              return !selectedAnswers[key] || selectedAnswers[key].length === 0;
                            })}
                            className="w-full px-4 py-2.5 font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white bg-[#6B8F71]"
                          >
                            Continue
                          </button>
                        </div>
                      )}

                      {/* Subagent status indicator */}
                      {message.subagentStatus && (
                        <div className="mt-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-lg bg-[#6B8F71]/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={agentIcon} />
                                </svg>
                              </div>
                              {!message.subagentStatus.isComplete && (
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium px-2 py-0.5 rounded text-[#6B8F71] bg-[#6B8F71]/10">
                                  {message.subagentStatus.agentType}
                                </span>
                                {!message.subagentStatus.isComplete && (
                                  <span className="text-xs text-[#888]">working...</span>
                                )}
                              </div>
                              <p className="text-sm mt-1 text-[#666]">{message.subagentStatus.description}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Payload info button */}
                      <button
                        onClick={() => toggleRaw(index)}
                        className={`flex items-center gap-1 text-xs transition-colors px-2 py-1 rounded-lg text-[#999] hover:text-[#6B8F71] hover:bg-[#F5F4F0] ${
                          message.role === "user" ? "self-end" : "self-start"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Raw data panel */}
                  {expandedRaw === index && (
                    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className="max-w-[90%] bg-[#F5F4F0] border border-[#E8E6E1] rounded-xl p-4 space-y-3">
                        {message.role === "user" && message.rawInput ? (
                          <div>
                            <p className="text-xs font-medium mb-2 text-[#6B8F71]">Request Payload</p>
                            <pre className="text-xs text-[#555] overflow-x-auto whitespace-pre-wrap font-mono bg-white p-3 rounded-lg border border-[#E8E6E1]">
                              {JSON.stringify(message.rawInput, null, 2)}
                            </pre>
                          </div>
                        ) : null}
                        {message.role === "assistant" && message.rawOutput ? (
                          <div>
                            <p className="text-xs font-medium mb-2 text-[#6B8F71]">Response Payload ({message.rawOutput.length} messages)</p>
                            <pre className="text-xs text-[#555] overflow-x-auto whitespace-pre-wrap font-mono bg-white p-3 rounded-lg border border-[#E8E6E1] max-h-[400px] overflow-y-auto">
                              {JSON.stringify(message.rawOutput, null, 2)}
                            </pre>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />

              {/* Highlight & Ask popover */}
              {selectionPos && selectedText && (
                <div
                  ref={popoverRef}
                  onMouseUp={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute z-30 w-72 bg-white border border-[#E8E6E1] rounded-xl shadow-lg"
                  style={{
                    left: Math.max(8, Math.min(selectionPos.x - 144, (chatAreaRef.current?.clientWidth || 300) - 288)),
                    top: selectionPos.y,
                    transform: "translateY(-100%)",
                  }}
                >
                  <div className="p-3 space-y-2.5">
                    <p className="text-xs text-[#888] line-clamp-2 border-l-2 border-[#6B8F71] pl-2 italic">
                      &ldquo;{selectedText.length > 100 ? selectedText.slice(0, 100) + "..." : selectedText}&rdquo;
                    </p>
                    <button
                      onClick={() => handleAskAboutSelection()}
                      className="w-full flex items-center gap-2 text-xs font-medium text-[#6B8F71] hover:bg-[#6B8F71]/5 px-2.5 py-2 rounded-lg transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                      </svg>
                      Explain this further
                    </button>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={selectionQuery}
                        onChange={(e) => setSelectionQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && selectionQuery.trim()) {
                            e.preventDefault();
                            handleAskAboutSelection(selectionQuery.trim());
                          }
                        }}
                        placeholder="Ask something about this..."
                        className="flex-1 text-xs px-2.5 py-1.5 bg-[#FAFAF8] border border-[#E8E6E1] rounded-lg text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] transition-colors"
                      />
                      <button
                        onClick={() => {
                          if (selectionQuery.trim()) {
                            handleAskAboutSelection(selectionQuery.trim());
                          }
                        }}
                        disabled={!selectionQuery.trim()}
                        className="px-2.5 py-1.5 bg-[#6B8F71] text-white rounded-lg hover:bg-[#5A7D60] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-[#E8E6E1]">
          {/* File pills */}
          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {uploadedFiles.map((file, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B8F71]/10 text-[#6B8F71] text-xs font-medium"
                >
                  {file.url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                  )}
                  {file.name}
                  <button
                    onClick={() => removeUploadedFile(i)}
                    className="ml-1 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          {isUploading && (
            <div className="flex items-center gap-2 mb-3 text-xs text-[#888]">
              <div className="w-3.5 h-3.5 border-2 border-[#6B8F71] border-t-transparent rounded-full animate-spin" />
              Uploading file...
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="flex gap-3">
            {fileUpload && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={fileUpload.accept}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || isUploading}
                  className="self-end px-3 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl text-[#999] hover:text-[#6B8F71] hover:border-[#6B8F71]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Attach file"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                  </svg>
                </button>
              </>
            )}
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  formRef.current?.requestSubmit();
                }
              }}
              placeholder={placeholder}
              disabled={isLoading}
              rows={1}
              className="flex-1 px-4 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] transition-colors text-sm disabled:opacity-50 resize-none max-h-32 overflow-y-auto"
            />
            <StatefulButton
              type="submit"
              disabled={isLoading || isUploading || !input.trim()}
              isLoading={isLoading}
              className="self-end"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            </StatefulButton>
          </form>
        </div>
      </div>
    </div>
  );
}
