import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debugging check
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("MISSING SUPABASE KEYS! Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)