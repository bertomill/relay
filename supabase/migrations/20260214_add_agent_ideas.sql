-- Agent ideas backlog (persisted per user)
CREATE TABLE IF NOT EXISTS agent_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for fast lookup by user
CREATE INDEX idx_agent_ideas_user_id ON agent_ideas(user_id);

-- RLS
ALTER TABLE agent_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own ideas"
  ON agent_ideas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ideas"
  ON agent_ideas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ideas"
  ON agent_ideas FOR DELETE
  USING (auth.uid() = user_id);
