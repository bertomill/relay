-- Daily progress persistence for the morning dashboard
CREATE TABLE daily_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  progress JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, date)
);

-- RLS
ALTER TABLE daily_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own daily progress"
  ON daily_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily progress"
  ON daily_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily progress"
  ON daily_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for fast date lookup
CREATE INDEX idx_daily_progress_user_date ON daily_progress (user_id, date DESC);
