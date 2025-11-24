-- Fix heartbeat table RLS to allow anonymous updates from GitHub Actions

-- Allow UPDATE for anonymous users (needed for heartbeat workflow)
CREATE POLICY "Allow anonymous heartbeat updates"
ON heartbeat
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- Optional: Also allow INSERT if you want to insert new records
-- CREATE POLICY "Allow anonymous heartbeat inserts"
-- ON heartbeat
-- FOR INSERT
-- TO anon
-- WITH CHECK (true);

-- Option 2: If you prefer to disable RLS entirely (less secure but simpler)
-- ALTER TABLE heartbeat DISABLE ROW LEVEL SECURITY;
