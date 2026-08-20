-- FluidRWA automated market signals.
-- Run this once in Supabase SQL Editor before relying on the Cron ingestion route.

create extension if not exists pgcrypto;

create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  imported_at timestamptz not null default now(),
  source_name text not null,
  source_url text,
  title text not null,
  canonical_url text not null unique,
  summary text,
  image_url text,
  category text not null default 'Institutional Adoption',
  published_at timestamptz not null default now(),
  status text not null default 'published',
  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists news_items_published_at_idx on public.news_items (published_at desc);
create index if not exists news_items_category_idx on public.news_items (category);
create index if not exists news_items_status_idx on public.news_items (status);

create table if not exists public.job_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  imported_at timestamptz not null default now(),
  company_name text not null,
  company_url text,
  title text not null,
  canonical_url text not null unique,
  location text,
  department text,
  category text not null default 'Blockchain Ecosystems',
  source_name text not null default 'Public job board',
  posted_at timestamptz not null default now(),
  expires_at timestamptz,
  status text not null default 'published',
  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists job_items_posted_at_idx on public.job_items (posted_at desc);
create index if not exists job_items_category_idx on public.job_items (category);
create index if not exists job_items_status_idx on public.job_items (status);
create index if not exists job_items_expires_at_idx on public.job_items (expires_at);

create or replace function public.set_market_signal_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_news_items_updated_at on public.news_items;
create trigger set_news_items_updated_at
before update on public.news_items
for each row execute function public.set_market_signal_updated_at();

drop trigger if exists set_job_items_updated_at on public.job_items;
create trigger set_job_items_updated_at
before update on public.job_items
for each row execute function public.set_market_signal_updated_at();

alter table public.news_items enable row level security;
alter table public.job_items enable row level security;

drop policy if exists "Public can read published news items" on public.news_items;
create policy "Public can read published news items"
on public.news_items for select
using (status = 'published');

drop policy if exists "Public can read published job items" on public.job_items;
create policy "Public can read published job items"
on public.job_items for select
using (status = 'published' and (expires_at is null or expires_at > now()));
