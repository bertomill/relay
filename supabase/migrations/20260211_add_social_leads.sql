-- Social leads table for tracking inbound interest from social platforms
CREATE TABLE social_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('linkedin','x','medium','youtube','instagram','tiktok')),
  contact_name TEXT NOT NULL,
  profile_url TEXT,
  message_summary TEXT,
  lead_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- RLS
ALTER TABLE social_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read social leads"
  ON social_leads FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert social leads"
  ON social_leads FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete social leads"
  ON social_leads FOR DELETE
  USING (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_social_leads_platform ON social_leads (platform);
CREATE INDEX idx_social_leads_date ON social_leads (lead_date DESC);
CREATE INDEX idx_social_leads_platform_date ON social_leads (platform, lead_date DESC);
