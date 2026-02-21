create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  rating integer not null check (rating >= 1 and rating <= 5),
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.reviews enable row level security;

-- Allow inserts from anyone (public reviews form)
create policy "Anyone can submit a review"
  on public.reviews for insert
  with check (true);

-- Only authenticated users (admins) can read reviews
create policy "Authenticated users can read reviews"
  on public.reviews for select
  using (auth.role() = 'authenticated');
