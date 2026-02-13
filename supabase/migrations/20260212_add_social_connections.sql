-- Social connections: store OAuth tokens for X and LinkedIn
create table if not exists social_connections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null check (platform in ('x', 'linkedin')),
  access_token text not null,
  refresh_token text,
  token_expires_at timestamptz,
  platform_user_id text,
  profile_name text,
  profile_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, platform)
);

-- RLS: users can only access their own rows
alter table social_connections enable row level security;

create policy "Users can view own social connections"
  on social_connections for select
  using (auth.uid() = user_id);

create policy "Users can insert own social connections"
  on social_connections for insert
  with check (auth.uid() = user_id);

create policy "Users can update own social connections"
  on social_connections for update
  using (auth.uid() = user_id);

create policy "Users can delete own social connections"
  on social_connections for delete
  using (auth.uid() = user_id);

-- Service role bypass for API routes that use service role client
-- (The API routes use the user's session to verify auth, then use service role for token storage)
