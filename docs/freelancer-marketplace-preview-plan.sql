-- FluidRWA freelancer marketplace production setup draft
-- Preview route: /freelancers-preview
-- Purpose: let freelancers submit portfolio listings, appear after approval, and convert to paid listings after 3 months.

create table if not exists freelancer_profiles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  free_until timestamptz,
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
  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists freelancer_profiles_status_idx on freelancer_profiles(status);
create index if not exists freelancer_profiles_category_idx on freelancer_profiles(category);
create index if not exists freelancer_profiles_tags_idx on freelancer_profiles using gin(tags);

-- Recommended statuses:
-- pending_review: submitted but not public
-- approved: visible in the freelancer directory
-- rejected: hidden, keep for audit trail
-- needs_changes: hidden until profile is improved
-- expired_trial: hidden or downgraded after free period
-- paid_active: visible paid listing

-- Recommended Supabase storage buckets:
-- freelancer-profile-images: public images after approval
-- freelancer-portfolio-files: private until approved, then signed URLs or copied public assets

-- Recommended automation:
-- 1. On insert, email FluidRWA with profile details.
-- 2. Set free_until = created_at + interval '3 months'.
-- 3. Admin approves/rejects in a private review dashboard.
-- 4. 14 days before free_until, email freelancer about paid upgrade.
-- 5. After free_until, require Stripe subscription to remain listed.

-- Current preview API route:
-- POST /api/freelancer-profile
-- Inserts into freelancer_profiles with status='pending_review' and payment_status='free_trial'.
-- The public directory should only query status in ('approved', 'paid_active') once this moves out of preview.
