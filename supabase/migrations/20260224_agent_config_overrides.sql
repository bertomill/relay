-- Agent config overrides: allows editing system prompts and tools from the admin UI
create table agent_config_overrides (
  agent_id text primary key,
  system_prompt text not null,
  allowed_tools text[] not null default '{}',
  updated_at timestamptz default now()
);

alter table agent_config_overrides enable row level security;

create policy "Authenticated users can manage configs"
  on agent_config_overrides for all
  using (auth.role() = 'authenticated');
