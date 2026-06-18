create extension if not exists pgcrypto;

create table if not exists public.family_office_stack_assessments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  country text,
  office_type text,
  complexity_profile text,
  service_stack_score integer not null,
  classification text not null,
  user_name text not null,
  user_email text not null,
  family_office text not null,
  role text,
  consent boolean not null default false,
  answers jsonb not null default '{}'::jsonb,
  pillar_scores jsonb not null default '[]'::jsonb,
  provider_stack jsonb not null default '[]'::jsonb,
  gaps jsonb not null default '[]'::jsonb,
  strengths jsonb not null default '[]'::jsonb,
  risk_alerts jsonb not null default '[]'::jsonb,
  next_steps jsonb not null default '[]'::jsonb
);

create table if not exists public.family_office_stack_assessment_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  assessment_id uuid references public.family_office_stack_assessments(id) on delete cascade,
  event_name text not null,
  page_path text,
  country text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists family_office_stack_assessments_created_at_idx
  on public.family_office_stack_assessments (created_at desc);

create index if not exists family_office_stack_assessments_email_idx
  on public.family_office_stack_assessments (user_email);

create index if not exists family_office_stack_assessments_score_idx
  on public.family_office_stack_assessments (service_stack_score);

alter table public.family_office_stack_assessments enable row level security;
alter table public.family_office_stack_assessment_events enable row level security;
