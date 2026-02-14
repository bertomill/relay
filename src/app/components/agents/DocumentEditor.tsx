"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface DocumentEditorProps {
  content: string;
  onChange: (content: string) => void;
  isAgentWriting: boolean;
}

export default function DocumentEditor({ content, onChange, isAgentWriting }: DocumentEditorProps) {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [copied, setCopied] = useState<"text" | "md" | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll textarea to bottom when agent writes
  useEffect(() => {
    if (isAgentWriting && textareaRef.current && mode === "edit") {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [content, isAgentWriting, mode]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const copyAsText = () => {
    const plain = content
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
    navigator.clipboard.writeText(plain);
    setCopied("text");
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAsMarkdown = () => {
    navigator.clipboard.writeText(content);
    setCopied("md");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-[#E8E6E1] rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E8E6E1] bg-[#FAFAF8]">
        <div className="flex items-center gap-2">
          {/* Agent writing indicator */}
          {isAgentWriting && (
            <span className="flex items-center gap-1.5 text-xs text-[#6B8F71] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#6B8F71] animate-pulse" />
              Writing...
            </span>
          )}
          {!isAgentWriting && content && (
            <span className="text-xs text-[#999]">
              {wordCount} words · {charCount} chars
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Edit / Preview toggle */}
          <div className="flex rounded-lg border border-[#E8E6E1] overflow-hidden">
            <button
              onClick={() => setMode("edit")}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                mode === "edit"
                  ? "bg-[#6B8F71] text-white"
                  : "bg-white text-[#666] hover:text-[#1C1C1C]"
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setMode("preview")}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                mode === "preview"
                  ? "bg-[#6B8F71] text-white"
                  : "bg-white text-[#666] hover:text-[#1C1C1C]"
              }`}
            >
              Preview
            </button>
          </div>

          {/* Copy Text */}
          <button
            onClick={copyAsText}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#666] hover:text-[#6B8F71] bg-white border border-[#E8E6E1] hover:border-[#6B8F71]/30 rounded-lg transition-all"
            title="Copy as plain text"
          >
            {copied === "text" ? (
              <svg className="w-3 h-3 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            )}
            Text
          </button>

          {/* Copy Markdown */}
          <button
            onClick={copyAsMarkdown}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#666] hover:text-[#6B8F71] bg-white border border-[#E8E6E1] hover:border-[#6B8F71]/30 rounded-lg transition-all"
            title="Copy as markdown"
          >
            {copied === "md" ? (
              <svg className="w-3 h-3 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            )}
            MD
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {content || mode === "edit" ? (
          mode === "edit" ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder="The agent will write the draft here, or you can start typing..."
              className="w-full h-full p-4 text-sm text-[#1C1C1C] placeholder-[#999] bg-white resize-none focus:outline-none font-mono leading-relaxed"
            />
          ) : (
            <div className="h-full overflow-y-auto p-4">
              <div className="prose prose-sm max-w-none prose-headings:text-[#1C1C1C] prose-headings:font-semibold prose-p:text-[#444] prose-p:leading-relaxed prose-a:text-[#6B8F71] prose-strong:text-[#1C1C1C] prose-li:text-[#444] prose-code:text-[#6B8F71] prose-code:bg-[#6B8F71]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-blockquote:border-[#6B8F71] prose-blockquote:text-[#555]">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          )
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <svg className="w-10 h-10 text-[#E8E6E1] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="text-sm text-[#999]">No document yet</p>
              <p className="text-xs text-[#ccc] mt-1">Send a message to start drafting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
