"use client";

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
  preview: string;
  createdAt: Date;
  messages: Message[];
}

interface UploadedFile {
  name: string;
  mimeType: string;
  filePath: string;
}

interface FileUploadConfig {
  accept: string;
  maxSizeMB: number;
  endpoint: string;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFull = variant === "full";
  const accent = "#6B8F71";

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setSessions(parsed.map((s: Session) => ({ ...s, createdAt: new Date(s.createdAt) })));
    }
  }, [storageKey]);

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

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(fileUpload.endpoint, { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadedFiles((prev) => [
          ...prev,
          { name: data.fileName, mimeType: data.mimeType, filePath: data.filePath },
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
        .map((f) => `[Uploaded: ${f.name} (${f.mimeType}) at ${f.filePath}]`)
        .join("\n");
      userMessage = fileLines + "\n\n" + userMessage;
      setUploadedFiles([]);
    }

    setInput("");
    setIsLoading(true);

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

              if (parsed.type === "session" && parsed.sessionId) {
                setSessionId(parsed.sessionId);
              }

              if (parsed.type === "text" && parsed.text) {
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

  return (
    <div className={`flex flex-col ${isFull ? "flex-1 py-8" : "h-[500px]"}`}>
      {/* Agent info bar (full variant only) */}
      {isFull && (
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

          <div className="ml-auto flex items-center gap-3">
            {sessionId && (
              <span className="text-xs text-[#888] font-mono bg-[#F5F4F0] px-2 py-1 rounded border border-[#E8E6E1]">
                {sessionId.slice(0, 8)}...
              </span>
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
              {isLoading ? loadingText : "Online"}
            </span>
          </div>
        </div>
      )}

      {/* Chat area */}
      <div className={`bg-white border border-[#E8E6E1] rounded-2xl flex flex-col overflow-hidden ${isFull ? "flex-1" : "h-full"}`}>
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
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
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content || (message.role === "assistant" && isLoading ? (
                            <span className="inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[#999]" style={{ animationDelay: "0ms" }} />
                              <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[#999]" style={{ animationDelay: "150ms" }} />
                              <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[#999]" style={{ animationDelay: "300ms" }} />
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
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                  </svg>
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
                  className="px-3 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl text-[#999] hover:text-[#6B8F71] hover:border-[#6B8F71]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Attach file"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                  </svg>
                </button>
              </>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-[#FAFAF8] border border-[#E8E6E1] rounded-xl text-[#1C1C1C] placeholder-[#999] focus:outline-none focus:border-[#6B8F71] transition-colors text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || isUploading || !input.trim()}
              className="px-5 py-3 bg-[#6B8F71] text-white font-semibold rounded-xl hover:bg-[#5A7D60] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
