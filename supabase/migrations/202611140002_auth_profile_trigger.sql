-- Create a basic profile automatically after a successful Supabase Auth signup.
-- This avoids requiring browser clients to insert profile rows manually.
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.user_profiles (id, display_name, preferred_language, role)
  values (
    new.id,
    nullif(left(coalesce(new.raw_user_meta_data ->> 'display_name', ''), 80), ''),
    case
      when new.raw_user_meta_data ->> 'preferred_language' in ('da', 'en', 'ar')
        then new.raw_user_meta_data ->> 'preferred_language'
      else 'da'
    end,
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_user_profile();

-- Keep the trigger function inaccessible to ordinary API roles.
revoke all on function public.handle_new_user_profile() from public, anon, authenticated;
