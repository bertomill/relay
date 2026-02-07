"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgentBySlug } from "@/lib/agents/data";
import { useState } from "react";
import { AnimateIn } from "@/app/components/AnimateIn";
import FAQAccordion from "@/app/components/agents/FAQAccordion";
import AgentChatWidget from "@/app/components/agents/AgentChatWidget";

export default function AgentShowcase() {
  const params = useParams();
  const slug = params.slug as string;
  const agent = getAgentBySlug(slug);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  if (!agent) {
    notFound();
  }

  return (
    <div className="flex-1 py-12">
      {/* Hero */}
      <AnimateIn animation="fade-up">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#6B8F71]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={agent.iconPath} />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1C1C1C]">{agent.name}</h1>
                {agent.status === "active" && (
                  <span className="flex items-center gap-1.5 text-xs text-[#888] bg-white px-2.5 py-1 rounded-full border border-[#E8E6E1]">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Active
                  </span>
                )}
              </div>
              <p className="text-[#666] mt-1">{agent.tagline}</p>
            </div>
          </div>
          <p className="text-[#555] max-w-2xl text-lg leading-relaxed">
            {agent.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href={`/agents/${agent.id}/chat`}
              className="px-5 py-2.5 bg-[#6B8F71] text-white font-semibold rounded-lg hover:bg-[#5A7D60] transition-colors text-sm"
            >
              Open Full Chat
            </Link>
            <a
              href="#try-it"
              className="px-5 py-2.5 text-sm text-[#666] hover:text-[#6B8F71] transition-colors border border-[#E8E6E1] rounded-lg hover:border-[#6B8F71]/50"
            >
              Try it below
            </a>
          </div>
        </div>
      </AnimateIn>

      {/* Capabilities */}
      <AnimateIn animation="fade-up" delay={100}>
        <div className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6 text-[#1C1C1C]">Capabilities</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {agent.capabilities.map((cap, i) => (
              <div
                key={i}
                className="bg-white border border-[#E8E6E1] rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-[#6B8F71]/10 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#6B8F71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cap.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-1 text-[#1C1C1C]">{cap.title}</h3>
                <p className="text-sm text-[#666]">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* Architecture (if available) */}
      {agent.architecture && (
        <AnimateIn animation="fade-up" delay={200}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-[#1C1C1C]">Architecture</h2>
            <div className="bg-white border border-[#E8E6E1] rounded-xl p-6">
              <div className="flex flex-col items-center gap-3">
                {agent.architecture.map((layer, layerIdx) => (
                  <div key={layerIdx} className="contents">
                    {layerIdx > 0 && (
                      <div className="flex flex-col items-center">
                        <div className="w-px h-4 bg-[#D5D3CE]" />
                        <svg className="w-3 h-3 text-[#999]" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M6 9L1.5 4.5h9L6 9z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-wrap justify-center gap-3">
                        {layer.nodes.map((node, nodeIdx) => {
                          const nodeKey = `${layerIdx}-${nodeIdx}`;
                          const isActive = activeNode === nodeKey;
                          return (
                            <button
                              key={nodeIdx}
                              onClick={() =>
                                setActiveNode(isActive ? null : nodeKey)
                              }
                              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                                node.type === "orchestrator"
                                  ? `bg-[#6B8F71]/10 border border-[#6B8F71]/30 text-[#6B8F71] ${isActive ? "ring-2 ring-[#6B8F71]/40" : "hover:bg-[#6B8F71]/15"}`
                                  : node.type === "result"
                                  ? `bg-emerald-50 border border-emerald-200 text-emerald-700 ${isActive ? "ring-2 ring-emerald-300" : "hover:bg-emerald-100"}`
                                  : `bg-[#F5F4F0] border border-[#E8E6E1] text-[#555] text-xs ${isActive ? "ring-2 ring-[#6B8F71]/30" : "hover:bg-[#EDECE8]"}`
                              }`}
                            >
                              {node.label}
                            </button>
                          );
                        })}
                      </div>
                      {layer.nodes.map((node, nodeIdx) => {
                        const nodeKey = `${layerIdx}-${nodeIdx}`;
                        return (
                          activeNode === nodeKey &&
                          node.description && (
                            <p
                              key={`desc-${nodeIdx}`}
                              className="text-sm text-[#555] max-w-md text-center animate-in fade-in slide-in-from-top-1 duration-200"
                            >
                              {node.description}
                            </p>
                          )
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      )}

      {/* FAQ */}
      <AnimateIn animation="fade-up" delay={300}>
        <div className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6 text-[#1C1C1C]">Technical FAQ</h2>
          <FAQAccordion items={agent.faq} />
        </div>
      </AnimateIn>

      {/* Embedded Chat */}
      <AnimateIn animation="fade-up" delay={400}>
        <div id="try-it" className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-6 text-[#1C1C1C]">Try {agent.name}</h2>
          <AgentChatWidget agent={agent} />
        </div>
      </AnimateIn>
    </div>
  );
}
