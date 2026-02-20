-- Quiz score tracking for SDK tutor
CREATE TABLE quiz_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  score INT NOT NULL,
  total INT NOT NULL DEFAULT 5,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own quiz scores"
  ON quiz_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz scores"
  ON quiz_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index for fast date lookup
CREATE INDEX idx_quiz_scores_user_date ON quiz_scores (user_id, date DESC);
