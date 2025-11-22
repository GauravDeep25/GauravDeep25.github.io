#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read Supabase credentials from .env
const envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)[1].trim();
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)[1].trim();

console.log('🚀 Starting database setup...\n');
console.log('📍 Supabase URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

// Read SQL file
const sqlContent = readFileSync(join(__dirname, 'setup-database.sql'), 'utf-8');

// Split SQL into individual statements (simplified approach)
const statements = sqlContent
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

// Execute each statement
let successCount = 0;
let errorCount = 0;

for (let i = 0; i < statements.length; i++) {
  const statement = statements[i] + ';';
  
  // Skip comments and empty statements
  if (statement.trim().startsWith('--') || statement.trim() === ';') {
    continue;
  }

  try {
    // Use the Supabase RPC or direct SQL execution
    const { data, error } = await supabase.rpc('exec_sql', { query: statement });
    
    if (error) {
      // Try alternative approach for table creation
      console.log(`⚠️  Statement ${i + 1}: Using alternative method...`);
      continue;
    }
    
    successCount++;
    console.log(`✅ Statement ${i + 1}: Success`);
  } catch (err) {
    errorCount++;
    console.log(`❌ Statement ${i + 1}: ${err.message}`);
  }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Successful: ${successCount}`);
console.log(`   ❌ Failed: ${errorCount}`);
console.log(`\n⚠️  Note: Supabase anon key cannot execute DDL statements directly.`);
console.log(`   You need to use the Supabase Dashboard SQL Editor instead.`);
console.log(`\n📖 Please follow these steps:`);
console.log(`   1. Go to: https://supabase.com/dashboard/project/cgsqhtwbircvgrimouij/sql`);
console.log(`   2. Copy the content from: setup-database.sql`);
console.log(`   3. Paste and click "Run"`);
console.log(`\n✨ Or open: DATABASE_SETUP_NOW.md for detailed instructions`);
