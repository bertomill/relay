export interface AgentCapability {
  title: string;
  description: string;
  icon: string; // SVG path data for the icon
}

export interface AgentFAQ {
  question: string;
  answer: string;
}

export interface AgentArchitectureNode {
  label: string;
  type: "orchestrator" | "agent" | "result";
}

export interface AgentArchitectureLayer {
  nodes: AgentArchitectureNode[];
}

export interface AgentChatConfig {
  apiEndpoint: string;
  storageKey: string;
  placeholder: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  loadingText: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "active" | "coming-soon";
  iconPath: string; // SVG path data for the agent icon
  chatConfig: AgentChatConfig;
  capabilities: AgentCapability[];
  faq: AgentFAQ[];
  architecture?: AgentArchitectureLayer[];
}
