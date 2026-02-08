-- Outreach contacts CRM table
CREATE TABLE outreach_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  outreach_date DATE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('warm', 'cold', 'referral')),
  linkedin_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'contacted'
    CHECK (status IN ('contacted', 'replied', 'meeting', 'converted', 'not_interested')),
  source TEXT
);

-- RLS
ALTER TABLE outreach_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read outreach contacts"
  ON outreach_contacts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert outreach contacts"
  ON outreach_contacts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update outreach contacts"
  ON outreach_contacts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete outreach contacts"
  ON outreach_contacts FOR DELETE
  USING (auth.role() = 'authenticated');

-- Indexes for common query patterns
CREATE INDEX idx_outreach_contacts_date ON outreach_contacts (outreach_date DESC);
CREATE INDEX idx_outreach_contacts_status ON outreach_contacts (status);
