create table if not exists community_tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  is_completed boolean default false not null,
  created_at timestamptz default now() not null
);

alter table community_tasks enable row level security;

create policy "Users can manage their own community tasks"
  on community_tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
