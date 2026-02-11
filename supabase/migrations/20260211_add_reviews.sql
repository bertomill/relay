create table reviews (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  rating integer check (rating >= 1 and rating <= 5),
  message text not null,
  created_at timestamptz default now()
);

alter table reviews enable row level security;

create policy "Allow inserts from service role"
  on reviews for insert
  with check (true);
