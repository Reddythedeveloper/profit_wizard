import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (client) return client
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing NEXT_PUBLIC_SUPABASE_* environment variables')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_* environment variables')
  }
  client = createClient(supabaseUrl, supabaseAnonKey)
  return client
}

// For backwards compatibility, provide a `supabase` getter property that
// callers can import and call when running client-side.
export const supabase = { get: () => getSupabase() }
