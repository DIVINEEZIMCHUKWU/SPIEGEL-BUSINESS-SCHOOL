-- Run this in Supabase SQL Editor.
-- It creates the default admin password and enables the policies needed
-- by the static Truehost frontend using the Supabase anon key.

insert into public.admin_settings (id, password)
values (1, 'Spiegel123')
on conflict (id) do update set password = excluded.password;

alter table public.gallery enable row level security;
alter table public.programs enable row level security;
alter table public.enquiries enable row level security;
alter table public.admin_settings enable row level security;

drop policy if exists "Public can read gallery" on public.gallery;
create policy "Public can read gallery"
on public.gallery for select to anon, authenticated using (true);

drop policy if exists "Public can read programs" on public.programs;
create policy "Public can read programs"
on public.programs for select to anon, authenticated using (true);

drop policy if exists "Public can insert enquiries" on public.enquiries;
create policy "Public can insert enquiries"
on public.enquiries for insert to anon, authenticated with check (true);

-- The dashboard uses the anon key for its static-hosting login and management.
drop policy if exists "Public can read admin settings" on public.admin_settings;
create policy "Public can read admin settings"
on public.admin_settings for select to anon, authenticated using (true);

drop policy if exists "Public can insert gallery" on public.gallery;
create policy "Public can insert gallery"
on public.gallery for insert to anon, authenticated with check (true);

drop policy if exists "Public can update gallery" on public.gallery;
create policy "Public can update gallery"
on public.gallery for update to anon, authenticated using (true) with check (true);

drop policy if exists "Public can delete gallery" on public.gallery;
create policy "Public can delete gallery"
on public.gallery for delete to anon, authenticated using (true);

drop policy if exists "Public can insert programs" on public.programs;
create policy "Public can insert programs"
on public.programs for insert to anon, authenticated with check (true);

drop policy if exists "Public can update programs" on public.programs;
create policy "Public can update programs"
on public.programs for update to anon, authenticated using (true) with check (true);

drop policy if exists "Public can delete programs" on public.programs;
create policy "Public can delete programs"
on public.programs for delete to anon, authenticated using (true);

drop policy if exists "Public can update enquiries" on public.enquiries;
create policy "Public can update enquiries"
on public.enquiries for update to anon, authenticated using (true) with check (true);

drop policy if exists "Public can delete enquiries" on public.enquiries;
create policy "Public can delete enquiries"
on public.enquiries for delete to anon, authenticated using (true);

drop policy if exists "Public can insert admin settings" on public.admin_settings;
create policy "Public can insert admin settings"
on public.admin_settings for insert to anon, authenticated with check (true);

drop policy if exists "Public can update admin settings" on public.admin_settings;
create policy "Public can update admin settings"
on public.admin_settings for update to anon, authenticated using (true) with check (true);
