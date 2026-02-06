-- Create inquiries table with all structured fields for the contact form
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  role TEXT,
  website TEXT,
  company_size TEXT,
  annual_revenue TEXT,
  project_budget TEXT,
  services TEXT
);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the API (anon/service role)
CREATE POLICY "Allow public inserts" ON inquiries
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admin) can read
CREATE POLICY "Allow authenticated reads" ON inquiries
  FOR SELECT
  USING (auth.role() = 'authenticated');
