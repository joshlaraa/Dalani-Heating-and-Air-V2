'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react'
import { services } from '@/lib/services'

export function ContactForm() {
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
        body: JSON.stringify({ ...values, formType: 'contact' }),
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

  if (status === 'success') {
    return <div className="contact-form-notice" role="status" aria-live="polite"><CheckCircle2 aria-hidden="true" /><h2>Message received.</h2><p>Thanks for reaching out. We&apos;ll review your request and get back to you shortly.</p><button className="button button-outline-dark" type="button" onClick={() => setStatus('idle')}>Send another message</button></div>
  }

  return <form className="contact-form" onSubmit={submit}>
    <label htmlFor="contact-name">Name<input id="contact-name" required name="name" autoComplete="name" placeholder="Your name…" /></label>
    <label htmlFor="contact-email">Email<input id="contact-email" required type="email" name="email" autoComplete="email" spellCheck={false} placeholder="you@example.com…" /></label>
    <label htmlFor="contact-phone">Phone number<input id="contact-phone" required type="tel" name="phone" autoComplete="tel" inputMode="numeric" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} placeholder="7605559401…" /></label>
    <div className="contact-form-row">
      <label htmlFor="contact-zip">ZIP code<input id="contact-zip" required name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} placeholder="92101…" /></label>
      <label htmlFor="contact-service">Service<select id="contact-service" required name="service" defaultValue=""><option value="" disabled>Choose a service</option>{services.map((service) => <option key={service} value={service}>{service}</option>)}</select></label>
    </div>
    <label htmlFor="contact-message">How can we help?<textarea id="contact-message" required name="message" rows={5} placeholder="Tell us about your home or system…" /></label>
    <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    {status === 'error' && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <>Sending <LoaderCircle className="form-spinner" aria-hidden="true" /></> : <>Send request <ArrowUpRight aria-hidden="true" /></>}</button>
  </form>
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}
