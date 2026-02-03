"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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
  preview: string; // First user message as preview
  createdAt: Date;
  messages: Message[];
}

export default function Ray() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRaw, setExpandedRaw] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showSessions, setShowSessions] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ray-sessions");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed.map((s: Session) => ({ ...s, createdAt: new Date(s.createdAt) })));
    }
  }, []);

  // Save sessions to localStorage when they change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("ray-sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  // Save current session when messages change
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
          ].slice(0, 20); // Keep last 20 sessions
        }
      });
    }
  }, [sessionId, messages]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message with raw input
    setMessages((prev) => [...prev, {
      role: "user",
      content: userMessage,
      rawInput: { message: userMessage, sessionId }
    }]);

    // Add empty assistant message that we'll stream into
    setMessages((prev) => [...prev, {
      role: "assistant",
      content: "",
      rawOutput: []
    }]);

    try {
      const response = await fetch("/api/agents/ray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);

              // Capture session ID
              if (parsed.type === "session" && parsed.sessionId) {
                setSessionId(parsed.sessionId);
              }

              if (parsed.type === "text" && parsed.text) {
                // Update the last assistant message with streamed text
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.role === "assistant") {
                    lastMessage.content += parsed.text;
                    if (parsed.rawMessage) {
                      lastMessage.rawOutput = [...(lastMessage.rawOutput || []), parsed.rawMessage];
                    }
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "input") {
                // Update user message with full raw input
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const userMsg = newMessages[newMessages.length - 2];
                  if (userMsg?.role === "user") {
                    userMsg.rawInput = parsed.rawInput;
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "raw" && parsed.rawMessage) {
                // Add raw message to output
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.role === "assistant") {
                    lastMessage.rawOutput = [...(lastMessage.rawOutput || []), parsed.rawMessage];
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "complete" && parsed.allRawMessages) {
                // Replace with complete raw output
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.role === "assistant") {
                    lastMessage.rawOutput = parsed.allRawMessages;
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "ask_user_question") {
                // Store the pending question in the assistant message
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.role === "assistant") {
                    lastMessage.pendingQuestion = {
                      toolUseId: parsed.toolUseId,
                      questions: parsed.questions,
                    };
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "subagent_start") {
                // Show subagent status in the assistant message
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.role === "assistant") {
                    lastMessage.subagentStatus = {
                      agentType: parsed.agentType,
                      description: parsed.description,
                      isComplete: false,
                    };
                  }
                  return newMessages;
                });
              }

              if (parsed.type === "error") {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.role === "assistant") {
                    lastMessage.content = "Sorry, an error occurred. Please try again.";
                    lastMessage.rawOutput = [{ error: parsed.error, rawError: parsed.rawError }];
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
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.content = "Sorry, I couldn't connect to the server. Please try again.";
          lastMessage.rawOutput = [{ error: String(error) }];
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
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
        // Toggle selection for multi-select
        if (current.includes(optionLabel)) {
          return { ...prev, [key]: current.filter((l) => l !== optionLabel) };
        } else {
          return { ...prev, [key]: [...current, optionLabel] };
        }
      } else {
        // Single select - replace
        return { ...prev, [key]: [optionLabel] };
      }
    });
  };

  const handleSubmitAnswers = async (messageIndex: number) => {
    const message = messages[messageIndex];
    if (!message?.pendingQuestion) return;

    // Build answers object
    const answers: Record<string, string> = {};
    message.pendingQuestion.questions.forEach((q, qIdx) => {
      const key = messageIndex * 100 + qIdx;
      const selected = selectedAnswers[key] || [];
      answers[q.header] = selected.join(", ");
    });

    // Format the answer as a user message
    const answerText = Object.entries(answers)
      .map(([header, value]) => `${header}: ${value}`)
      .join("\n");

    // Clear the pending question from the message
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages[messageIndex]) {
        newMessages[messageIndex] = { ...newMessages[messageIndex], pendingQuestion: undefined };
      }
      return newMessages;
    });

    // Clear selected answers
    setSelectedAnswers({});

    // Submit the answer as a new message
    setInput(answerText);
    setTimeout(() => {
      const form = document.querySelector("form");
      if (form) {
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      }
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#d4a574] opacity-[0.07] blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#b8845f] opacity-[0.05] blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#141414"/>
                <circle cx="10.5" cy="11" r="3.5" fill="#d4a574"/>
                <circle cx="21.5" cy="21" r="3.5" fill="#d4a574"/>
                <path d="M13 13.5L19 18.5" stroke="#d4a574" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="21.5" cy="11" r="2" fill="#d4a574" fillOpacity="0.4"/>
                <circle cx="10.5" cy="21" r="2" fill="#d4a574" fillOpacity="0.4"/>
              </svg>
              <span className="text-xl font-semibold tracking-tight">HeadRoom AI</span>
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/agents"
              className="text-[#a1a1a1] hover:text-[#d4a574] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Agents
            </Link>
          </div>
        </header>

        {/* Agent info */}
        <div className="mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ray</h1>
            <p className="text-sm text-[#737373]">Your helpful AI assistant</p>
          </div>

          {/* Session controls */}
          <div className="ml-auto flex items-center gap-3">
            {sessionId && (
              <span className="text-xs text-[#525252] font-mono bg-[#111111] px-2 py-1 rounded border border-[#1f1f1f]">
                {sessionId.slice(0, 8)}...
              </span>
            )}

            {/* Sessions dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSessions(!showSessions)}
                className="flex items-center gap-1.5 text-xs text-[#a1a1a1] hover:text-[#d4a574] transition-colors bg-[#111111] px-3 py-1.5 rounded-lg border border-[#1f1f1f] hover:border-[#d4a574]/50"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
                {sessions.length > 0 && (
                  <span className="bg-[#d4a574]/20 text-[#d4a574] px-1.5 py-0.5 rounded text-[10px] font-medium">
                    {sessions.length}
                  </span>
                )}
              </button>

              {/* Sessions dropdown menu */}
              {showSessions && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSessions(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-72 bg-[#111111] border border-[#1f1f1f] rounded-xl shadow-2xl z-20 overflow-hidden">
                    <div className="p-3 border-b border-[#1f1f1f] flex items-center justify-between">
                      <span className="text-xs font-medium text-[#737373]">Recent Sessions</span>
                      <button
                        onClick={handleNewChat}
                        className="text-xs text-[#d4a574] hover:underline"
                      >
                        + New Chat
                      </button>
                    </div>
                    {sessions.length === 0 ? (
                      <div className="p-4 text-center text-xs text-[#525252]">
                        No previous sessions
                      </div>
                    ) : (
                      <div className="max-h-64 overflow-y-auto">
                        {sessions.map((session) => (
                          <button
                            key={session.id}
                            onClick={() => handleResumeSession(session)}
                            className={`w-full px-3 py-2.5 text-left hover:bg-[#1a1a1a] transition-colors flex items-start gap-3 group ${
                              sessionId === session.id ? "bg-[#1a1a1a]" : ""
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-[#fafafa] truncate">
                                {session.preview}
                                {session.preview.length >= 50 && "..."}
                              </p>
                              <p className="text-xs text-[#525252] mt-0.5">
                                {formatTimeAgo(new Date(session.createdAt))} · {session.messages.length} messages
                              </p>
                            </div>
                            <button
                              onClick={(e) => handleDeleteSession(e, session)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-[#525252] hover:text-red-400 transition-all"
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
              className="flex items-center gap-1.5 text-xs text-[#a1a1a1] hover:text-[#d4a574] transition-colors bg-[#111111] px-3 py-1.5 rounded-lg border border-[#1f1f1f] hover:border-[#d4a574]/50"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New
            </button>

            <span className="flex items-center gap-1.5 text-xs text-[#737373] bg-[#111111] px-3 py-1.5 rounded-full border border-[#1f1f1f]">
              <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}`} />
              {isLoading ? "Thinking..." : "Online"}
            </span>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 bg-[#111111] border border-[#1f1f1f] rounded-2xl flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                <p className="text-sm text-[#737373] max-w-sm mb-4">
                  Ask Ray anything. I can help with coding, analysis, writing, and more.
                </p>
                {sessions.length > 0 && (
                  <button
                    onClick={() => setShowSessions(true)}
                    className="text-xs text-[#d4a574] hover:underline"
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
                              ? "bg-gradient-to-r from-[#d4a574] to-[#b8845f] text-[#0a0a0a]"
                              : "bg-[#1a1a1a] text-[#fafafa]"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">
                            {message.content || (message.role === "assistant" && isLoading ? (
                              <span className="inline-flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[#525252] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-[#525252] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 bg-[#525252] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                              </span>
                            ) : "")}
                          </p>
                        </div>

                        {/* Question UI */}
                        {message.pendingQuestion && (
                          <div className="mt-3 space-y-4">
                            {message.pendingQuestion.questions.map((question, qIdx) => {
                              const key = index * 100 + qIdx;
                              const selected = selectedAnswers[key] || [];

                              return (
                                <div key={qIdx} className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-medium text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded">
                                      {question.header}
                                    </span>
                                    {question.multiSelect && (
                                      <span className="text-xs text-[#525252]">Select multiple</span>
                                    )}
                                  </div>
                                  <p className="text-sm text-[#fafafa] mb-3">{question.question}</p>
                                  <div className="space-y-2">
                                    {question.options.map((option, oIdx) => (
                                      <button
                                        key={oIdx}
                                        onClick={() => handleSelectOption(index, qIdx, option.label)}
                                        className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all ${
                                          selected.includes(option.label)
                                            ? "border-[#d4a574] bg-[#d4a574]/10 text-[#fafafa]"
                                            : "border-[#262626] hover:border-[#404040] text-[#a1a1a1] hover:text-[#fafafa]"
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                            selected.includes(option.label)
                                              ? "border-[#d4a574] bg-[#d4a574]"
                                              : "border-[#525252]"
                                          }`}>
                                            {selected.includes(option.label) && (
                                              <svg className="w-2.5 h-2.5 text-[#0a0a0a]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                              </svg>
                                            )}
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">{option.label}</p>
                                            {option.description && (
                                              <p className="text-xs text-[#737373] mt-0.5">{option.description}</p>
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
                              className="w-full px-4 py-2.5 bg-gradient-to-r from-[#d4a574] to-[#b8845f] text-[#0a0a0a] font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Continue
                            </button>
                          </div>
                        )}

                        {/* Subagent status indicator */}
                        {message.subagentStatus && (
                          <div className="mt-3 bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a574]/20 to-[#b8845f]/10 flex items-center justify-center">
                                  <svg className="w-4 h-4 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                  </svg>
                                </div>
                                {!message.subagentStatus.isComplete && (
                                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-[#d4a574] bg-[#d4a574]/10 px-2 py-0.5 rounded">
                                    {message.subagentStatus.agentType}
                                  </span>
                                  {!message.subagentStatus.isComplete && (
                                    <span className="text-xs text-[#737373]">working...</span>
                                  )}
                                </div>
                                <p className="text-sm text-[#a1a1a1] mt-1">{message.subagentStatus.description}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Info button */}
                        <button
                          onClick={() => toggleRaw(index)}
                          className={`self-${message.role === "user" ? "end" : "start"} flex items-center gap-1 text-xs text-[#525252] hover:text-[#d4a574] transition-colors px-2 py-1 rounded-lg hover:bg-[#1a1a1a]`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                          </svg>
                          {expandedRaw === index ? "Hide" : "Raw"}
                        </button>
                      </div>
                    </div>

                    {/* Raw data panel */}
                    {expandedRaw === index && (
                      <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="max-w-[90%] bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl p-4 space-y-3">
                          {message.role === "user" && message.rawInput ? (
                            <div>
                              <p className="text-xs font-medium text-[#d4a574] mb-2">Raw Input</p>
                              <pre className="text-xs text-[#a1a1a1] overflow-x-auto whitespace-pre-wrap font-mono bg-[#0a0a0a] p-3 rounded-lg border border-[#1f1f1f]">
                                {JSON.stringify(message.rawInput, null, 2)}
                              </pre>
                            </div>
                          ) : null}
                          {message.role === "assistant" && message.rawOutput ? (
                            <div>
                              <p className="text-xs font-medium text-[#d4a574] mb-2">Raw Output ({message.rawOutput.length} messages)</p>
                              <pre className="text-xs text-[#a1a1a1] overflow-x-auto whitespace-pre-wrap font-mono bg-[#0a0a0a] p-3 rounded-lg border border-[#1f1f1f] max-h-[400px] overflow-y-auto">
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
              </>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-[#1f1f1f]">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Ray..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-[#262626] rounded-xl text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#d4a574] transition-colors text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-5 py-3 bg-gradient-to-r from-[#d4a574] to-[#b8845f] text-[#0a0a0a] font-semibold rounded-xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-[#d4a574]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-6 text-[#404040] text-xs">
          <p>&copy; 2025 HeadRoom AI</p>
        </footer>
      </div>
    </div>
  );
}
