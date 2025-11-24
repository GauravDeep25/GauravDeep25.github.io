-- Fix heartbeat table RLS to allow anonymous inserts from GitHub Actions

-- Option 1: Allow INSERT for anonymous users
CREATE POLICY "Allow anonymous heartbeat inserts"
ON heartbeat
FOR INSERT
TO anon
WITH CHECK (true);

-- Option 2: If you prefer to disable RLS entirely (less secure but simpler)
-- ALTER TABLE heartbeat DISABLE ROW LEVEL SECURITY;
