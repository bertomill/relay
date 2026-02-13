-- Add status column to inquiries and social_leads for CRM-style lead management
ALTER TABLE inquiries ADD COLUMN status TEXT NOT NULL DEFAULT 'lead' CHECK (status IN ('lead', 'targeted', 'contacted'));
ALTER TABLE social_leads ADD COLUMN status TEXT NOT NULL DEFAULT 'lead' CHECK (status IN ('lead', 'targeted', 'contacted'));

-- RLS policy for updating social leads
CREATE POLICY "Authenticated users can update social leads"
  ON social_leads FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
