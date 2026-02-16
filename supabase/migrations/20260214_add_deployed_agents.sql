-- Deployed agents table: stores agents created via Origin and deployed to /agents
CREATE TABLE IF NOT EXISTS deployed_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),

  -- URL slug (unique identifier for routing)
  agent_id TEXT UNIQUE NOT NULL,

  -- Display fields
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  icon_path TEXT NOT NULL DEFAULT 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
  status TEXT NOT NULL DEFAULT 'active',
  capabilities JSONB DEFAULT '[]'::jsonb,
  faq JSONB DEFAULT '[]'::jsonb,
  architecture JSONB DEFAULT NULL,

  -- Chat UI config
  placeholder TEXT DEFAULT 'Send a message...',
  empty_state_title TEXT DEFAULT 'Start a conversation',
  empty_state_description TEXT DEFAULT '',
  loading_text TEXT DEFAULT 'Thinking...',
  starter_prompts TEXT[] DEFAULT '{}',

  -- Runtime config
  system_prompt TEXT NOT NULL DEFAULT '',
  allowed_tools TEXT[] DEFAULT '{Read,Glob,Grep,WebSearch,WebFetch,AskUserQuestion}',
  agents JSONB DEFAULT NULL,
  permission_mode TEXT DEFAULT 'bypassPermissions'
);

-- RLS: public reads, creator-only writes
ALTER TABLE deployed_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read deployed agents"
  ON deployed_agents FOR SELECT
  USING (true);

CREATE POLICY "Creator can insert deployed agents"
  ON deployed_agents FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creator can update deployed agents"
  ON deployed_agents FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Creator can delete deployed agents"
  ON deployed_agents FOR DELETE
  USING (auth.uid() = created_by);
