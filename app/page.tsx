"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data, error, count } = await supabase.from('jobs').select('*', { count: 'exact' }).limit(1)
      if (!mounted) return
      if (error) {
        console.error('Error fetching job count', error)
        setCount(null)
        return
      }
      setCount(count ?? (data ? data.length : 0))
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', padding: 24 }}>
      <h1>Profit Wizard</h1>
      <p style={{ maxWidth: 700 }}>
        A lightweight tool to log completed trade jobs and track invoiced amounts. Use the form to record a
        job and view recent entries below.
      </p>
      <div style={{ marginTop: 12 }}>
        <strong>Recorded jobs:</strong> {count === null ? 'loading…' : count}
      </div>
      <div style={{ marginTop: 18 }}>
        <Link href="/log-job">
          <button style={{ padding: '8px 12px' }}>Log a job</button>
        </Link>
      </div>
    </div>
  )
}
