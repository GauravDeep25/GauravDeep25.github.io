-- ==============================================================================
-- Supabase Schema & Row Level Security (RLS) Setup
-- For Editorial Minimalist Portfolio (Gaurav Deep)
-- Run this complete script in the Supabase SQL Editor (SQL Editor > New Query)
-- ==============================================================================

-- 1. Create Tables

create table if not exists profile (
  id int primary key default 1,
  name text,
  role text,
  location text,
  tagline text,
  short_bio text,
  long_bio text,
  email text,
  avatar_url text,
  updated_at timestamptz default now(),
  constraint singleton check (id = 1)
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tech_stack text,
  year int,
  description text,
  link_url text,
  link_label text,
  image_path text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  caption text not null,
  body text,
  achieved_on date default current_date,
  image_path text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists capabilities (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order int default 0
);

create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order int default 0
);

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text,
  image_url text not null,
  location text,
  camera_info text,
  category text,
  year int default 2026,
  sort_order int default 0,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security (RLS) on all tables

alter table profile enable row level security;
alter table projects enable row level security;
alter table achievements enable row level security;
alter table capabilities enable row level security;
alter table tools enable row level security;
alter table photos enable row level security;

-- Drop existing policies if re-running
drop policy if exists "public read" on profile;
drop policy if exists "public read" on projects;
drop policy if exists "public read" on achievements;
drop policy if exists "public read" on capabilities;
drop policy if exists "public read" on tools;
drop policy if exists "public read" on photos;

drop policy if exists "admin write" on profile;
drop policy if exists "admin write" on projects;
drop policy if exists "admin write" on achievements;
drop policy if exists "admin write" on capabilities;
drop policy if exists "admin write" on tools;
drop policy if exists "admin write" on photos;

-- 3. Create Public Read Policies (Anyone with anon key can read)

create policy "public read" on profile for select using (true);
create policy "public read" on projects for select using (true);
create policy "public read" on achievements for select using (true);
create policy "public read" on capabilities for select using (true);
create policy "public read" on tools for select using (true);
create policy "public read" on photos for select using (true);

-- 4. Create Admin Write Policies (Only authenticated Supabase users can insert/update/delete)

create policy "admin write" on profile for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin write" on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin write" on achievements for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin write" on capabilities for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin write" on tools for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin write" on photos for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin write" on capabilities for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin write" on tools for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. Storage Bucket Configuration for 'portfolio-media'
-- Creates the bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

-- Storage policies: public can view images, authenticated admin can upload/delete
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Admin Upload" on storage.objects;
drop policy if exists "Admin Delete" on storage.objects;

create policy "Public Access"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');

create policy "Admin Upload"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

create policy "Admin Delete"
  on storage.objects for delete
  using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

-- 6. Initial Seed Content (Gaurav Deep starter data)

insert into profile (id, name, role, location, tagline, short_bio, long_bio, email)
values (
  1,
  'Gaurav Deep',
  'Software Developer & Cybersecurity Enthusiast',
  'Sikkim, India',
  'I build software and try to break it.',
  'Undergraduate computer science student specializing in defensive & offensive security, web systems, and systems programming. Currently building tools and solving CTF challenges.',
  'I am a developer and cybersecurity enthusiast based in Sikkim, India. My journey started with curiosity about how network protocols and modern applications operate under stress. Today, I balance building intuitive web applications and micro-tools with hands-on CTF exploration, penetration testing fundamentals, and vulnerability analysis.\n\nI believe in clean fundamentals: writing readable code, understanding memory and network layers, and designing software with resilience built in from day one.',
  'contact@gdeep.in'
)
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  location = excluded.location,
  tagline = excluded.tagline,
  short_bio = excluded.short_bio,
  long_bio = excluded.long_bio,
  email = excluded.email;

-- Seed Projects
delete from projects;
insert into projects (title, tech_stack, year, description, link_url, link_label, sort_order)
values
(
  'Detectify',
  'Python, Scapy, Network Security',
  2026,
  'A lightweight network anomaly detection and packet inspection engine capable of identifying abnormal traffic spikes, port scans, and protocol violations in real-time.',
  'https://github.com',
  'View on GitHub ↗',
  1
),
(
  'TicketSphere',
  'React, Node.js, Express, MongoDB',
  2025,
  'A full-stack event ticketing platform with seat allocation, secure checkout flows, and cryptographic QR ticket verification designed for campus festivals and technical symposiums.',
  'https://github.com',
  'View project ↗',
  2
),
(
  'Monastery360',
  'Three.js, WebGL, Tailwind CSS, Vite',
  2024,
  'An immersive virtual archival experience documenting historic heritage monasteries across Sikkim using interactive 360° panoramas, spatial audio, and architectural notes.',
  'https://github.com',
  'Visit live site ↗',
  3
);

-- Seed Achievements (Log)
delete from achievements;
insert into achievements (caption, body, achieved_on, sort_order)
values
(
  'Anti-Slop CTF 2026 — Global Rank ~103',
  'Competed with team in web exploitation, binary reversing, and forensic challenges, finishing as the top-performing regional team out of 800+ international participants.',
  '2026-02-15',
  1
),
(
  '7+ CTFs and counting',
  'Regular competitor in jeopardy-style security tournaments including PicoCTF, Cyber Apocalypse, and DefCon Quals with focus on Web Sec and Cryptography.',
  '2025-11-20',
  2
),
(
  'SIGIL & IIC Involvement',
  'Active member of the Special Interest Group for Information Liberation (SIGIL) and Institution Innovation Council (IIC), organizing hands-on workshops on Linux and Git basics.',
  '2025-08-10',
  3
),
(
  'Sikkim Heritage Digital Archive',
  'Recognized by regional cultural documentation initiative for developing open digital interactive preservation modules for historical structures.',
  '2024-12-05',
  4
);

-- Seed Capabilities
delete from capabilities;
insert into capabilities (label, sort_order)
values
  ('Python', 1),
  ('C', 2),
  ('JavaScript / React', 3),
  ('Node.js & Express', 4),
  ('SQL & MongoDB', 5),
  ('Linux Administration', 6),
  ('Network Fundamentals', 7),
  ('Offensive Security Basics', 8),
  ('Git & GitHub', 9);

-- Seed Tools
delete from tools;
insert into tools (label, sort_order)
values
  ('VS Code', 1),
  ('Kali Linux', 2),
  ('Wireshark', 3),
  ('Vite', 4),
  ('Supabase', 5),
  ('Render', 6),
  ('Cloudflare', 7);

-- Seed Photos (Photography Gallery)
delete from photos;
insert into photos (title, caption, image_url, location, camera_info, category, year, sort_order, is_featured)
values
(
  'Concrete & Light',
  'Architectural shadows and minimalist monolithic geometry at sunrise.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  'Gangtok, Sikkim',
  '35mm Film • Olympus OM-1 / Kodak Portra 400',
  'Architecture',
  2026,
  1,
  true
),
(
  'Kanchenjunga Crest',
  'Morning mist clearing across the high ridge lines above Pelling.',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
  'West Sikkim',
  'Medium Format • Mamiya 645 / Ilford HP5 Plus',
  'Landscape',
  2025,
  2,
  true
),
(
  'Courtyard Shadows',
  'Wooden pillars and morning prayer flag silhouettes.',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
  'Rumtek Monastery',
  '35mm Film • Leica M6 / Kodak Tri-X 400',
  'Heritage',
  2025,
  3,
  true
),
(
  'Yuksom Alpine Pines',
  'Dappled high-altitude light piercing the ancient coniferous forest.',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85',
  'Yuksom, West Sikkim',
  '35mm Film • Canon F-1 / Fuji Provia 100F',
  'Landscape',
  2025,
  4,
  false
),
(
  'Monolithic Facade',
  'Brutalist concrete angles contrasting with mountain skies.',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=85',
  'East Sikkim',
  '35mm Film • Olympus OM-1 / Kodak Gold 200',
  'Architecture',
  2024,
  5,
  false
),
(
  'Mountain Pass Solitude',
  'Remote outpost along the high windswept transit route.',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
  'Nathula Region',
  'Medium Format • Pentax 67 / Kodak Tri-X 400',
  'Landscape',
  2024,
  6,
  false
);
