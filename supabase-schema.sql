-- Spiegel Business School complete Supabase setup.
-- Run this entire script in the new project's Supabase SQL Editor.
-- It is safe to run again: tables and seed rows are not duplicated.

create extension if not exists pgcrypto;

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  title text not null,
  type text not null default 'image' check (type in ('image', 'video')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  title text not null,
  category text not null,
  date text not null,
  description text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  course_interest text,
  message text not null,
  status text not null default 'New',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_settings (
  id integer primary key default 1 check (id = 1),
  password text not null
);

grant usage on schema public to anon, authenticated;
grant select on public.gallery, public.programs, public.enquiries, public.admin_settings to anon, authenticated;
grant insert, update, delete on public.gallery, public.programs, public.enquiries, public.admin_settings to anon, authenticated;

alter table public.gallery enable row level security;
alter table public.programs enable row level security;
alter table public.enquiries enable row level security;
alter table public.admin_settings enable row level security;

drop policy if exists "Public can read gallery" on public.gallery;
create policy "Public can read gallery" on public.gallery for select to anon, authenticated using (true);
drop policy if exists "Public can insert gallery" on public.gallery;
create policy "Public can insert gallery" on public.gallery for insert to anon, authenticated with check (true);
drop policy if exists "Public can update gallery" on public.gallery;
create policy "Public can update gallery" on public.gallery for update to anon, authenticated using (true) with check (true);
drop policy if exists "Public can delete gallery" on public.gallery;
create policy "Public can delete gallery" on public.gallery for delete to anon, authenticated using (true);

drop policy if exists "Public can read programs" on public.programs;
create policy "Public can read programs" on public.programs for select to anon, authenticated using (true);
drop policy if exists "Public can insert programs" on public.programs;
create policy "Public can insert programs" on public.programs for insert to anon, authenticated with check (true);
drop policy if exists "Public can update programs" on public.programs;
create policy "Public can update programs" on public.programs for update to anon, authenticated using (true) with check (true);
drop policy if exists "Public can delete programs" on public.programs;
create policy "Public can delete programs" on public.programs for delete to anon, authenticated using (true);

drop policy if exists "Public can insert enquiries" on public.enquiries;
create policy "Public can insert enquiries" on public.enquiries for insert to anon, authenticated with check (true);
drop policy if exists "Public can read enquiries" on public.enquiries;
create policy "Public can read enquiries" on public.enquiries for select to anon, authenticated using (true);
drop policy if exists "Public can update enquiries" on public.enquiries;
create policy "Public can update enquiries" on public.enquiries for update to anon, authenticated using (true) with check (true);
drop policy if exists "Public can delete enquiries" on public.enquiries;
create policy "Public can delete enquiries" on public.enquiries for delete to anon, authenticated using (true);

drop policy if exists "Public can read admin settings" on public.admin_settings;
create policy "Public can read admin settings" on public.admin_settings for select to anon, authenticated using (true);
drop policy if exists "Public can insert admin settings" on public.admin_settings;
create policy "Public can insert admin settings" on public.admin_settings for insert to anon, authenticated with check (true);
drop policy if exists "Public can update admin settings" on public.admin_settings;
create policy "Public can update admin settings" on public.admin_settings for update to anon, authenticated using (true) with check (true);

insert into public.admin_settings (id, password)
values (1, 'Spiegel123')
on conflict (id) do update set password = excluded.password;

insert into public.gallery (url, title, type)
select seed.url, seed.title, seed.type
from (values
  ('https://i.ibb.co/nN6GRvpR/1119707526127202818.jpg', 'Training sessions', 'image'),
  ('https://i.ibb.co/HDBP678Z/1019924646848076011.jpg', 'Holiday lessons', 'image'),
  ('https://i.ibb.co/C54jPp11/dddd.jpg', 'Computer classes', 'image'),
  ('https://i.ibb.co/0psvNNL1/ppppp.jpg', 'Workshops', 'image'),
  ('https://i.ibb.co/ZzNP8ZyB/Akilah.jpg', 'Graduations', 'image')
) as seed(url, title, type)
where not exists (select 1 from public.gallery existing where existing.url = seed.url);

insert into public.programs (title, description, category, image, date)
select seed.title, seed.description, seed.category, seed.image, seed.date
from (values
  ('WAEC, JAMB & GCE Post-UTME Lessons', 'Focused post-UTME preparation for WAEC, JAMB, and GCE candidates, with structured lessons designed to strengthen subject knowledge and exam readiness.', 'Academic Lessons', 'https://i.ibb.co/whpbF6H8/IMG-20260627-WA0053.jpg', 'Registration Ongoing'),
  ('Basic Computer Training', 'Practical computer training covering Microsoft Office and productivity packages, computer literacy, front-end web design, back-end development, programming, kids coding, animation, digital marketing, mobile apps, and computer-aided design.', 'Technology', 'https://i.ibb.co/DHdZb9cR/IMG-20260627-WA0054.jpg', 'Registration Open'),
  ('3-in-1 Certificate Courses in Human Resources', 'A three-part Human Resources certification pathway offering Associate Membership, a Postgraduate Diploma in Human Resources Management, and Certified Human Resources Manager certification.', 'Human Resources', 'https://i.ibb.co/B5D6ph4h/IMG-20260627-WA0055.jpg', 'Registration Open'),
  ('CIPM Induction & Investiture Ceremony', 'A Chartered Institute of Personnel Management ceremony celebrating new members and inductees across Associate, Fellow, Doctoral Fellow, Senior Fellow, and Platinum Fellow grades.', 'Professional Event', 'https://i.ibb.co/S4V9qTMK/IMG-20260627-WA0056.jpg', 'Prestigious Event'),
  ('Basic Computer Training', 'Build essential digital skills through training in Microsoft Office, computer literacy, office productivity, front-end web design, back-end development, programming, coding clubs, animation, digital marketing, mobile apps, and computer-aided design.', 'Technology', 'https://i.ibb.co/1GbJctHr/IMG-20260627-WA0057.jpg', 'Registration Open'),
  ('3-in-1 Logistics & Supply Chain Certification', 'A Chartered Institute of Supply Chain Management certification pathway combining Associate Membership, Associate Membership of the Chartered Institute of Warehouse Management, and a Postgraduate Diploma.', 'Logistics & Supply Chain', 'https://i.ibb.co/mr9gDyXt/IMG-20260627-WA0058.jpg', 'Registration Open'),
  ('3-in-1 Customer Relations Certification', 'Professional customer-relations training leading to Associate Membership, a Postgraduate Diploma in Customer Relationship Management, and Certified Customer Services Professional certification.', 'Customer Relations', 'https://i.ibb.co/G3dJfVgn/IMG-20260627-WA0059.jpg', 'Registration Open'),
  ('Business Science, Arts & Technology Programs', 'Apply for MBA and executive programs, workshops, cutting-edge curriculum, networking opportunities, expert faculty and mentors, holiday lessons, adult education, and ICT services including rendering scholarships and academic application support.', 'Business School', 'https://i.ibb.co/6cR7F03g/IMG-20260627-WA0041.jpg', 'Applications Open')
) as seed(title, description, category, image, date)
where not exists (select 1 from public.programs existing where existing.image = seed.image);
