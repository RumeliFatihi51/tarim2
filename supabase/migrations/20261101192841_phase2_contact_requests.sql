-- AgroMax Phase 2 contact intake, owner-only RLS and per-user concurrency-safe rate limit.
-- Created with supabase migration new phase2_contact_requests.
create table if not exists public.contact_requests (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 subject text not null check (char_length(subject) between 4 and 120),
 message text not null check (char_length(message) between 20 and 4000),
 created_at timestamptz not null default now()
);
alter table public.contact_requests enable row level security;
revoke all on public.contact_requests from anon;
revoke all on public.contact_requests from authenticated;
grant select on public.contact_requests to authenticated;
grant insert(user_id,subject,message) on public.contact_requests to authenticated;
create index if not exists contact_requests_owner_time on public.contact_requests(user_id,created_at desc);
create policy "Read own contact requests" on public.contact_requests for select to authenticated using ((select auth.uid())=user_id);
create policy "Create own confirmed request" on public.contact_requests for insert to authenticated with check (
 (select auth.uid())=user_id
);
-- No update/delete permission. No privileged function or public-readable inbox.
-- Database policies do not replace public endpoint anti-abuse controls; use verified accounts.

-- Concurrent per-user limit; invoker keeps the owner RLS policy in force.
create or replace function public.limit_contact_requests() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.user_id::text,0));
 if (select count(*) from public.contact_requests where user_id=new.user_id and created_at>now()-interval '1 hour')>=5 then
  raise exception 'Contact request limit reached' using errcode='P0001';
 end if;
 return new;
end $$;
revoke all on function public.limit_contact_requests() from public;
grant execute on function public.limit_contact_requests() to authenticated;
create trigger contact_request_rate_limit before insert on public.contact_requests for each row execute function public.limit_contact_requests();
-- Enable email confirmations in Auth configuration before exposing authenticated intake.
