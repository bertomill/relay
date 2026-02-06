ALTER TABLE content_ideas ADD COLUMN completed BOOLEAN DEFAULT FALSE NOT NULL;

CREATE POLICY "Authenticated users can update ideas" ON content_ideas FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
