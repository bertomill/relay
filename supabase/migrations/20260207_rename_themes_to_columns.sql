-- Rename themes → columns, add owner fields, update foreign keys
-- Run this in your Supabase SQL Editor

-- ============================================================
-- 1. RENAME TABLE: themes → columns
-- ============================================================

alter table public.themes rename to columns;

-- ============================================================
-- 2. RENAME FK COLUMN: topics.theme_id → topics.column_id
-- ============================================================

alter table public.topics rename column theme_id to column_id;

-- ============================================================
-- 3. ADD OWNER FIELDS
-- ============================================================

alter table public.columns add column if not exists owner_name text;
alter table public.columns add column if not exists owner_avatar_url text;

-- ============================================================
-- 4. RENAME INDEXES
-- ============================================================

alter index if exists idx_topics_theme_id rename to idx_topics_column_id;
alter index if exists idx_themes_sort_order rename to idx_columns_sort_order;

-- ============================================================
-- 5. RENAME RLS POLICIES
-- ============================================================

alter policy "themes_public_read" on public.columns rename to "columns_public_read";

-- ============================================================
-- 6. RECREATE RPC WITH NEW TABLE/COLUMN NAMES
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

-- ============================================================
-- 7. UPDATE GRANTS
-- ============================================================

grant select on public.columns to anon, authenticated;

-- Force PostgREST schema cache reload
notify pgrst, 'reload schema';
