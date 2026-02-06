-- Content Management Schema: Column → Topic → Posts
-- Run this in your Supabase SQL Editor after project restart
-- Safe to re-run: drops and recreates everything

-- ============================================================
-- 0. CLEAN SLATE
-- ============================================================

drop function if exists public.get_published_content();
drop table if exists public.posts cascade;
drop table if exists public.topics cascade;
drop table if exists public.columns cascade;

-- ============================================================
-- 1. TABLES
-- ============================================================

create table public.columns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  owner_name text,
  owner_avatar_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  column_id uuid not null references public.columns(id) on delete cascade,
  title text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  platform text not null check (platform in ('x', 'medium', 'linkedin', 'instagram', 'youtube')),
  title text not null,
  url text,
  excerpt text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  unique (topic_id, platform)
);

-- ============================================================
-- 2. INDEXES
-- ============================================================

create index idx_topics_column_id on public.topics(column_id);
create index idx_posts_topic_id on public.posts(topic_id);
create index idx_posts_status on public.posts(status);
create index idx_columns_sort_order on public.columns(sort_order);
create index idx_topics_sort_order on public.topics(sort_order);

-- ============================================================
-- 3. ROW LEVEL SECURITY + GRANTS
-- ============================================================

alter table public.columns enable row level security;
alter table public.topics enable row level security;
alter table public.posts enable row level security;

create policy "columns_public_read" on public.columns
  for select using (true);

create policy "topics_public_read" on public.topics
  for select using (true);

create policy "posts_public_read" on public.posts
  for select using (status = 'published');

grant usage on schema public to anon, authenticated;
grant select on public.columns to anon, authenticated;
grant select on public.topics to anon, authenticated;
grant select on public.posts to anon, authenticated;

-- ============================================================
-- 4. RPC FUNCTION (bypasses PostgREST table cache)
-- ============================================================

create or replace function get_published_content()
returns json language sql security definer as $$
  select coalesce(json_agg(t), '[]'::json)
  from (
    select c.*,
      coalesce(
        (select json_agg(topic_row)
         from (
           select tp.*,
             coalesce(
               (select json_agg(p)
                from public.posts p
                where p.topic_id = tp.id and p.status = 'published'),
               '[]'::json
             ) as posts
           from public.topics tp
           where tp.column_id = c.id
           order by tp.sort_order
         ) topic_row),
        '[]'::json
      ) as topics
    from public.columns c
    order by c.sort_order
  ) t;
$$;

grant execute on function public.get_published_content() to anon, authenticated;

-- ============================================================
-- 5. SEED DATA
-- ============================================================

insert into public.columns (title, slug, description, sort_order)
values (
  'AI Agents',
  'ai-agents',
  'Deep dives into AI agent frameworks, patterns, and real-world applications.',
  0
);

insert into public.topics (column_id, title, slug, description, sort_order)
values (
  (select id from public.columns where slug = 'ai-agents'),
  'Vercel Agents vs Claude Agents',
  'vercel-agents-vs-claude-agents',
  'An honest comparison of Vercel AI SDK 6 and Anthropic''s Claude Agent SDK — when to use each, and why the answer is often both.',
  0
);

insert into public.posts (topic_id, platform, title, excerpt, status) values
(
  (select id from public.topics where slug = 'vercel-agents-vs-claude-agents'),
  'x',
  'Vercel AI SDK 6 vs Claude Agent SDK Thread',
  'Vercel AI SDK 6 vs Claude Agent SDK — which should you actually build with? I use both every day. Here''s the honest breakdown.',
  'draft'
),
(
  (select id from public.topics where slug = 'vercel-agents-vs-claude-agents'),
  'medium',
  'Vercel AI SDK vs Claude Agent SDK: Which One Should You Build With?',
  'Both let you build AI agents. Both support tool use and MCP. But they''re built for fundamentally different jobs.',
  'draft'
),
(
  (select id from public.topics where slug = 'vercel-agents-vs-claude-agents'),
  'linkedin',
  'The AI Agent Landscape Just Got Clearer',
  'Two major frameworks are leading the charge for building AI agents in 2026. We use both at Lighten AI — here''s how we think about the difference.',
  'draft'
),
(
  (select id from public.topics where slug = 'vercel-agents-vs-claude-agents'),
  'instagram',
  'Vercel Agents vs Claude Agents — Which One Should You Use?',
  'Neither wins. They solve different problems. Vercel for the interface, Claude for the autonomy.',
  'draft'
),
(
  (select id from public.topics where slug = 'vercel-agents-vs-claude-agents'),
  'youtube',
  'Vercel Agents vs Claude Agents — Which Should You Use?',
  'Both let you build AI agents. Both are open source. But they solve completely different problems.',
  'draft'
);

-- Force PostgREST schema cache reload
notify pgrst, 'reload schema';
