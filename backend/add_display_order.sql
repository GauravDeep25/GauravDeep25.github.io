-- Add display_order column to projects and certifications
ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Optional: Add to others for future proofing
ALTER TABLE education ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
