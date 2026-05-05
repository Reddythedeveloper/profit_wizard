"use client"
import React, { useState, useEffect, FormEvent } from 'react'
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
    const s = supabase.get()

    const { data, error } = await s
      .from('jobs')
      .select('id,service_type,invoiced_amount,date_completed,customer_note,created_at')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error(error)
      return
    }
    setJobs(data || [])
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(null)

    if (!serviceType || !invoicedAmount || !dateCompleted) {
      setStatus('Please fill required fields.')
      return
    }

    const amount = Number(invoicedAmount)
    if (Number.isNaN(amount) || amount < 0) {
      setStatus('Enter valid amount.')
      return
    }

    setLoading(true)
    const s = supabase.get()

    const { error } = await s.from('jobs').insert([
      {
        service_type: serviceType,
        invoiced_amount: amount,
        date_completed: dateCompleted,
        customer_note: customerNote || null,
      },
    ])

    setLoading(false)

    if (error) {
      setStatus('Error: ' + error.message)
      return
    }

    setStatus('Saved successfully')
    setServiceType(SERVICE_OPTIONS[0])
    setInvoicedAmount('')
    setDateCompleted('')
    setCustomerNote('')
    fetchJobs()
  }

  return (
    <div className="app-root">
      <h1>Log a Job</h1>

      <div className="dashboard-grid">

        {/* LEFT */}
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <label>Service type*</label>
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <label>Invoiced amount*</label>
            <input
              type="number"
              value={invoicedAmount}
              onChange={(e) => setInvoicedAmount(e.target.value)}
            />

            <label>Date completed*</label>
            <input
              type="date"
              value={dateCompleted}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDateCompleted(e.target.value)}
            />

            <label>Customer note</label>
            <textarea
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
            />

            <div style={{ marginTop: 12 }}>
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <Link href="/">
                <button type="button">Home</button>
              </Link>
            </div>
          </form>

          {status && (
            <div className={`status ${status.startsWith('Error') ? 'error' : 'success'}`}>
              {status}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="jobs-card">
          <h2>Recent Jobs</h2>

          {jobs.length === 0 ? (
            <div className="muted">No jobs yet</div>
          ) : (
            <>
              {/* ✅ TOTAL ON TOP */}
              <div className="total-box">
                <span>Total Invoiced Amount</span>
                <strong>
                  ${jobs.reduce((s, r) => s + Number(r.invoiced_amount || 0), 0).toFixed(2)}
                </strong>
              </div>

              {/* JOB LIST BELOW */}
              <div className="job-list">
                {jobs.map((j) => (
                  <div key={j.id} className="job-item">
                    <strong>{j.service_type}</strong>
                    <div className="muted">
                      ${Number(j.invoiced_amount).toFixed(2)} — {j.date_completed}
                    </div>
                    {j.customer_note && <div>{j.customer_note}</div>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
