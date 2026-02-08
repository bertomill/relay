-- Feedback table for collecting website feedback from visitors
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  email TEXT,
  page_url TEXT,
  category TEXT,        -- "bug", "improvement", "feature", "other"
  message TEXT NOT NULL,
  addressed BOOLEAN DEFAULT false
);

-- RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can insert feedback (public form)
CREATE POLICY "Anyone can insert feedback"
  ON feedback FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read feedback
CREATE POLICY "Authenticated users can read feedback"
  ON feedback FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated users can update feedback (mark as addressed)
CREATE POLICY "Authenticated users can update feedback"
  ON feedback FOR UPDATE
  USING (auth.role() = 'authenticated');
