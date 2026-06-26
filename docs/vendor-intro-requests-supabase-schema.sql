-- FluidRWA vendor intro and submit-requirement lead capture
-- Run once in the Supabase SQL editor before production collection.
-- The Next.js API route writes to this table using SUPABASE_SERVICE_ROLE_KEY server-side.

create table if not exists public.vendor_intro_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new',
  vendor_name text,
  vendor_category text,
  request_source text,
  page_url text,
  lead_source text,
  contact_email text not null,
  first_name text not null,
  last_name text not null,
  title text,
  company_name text not null,
  phone text,
  country text,
  website text,
  linkedin text,
  project_description text not null,
  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists vendor_intro_requests_created_at_idx
  on public.vendor_intro_requests (created_at desc);

create index if not exists vendor_intro_requests_vendor_name_idx
  on public.vendor_intro_requests (vendor_name);

create index if not exists vendor_intro_requests_vendor_category_idx
  on public.vendor_intro_requests (vendor_category);

create index if not exists vendor_intro_requests_status_idx
  on public.vendor_intro_requests (status, created_at desc);
