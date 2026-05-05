import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  // Leave this as a runtime check — developer should set NEXT_PUBLIC_* env vars
  // during local development (.env.local) or in Vercel project settings.
  console.warn('Missing NEXT_PUBLIC_SUPABASE_* environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
