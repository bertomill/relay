-- Add optional organization ID for posting to company pages
alter table social_connections add column if not exists org_id text;
alter table social_connections add column if not exists org_name text;
