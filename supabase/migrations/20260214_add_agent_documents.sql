-- Persistent document editor content tied to agent chat sessions
CREATE TABLE IF NOT EXISTS agent_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  agent_id TEXT NOT NULL DEFAULT 'ray',
  title TEXT,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (user_id, session_id)
);

-- Fast lookup by user + session
CREATE INDEX IF NOT EXISTS idx_agent_documents_user_session ON agent_documents(user_id, session_id);

-- Fast lookup for listing a user's documents
CREATE INDEX IF NOT EXISTS idx_agent_documents_user_updated ON agent_documents(user_id, updated_at DESC);

-- RLS
ALTER TABLE agent_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own documents" ON agent_documents;
CREATE POLICY "Users can read own documents"
  ON agent_documents FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own documents" ON agent_documents;
CREATE POLICY "Users can insert own documents"
  ON agent_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own documents" ON agent_documents;
CREATE POLICY "Users can update own documents"
  ON agent_documents FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own documents" ON agent_documents;
CREATE POLICY "Users can delete own documents"
  ON agent_documents FOR DELETE
  USING (auth.uid() = user_id);
