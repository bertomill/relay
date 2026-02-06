CREATE TABLE content_ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE content_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read ideas" ON content_ideas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert ideas" ON content_ideas FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can delete ideas" ON content_ideas FOR DELETE TO authenticated USING (true);
