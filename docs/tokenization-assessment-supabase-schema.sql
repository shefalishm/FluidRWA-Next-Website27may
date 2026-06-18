-- FluidRWA Tokenization Readiness & Budget Assessment
-- Preview note: if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set,
-- the Next.js API route returns preview mode and the UI stores a local test backup.
-- Use this schema when the assessment is ready to collect production leads.
-- Keep the service role key server-side only. Do not expose it as NEXT_PUBLIC_*.

create table if not exists public.assessment_budget_assumptions (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  low_usd integer not null,
  high_usd integer not null,
  complexity_multiplier numeric(5,2) not null default 1.00,
  rule text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assessment_recommendation_rules (
  id uuid primary key default gen_random_uuid(),
  vendor_category text not null,
  trigger_question_id text not null,
  trigger_values text[] not null,
  reason text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tokenization_assessments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  country text,
  asset_type text,
  readiness_score integer not null check (readiness_score >= 0 and readiness_score <= 100),
  readiness_classification text not null,
  complexity_rating text not null,
  timeline_estimate text not null,
  budget_low_usd integer not null,
  budget_high_usd integer not null,
  budget_range text not null,
  user_name text,
  user_email text not null,
  company text,
  role text,
  consent boolean not null default false,
  answers jsonb not null,
  pillar_scores jsonb not null,
  complexity_trace jsonb not null,
  budget_trace jsonb not null,
  recommendation_trace jsonb not null
);

create table if not exists public.tokenization_assessment_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  assessment_id uuid references public.tokenization_assessments(id) on delete set null,
  event_name text not null,
  page_path text,
  asset_type text,
  country text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists tokenization_assessments_created_at_idx
  on public.tokenization_assessments (created_at desc);

create index if not exists tokenization_assessments_asset_type_idx
  on public.tokenization_assessments (asset_type);

create index if not exists tokenization_assessments_country_idx
  on public.tokenization_assessments (country);

create index if not exists tokenization_assessment_events_name_idx
  on public.tokenization_assessment_events (event_name, created_at desc);
