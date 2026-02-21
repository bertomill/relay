CREATE TABLE scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('x','linkedin','linkedin_org','instagram','medium','facebook')),
  text TEXT NOT NULL,
  image_url TEXT,
  markdown_content TEXT,
  as_organization BOOLEAN DEFAULT FALSE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','published','failed','cancelled')),
  error_message TEXT,
  post_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own scheduled posts"
  ON scheduled_posts FOR ALL
  USING (auth.uid() = user_id);

-- Index for the cron job to find due posts efficiently
CREATE INDEX idx_scheduled_posts_pending ON scheduled_posts (scheduled_at)
  WHERE status = 'pending';
