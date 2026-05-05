"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabaseClient'

const SERVICE_OPTIONS = [
  'HVAC Install',
  'Plumbing Repair',
  'Electrical',
  'Carpentry',
  'Roofing',
  'General Maintenance',
]

export default function LogJobForm() {
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0])
  const [invoicedAmount, setInvoicedAmount] = useState('')
  const [dateCompleted, setDateCompleted] = useState('')
  const [customerNote, setCustomerNote] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState<any[]>([])

  async function fetchJobs() {
    const { data, error } = await supabase
      .from('jobs')
      .select('id,service_type,invoiced_amount,date_completed,customer_note,created_at')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching jobs', error)
      return
    }
    setJobs(data || [])
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)

    // Basic validation
    if (!serviceType || !invoicedAmount || !dateCompleted) {
      setStatus('Please fill required fields (service, amount, date).')
      return
    }

    const amount = Number(invoicedAmount)
    if (Number.isNaN(amount) || amount < 0) {
      setStatus('Enter a valid invoiced amount.')
      return
    }

    setLoading(true)
    const { data, error } = await supabase.from('jobs').insert([
      {
        service_type: serviceType,
        invoiced_amount: amount,
        date_completed: dateCompleted,
        customer_note: customerNote || null,
      },
    ])

    setLoading(false)
    if (error) {
      console.error(error)
      setStatus('Error saving job: ' + error.message)
      return
    }

    setStatus('Job saved successfully.')
    // clear form
    setServiceType(SERVICE_OPTIONS[0])
    setInvoicedAmount('')
    setDateCompleted('')
    setCustomerNote('')
    // refresh feed
    fetchJobs()
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', padding: 24 }}>
      <h1>Log a Job</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
        <label style={{ display: 'block', marginTop: 12 }}>
          Service type*
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          Invoiced amount*
          <input
            type="number"
            step="0.01"
            value={invoicedAmount}
            onChange={(e) => setInvoicedAmount(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }}
          />
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          Date completed*
          <input
            type="date"
            value={dateCompleted}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDateCompleted(e.target.value)}
            style={{ display: 'block', padding: 8, marginTop: 6 }}
          />
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          Customer note
          <textarea
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            rows={4}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }}
          />
        </label>

        <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="submit" disabled={loading} style={{ padding: '8px 14px' }}>
            {loading ? 'Saving…' : 'Save job'}
          </button>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button type="button" style={{ padding: '8px 14px' }}>Home</button>
          </Link>
        </div>
      </form>

      {status && (
        <div style={{ marginTop: 12, color: status.startsWith('Error') ? 'crimson' : 'green' }}>{status}</div>
      )}

      <section style={{ marginTop: 24 }}>
        <h2>Recent jobs (most recent first)</h2>
        {jobs.length === 0 ? (
          <div>No jobs yet.</div>
        ) : (
          <div>
            <ul>
              {jobs.map((j) => (
                <li key={j.id} style={{ marginBottom: 8 }}>
                  <strong>{j.service_type}</strong> — ${Number(j.invoiced_amount).toFixed(2)} — {j.date_completed}
                  {j.customer_note ? <div style={{ fontSize: 13 }}>{j.customer_note}</div> : null}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 12 }}>
              <strong>Running total (visible): </strong>
              ${jobs.reduce((s, r) => s + Number(r.invoiced_amount || 0), 0).toFixed(2)}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
