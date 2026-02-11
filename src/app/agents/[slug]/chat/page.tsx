"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getAgentBySlug } from "@/lib/agents/data";
import AgentChat from "@/app/components/agents/AgentChat";

export default function AgentChatPage() {
  const params = useParams();
  const slug = params.slug as string;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  return (
    <AgentChat
      agentId={agent.id}
      apiEndpoint={agent.chatConfig.apiEndpoint}
      storageKey={agent.chatConfig.storageKey}
      placeholder={agent.chatConfig.placeholder}
      emptyStateTitle={agent.chatConfig.emptyStateTitle}
      emptyStateDescription={agent.chatConfig.emptyStateDescription}
      loadingText={agent.chatConfig.loadingText}
      agentIcon={agent.iconPath}
      agentName={agent.name}
      variant="full"
      starterPrompts={agent.chatConfig.starterPrompts}
      fileUpload={agent.chatConfig.fileUpload}
    />
  );
}
