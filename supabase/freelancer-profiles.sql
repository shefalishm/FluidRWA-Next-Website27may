-- FluidRWA freelancer marketplace schema
-- Run this in the Supabase SQL editor before turning /specialist-directory into a production marketplace.

create table if not exists public.freelancer_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  free_until timestamptz not null default (now() + interval '3 months'),
  status text not null default 'pending_review',
  payment_status text not null default 'free_trial',
  stripe_customer_id text,
  stripe_subscription_id text,
  full_name text not null,
  contact_email text not null,
  headline text not null,
  category text not null,
  location text,
  rate text,
  availability text,
  years_experience text,
  summary text not null,
  services text[] not null default '{}',
  tags text[] not null default '{}',
  portfolio_url text,
  linkedin_url text,
  github_url text,
  website_url text,
  profile_image_url text,
  resume_file_url text,
  case_study_file_urls text[] not null default '{}',
  uploaded_file_names text[] not null default '{}',
  source text,
  page_url text,
  raw_payload jsonb not null default '{}'::jsonb,
  constraint freelancer_profiles_status_check check (
    status in ('pending_review', 'needs_changes', 'approved', 'rejected', 'expired_trial', 'paid_active')
  ),
  constraint freelancer_profiles_payment_status_check check (
    payment_status in ('free_trial', 'trial_expiring', 'paid_active', 'past_due', 'expired')
  )
);

create index if not exists freelancer_profiles_status_idx on public.freelancer_profiles(status);
create index if not exists freelancer_profiles_category_idx on public.freelancer_profiles(category);
create index if not exists freelancer_profiles_tags_idx on public.freelancer_profiles using gin(tags);
create index if not exists freelancer_profiles_free_until_idx on public.freelancer_profiles(free_until);

create or replace function public.set_freelancer_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists freelancer_profiles_updated_at on public.freelancer_profiles;
create trigger freelancer_profiles_updated_at
before update on public.freelancer_profiles
for each row
execute function public.set_freelancer_profiles_updated_at();

alter table public.freelancer_profiles enable row level security;

drop policy if exists "Approved freelancer profiles are public" on public.freelancer_profiles;
create policy "Approved freelancer profiles are public"
on public.freelancer_profiles
for select
using (status in ('approved', 'paid_active'));

-- Inserts currently happen through the Next.js API route using SUPABASE_SERVICE_ROLE_KEY.
-- Keep direct browser inserts disabled unless you add captcha and a stricter public insert policy.

create table if not exists public.freelancer_marketplace_waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text not null,
  company text,
  role text,
  auth_method text,
  source text,
  page_url text,
  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists freelancer_marketplace_waitlist_email_idx on public.freelancer_marketplace_waitlist(email);
create index if not exists freelancer_marketplace_waitlist_role_idx on public.freelancer_marketplace_waitlist(role);

alter table public.freelancer_marketplace_waitlist enable row level security;

create table if not exists public.freelancer_intro_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  buyer_name text,
  buyer_email text not null,
  company text,
  project text not null,
  freelancer_id text,
  freelancer_name text,
  freelancer_category text,
  source text,
  page_url text,
  status text not null default 'new',
  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists freelancer_intro_requests_buyer_email_idx on public.freelancer_intro_requests(buyer_email);
create index if not exists freelancer_intro_requests_freelancer_id_idx on public.freelancer_intro_requests(freelancer_id);
create index if not exists freelancer_intro_requests_status_idx on public.freelancer_intro_requests(status);

alter table public.freelancer_intro_requests enable row level security;

-- Buyer access/auth notes:
-- 1. In Supabase Auth, enable Google OAuth for buyer signup.
-- 2. Enable LinkedIn/OIDC if available in your Supabase project, or route LinkedIn through a custom OAuth provider.
-- 3. Directory pages should only show approved/paid_active profiles to signed-in users.
-- 4. Buyers should submit intro requests instead of seeing direct freelancer contact details.
