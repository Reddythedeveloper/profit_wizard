"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const s = supabase.get()
        const { data, error, count } = await s.from('jobs').select('*', { count: 'exact' }).limit(1)
        if (!mounted) return
        if (error) {
          console.error('Error fetching job count', error)
          setCount(null)
          return
        }
        setCount(count ?? (data ? data.length : 0))
      } catch (err) {
        console.warn('Skipping job count fetch (no supabase):', err instanceof Error ? err.message : err)
        setCount(null)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <main style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', padding: 24 }}>
      <header>
        <h1>Profit Wizard</h1>
        <p style={{ maxWidth: 700 }}>
          A lightweight tool to log completed trade jobs and track invoiced amounts. Use the form to record a
          job and view recent entries below.
        </p>
      </header>

      <div style={{ marginTop: 12 }} aria-live="polite">
        <strong>Recorded jobs:</strong> {count === null ? 'loading…' : count}
      </div>

      <div style={{ marginTop: 18 }}>
        <Link href="/log-job">
          <button style={{ padding: '8px 12px' }}>Log a job</button>
        </Link>
      </div>
    </main>
  )
}
