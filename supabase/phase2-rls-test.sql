begin;
insert into auth.users(id,email) values ('00000000-0000-4000-8000-000000000001','phase2-owner-a@example.invalid'),('00000000-0000-4000-8000-000000000002','phase2-owner-b@example.invalid');
insert into public.contact_requests(user_id,subject,message) values ('00000000-0000-4000-8000-000000000002','Private B','Private test message belonging to a different user.');
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}',true);
do $$ begin
 if (select count(*) from public.contact_requests)<>0 then raise exception 'Cross-user data visible';end if;
 begin
  insert into public.contact_requests(user_id,subject,message) values ('00000000-0000-4000-8000-000000000002','Wrong owner','This must never be allowed to save under another owner.');
  raise exception 'Cross-user insert allowed';
 exception when insufficient_privilege then null;end;
 for i in 1..5 loop
  insert into public.contact_requests(user_id,subject,message) values ('00000000-0000-4000-8000-000000000001','Owner A','Valid rate-limit fixture message number '||i);
 end loop;
 if (select count(*) from public.contact_requests)<>5 then raise exception 'Own rows unavailable';end if;
 begin
  insert into public.contact_requests(user_id,subject,message) values ('00000000-0000-4000-8000-000000000001','Owner A','The sixth request must be rate-limited.');
  raise exception 'Rate limit failed' using errcode='P0002';
 exception when sqlstate 'P0001' then null;end;
end $$;
reset role;
rollback;
select 'PASS: owner isolation, cross-owner insert rejection, five-per-hour cap; test rows rolled back' as result;
