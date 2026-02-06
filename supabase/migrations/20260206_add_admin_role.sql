-- Set bertmill19@gmail.com as admin via app_metadata
-- This metadata is included in the JWT token and accessible client-side
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"is_admin": true}'::jsonb
WHERE email = 'bertmill19@gmail.com';
