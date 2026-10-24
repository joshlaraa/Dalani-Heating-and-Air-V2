'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'
import { services } from '@/lib/services'

export function EstimateForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [phone, setPhone] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, formType: 'estimate' }),
      })
      const result = await response.json() as { error?: string }
      if (!response.ok) throw new Error(result.error ?? 'Something went wrong.')
      setStatus('success')
      setPhone('')
      form.reset()
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong. Please call us instead.')
      setStatus('error')
    }
  }

  if (status === 'success') return <div className="estimate-form-notice" role="status" aria-live="polite"><CheckCircle2 aria-hidden="true" /><h3>Request received.</h3><p>Thanks for reaching out. We&apos;ll review your request and get back to you shortly.</p><button className="button button-outline-dark" type="button" onClick={() => setStatus('idle')}>Send another request</button></div>

  return <form className="estimate-form" onSubmit={submit}>
    <div className="estimate-form-intro"><p className="estimate-form-kicker">Free, no-obligation estimate</p><h3>Tell us what you need.</h3><p>Share a few details and we&apos;ll be in touch to schedule a visit.</p></div>
    <div className="estimate-form-fields">
      <label htmlFor="estimate-name">Name<input id="estimate-name" name="name" autoComplete="name" placeholder="Jane Smith…" required /></label>
      <label htmlFor="estimate-email">Email<input id="estimate-email" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="jane@example.com…" required /></label>
      <label htmlFor="estimate-phone">Phone number<input id="estimate-phone" name="phone" type="tel" autoComplete="tel" inputMode="numeric" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} placeholder="7605559401…" required /></label>
      <label htmlFor="estimate-zip">ZIP code<input id="estimate-zip" name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} placeholder="92101…" required /></label>
      <label className="service-select-label" htmlFor="estimate-service">Service needed
        <select id="estimate-service" name="service" defaultValue="" required>
          <option value="" disabled>Choose a service</option>
          {services.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
    </div>
    <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    {status === 'error' && <p className="form-error" role="alert">{error}</p>}
    <div className="estimate-form-footer"><p>No obligation. We never share your information.</p><button className="button button-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>Sending <LoaderCircle className="form-spinner" aria-hidden="true" /></> : <>Get My Free Estimate <ArrowRight aria-hidden="true" /></>}</button></div>
  </form>
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}
