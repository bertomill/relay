-- Add image_url column to topics table for thumbnail images
alter table public.topics add column if not exists image_url text;

-- Create a public storage bucket for content images (if it doesn't exist)
insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

-- Allow public read access to content-images bucket
create policy "content_images_public_read" on storage.objects
  for select using (bucket_id = 'content-images');

-- Allow authenticated users to upload to content-images bucket
create policy "content_images_auth_insert" on storage.objects
  for insert with check (bucket_id = 'content-images');

-- Recreate RPC to include the new column (tp.* already covers it,
-- but refresh the function to bust any cache)
-- NOTE: This RPC is superseded by 20260207_rename_themes_to_columns.sql
-- which renames themes→columns and theme_id→column_id.
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

-- Force PostgREST schema cache reload
notify pgrst, 'reload schema';
