-- ================================================
-- SAFE SETUP - Drops and recreates everything
-- ================================================

-- CLEANUP POLICIES FIRST
DROP POLICY IF EXISTS "Enable read access for all users" ON hero_content;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON hero_content;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON hero_content;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON hero_content;
DROP POLICY IF EXISTS "Enable read access for all users" ON about_content;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON about_content;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON about_content;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON about_content;
DROP POLICY IF EXISTS "Enable read access for all users" ON skills;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON skills;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON skills;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON skills;
DROP POLICY IF EXISTS "Enable read access for all users" ON education;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON education;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON education;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON education;
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Enable read access for all users" ON certifications;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON certifications;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON certifications;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON certifications;
DROP POLICY IF EXISTS "Enable read access for all users" ON social_links;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON social_links;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON social_links;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON social_links;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- DROP ALL TABLES
DROP TABLE IF EXISTS hero_content CASCADE;
DROP TABLE IF EXISTS about_content CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;

-- CREATE TABLES
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  headline TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  paragraph_1 TEXT NOT NULL,
  paragraph_2 TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  code_url TEXT,
  tech_stack TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_id TEXT,
  credential_url TEXT,
  image_url TEXT,
  description TEXT,
  skills TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- INSERT DEFAULT DATA
INSERT INTO hero_content (headline, subheadline, profile_image_url)
VALUES (
  'Crafting secure and scalable digital solutions with code and creativity.',
  'Hi, I''m Gaurav Deep. I am a Computer Science Engineering student specializing in IoT, Cybersecurity, and Blockchain Technology.',
  '/Me.png'
) ON CONFLICT DO NOTHING;

INSERT INTO about_content (paragraph_1, paragraph_2)
VALUES (
  'I am a passionate developer with expertise in modern web technologies and cybersecurity.',
  'Currently pursuing Computer Science Engineering with a focus on IoT, Blockchain, and Security.'
) ON CONFLICT DO NOTHING;

INSERT INTO skills (name, proficiency) VALUES
  ('JavaScript', 90),
  ('React', 85),
  ('Node.js', 80),
  ('Python', 85),
  ('Cybersecurity', 75),
  ('Blockchain', 70)
ON CONFLICT DO NOTHING;

INSERT INTO education (institution, degree, field_of_study, start_date, end_date, description)
VALUES (
  'Your University',
  'Bachelor of Technology',
  'Computer Science Engineering (IoT and Cybersecurity)',
  '2021',
  '2025',
  'Specializing in IoT, Cybersecurity, and Blockchain Technology'
) ON CONFLICT DO NOTHING;

INSERT INTO social_links (platform, url) VALUES
  ('github', 'https://github.com/GauravDeep25'),
  ('linkedin', 'https://linkedin.com/in/yourprofile'),
  ('twitter', 'https://twitter.com/yourhandle'),
  ('email', 'mailto:your.email@example.com')
ON CONFLICT DO NOTHING;

-- ENABLE RLS
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- CREATE POLICIES
CREATE POLICY "Enable read access for all users" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON hero_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON hero_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON hero_content FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON about_content FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON about_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON about_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON about_content FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON skills FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON education FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON education FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON education FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON education FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON certifications FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON certifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON certifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON certifications FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON social_links FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON social_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON social_links FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON social_links FOR DELETE USING (auth.role() = 'authenticated');

-- CREATE STORAGE
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- ================================================
-- DONE! Refresh your app at http://localhost:5174/
-- ================================================
