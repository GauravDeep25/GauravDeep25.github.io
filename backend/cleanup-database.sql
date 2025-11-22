-- ================================================
-- CLEANUP SCRIPT - Run this FIRST to reset everything
-- ================================================

-- Drop all existing policies
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

-- Drop storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- ================================================
-- CLEANUP COMPLETE!
-- Now run: setup-complete.sql
-- ================================================
