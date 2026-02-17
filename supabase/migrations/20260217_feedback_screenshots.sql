-- Add screenshot_url column to feedback table
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS screenshot_url TEXT;

-- Create a public storage bucket for feedback screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('feedback-screenshots', 'feedback-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to feedback-screenshots bucket
CREATE POLICY "feedback_screenshots_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'feedback-screenshots');

-- Allow anyone to upload to feedback-screenshots bucket (public feedback form)
CREATE POLICY "feedback_screenshots_public_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'feedback-screenshots');

NOTIFY pgrst, 'reload schema';
