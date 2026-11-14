-- TilbudJagt.dk initial production data model
-- Apply only to a new Supabase project after reviewing the setup guide.

create extension if not exists pgcrypto;

create table public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text not null default 'da' check (preferred_language in ('da','en','ar')),
  role text not null default 'user' check (role in ('user','merchant','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.prevent_profile_role_change()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  if old.role is distinct from new.role and coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'Profile role can only be changed by a trusted server process';
  end if;
  return new;
end;
$$;

create trigger user_profiles_protect_role
before update on public.user_profiles
for each row execute function public.prevent_profile_role_change();

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.user_profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  website_url text,
  logo_url text,
  country_code text not null default 'DK',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  title_da text not null,
  title_en text,
  title_ar text,
  description_da text,
  description_en text,
  description_ar text,
  category text not null,
  price numeric(12,2),
  original_price numeric(12,2),
  currency text not null default 'DKK' check (currency = 'DKK'),
  product_url text not null,
  image_url text,
  source text not null default 'community' check (source in ('community','awin','merchant','admin')),
  external_id text,
  starts_at timestamptz,
  expires_at timestamptz,
  status text not null default 'pending' check (status in ('pending','active','rejected','expired')),
  is_sponsored boolean not null default false,
  sponsor_label text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, external_id),
  check (price is null or price >= 0),
  check (original_price is null or original_price >= 0),
  check (expires_at is null or starts_at is null or expires_at > starts_at)
);

create index offers_public_listing_idx on public.offers(status, expires_at desc, created_at desc);
create index offers_category_idx on public.offers(category, status);
create index offers_store_idx on public.offers(store_id, status);

create table public.saved_offers (
  user_id uuid not null references auth.users(id) on delete cascade,
  offer_id uuid not null references public.offers(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, offer_id)
);

create table public.offer_comments (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.offers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table public.user_interests (
  user_id uuid primary key references auth.users(id) on delete cascade,
  categories text[] not null default '{}',
  preferred_stores uuid[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table public.merchant_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_name text not null,
  contact_email text not null,
  website_url text,
  offer_details text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan text not null default 'vip_monthly' check (plan = 'vip_monthly'),
  price_dkk numeric(8,2) not null default 40 check (price_dkk = 40),
  status text not null default 'inactive' check (status in ('inactive','active','past_due','canceled','incomplete')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.feed_imports (
  id uuid primary key default gen_random_uuid(),
  network text not null default 'awin',
  advertiser_name text,
  feed_reference text,
  imported_count integer not null default 0,
  failed_count integer not null default 0,
  status text not null default 'queued' check (status in ('queued','running','completed','failed')),
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;
alter table public.stores enable row level security;
alter table public.offers enable row level security;
alter table public.saved_offers enable row level security;
alter table public.offer_comments enable row level security;
alter table public.user_interests enable row level security;
alter table public.merchant_submissions enable row level security;
alter table public.memberships enable row level security;
alter table public.feed_imports enable row level security;

create policy "Profiles are viewable by their owner or admins"
on public.user_profiles for select to authenticated
using (id = auth.uid() or public.is_admin());

create policy "Users can create their own profile"
on public.user_profiles for insert to authenticated
with check (id = auth.uid() and role = 'user');

create policy "Users can update their own basic profile"
on public.user_profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "Active stores are public"
on public.stores for select to anon, authenticated
using (is_active or public.is_admin());

create policy "Admins manage stores"
on public.stores for all to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Published offers are public"
on public.offers for select to anon, authenticated
using ((status = 'active' and (expires_at is null or expires_at > now())) or public.is_admin());

create policy "Authenticated users submit offers for review"
on public.offers for insert to authenticated
with check (created_by = auth.uid() and status = 'pending' and is_sponsored = false);

create policy "Admins manage offers"
on public.offers for all to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Users manage their saved offers"
on public.saved_offers for all to authenticated
using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Approved comments are public"
on public.offer_comments for select to anon, authenticated
using (status = 'approved' or user_id = auth.uid() or public.is_admin());

create policy "Users submit comments for moderation"
on public.offer_comments for insert to authenticated
with check (user_id = auth.uid() and status = 'pending');

create policy "Admins moderate comments"
on public.offer_comments for all to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Users manage their interests"
on public.user_interests for all to authenticated
using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Users create merchant submissions"
on public.merchant_submissions for insert to authenticated
with check (user_id = auth.uid() and status = 'pending');

create policy "Users view their merchant submissions"
on public.merchant_submissions for select to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Admins review merchant submissions"
on public.merchant_submissions for update to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Users view their membership"
on public.memberships for select to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Admins view feed import history"
on public.feed_imports for select to authenticated
using (public.is_admin());

-- Membership and Stripe fields are intentionally not writable from browser clients.
-- Update them only from a verified Stripe webhook using the Supabase service role.
