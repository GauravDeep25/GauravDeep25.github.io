-- ================================================
-- STORAGE BUCKET AND POLICIES SETUP
-- Run this AFTER the main database setup
-- ================================================

-- 1. CREATE STORAGE BUCKET
-- ================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. CREATE STORAGE POLICIES
-- ================================================

-- Policy 1: Public Read Access
-- Anyone can view/download images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Policy 2: Authenticated Upload
-- Authenticated users can upload images
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Authenticated Update
-- Authenticated users can update images
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 4: Authenticated Delete
-- Authenticated users can delete images
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);

-- ================================================
-- STORAGE SETUP COMPLETE!
-- 
-- Verification:
-- 1. Check bucket exists: SELECT * FROM storage.buckets;
-- 2. Check policies: SELECT * FROM storage.policies;
-- ================================================
