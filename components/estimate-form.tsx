'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowDown, ArrowRight, CircleCheck } from 'lucide-react'

const services = ['Air conditioning', 'Heating', 'Maintenance', 'Something else']

export function EstimateForm() {
  const [submitted, setSubmitted] = useState<string | null>(null)
  const [service, setService] = useState('')
  const [serviceOpen, setServiceOpen] = useState(false)
  const serviceSelectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!serviceOpen) return
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!serviceSelectRef.current?.contains(event.target as Node)) setServiceOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setServiceOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [serviceOpen])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(String(new FormData(event.currentTarget).get('firstName') ?? '').trim())
  }

  if (submitted !== null) return <div className="estimate-form-success" role="status"><CircleCheck aria-hidden="true" /><h3>Thanks{submitted ? `, ${submitted}` : ''}! Your request is in.</h3><p>We&apos;ll reach out within one business hour. Need help sooner? <a href="tel:7607839401">(760) 783-9401</a>.</p><button className="button button-outline-dark" type="button" onClick={() => setSubmitted(null)}>Send another request</button></div>

  return <form className="estimate-form" onSubmit={submit}>
    <div className="estimate-form-intro"><p className="estimate-form-kicker">Free, no-obligation estimate</p><h3>Tell us what you need.</h3><p>Share a few details and we&apos;ll be in touch to schedule a visit.</p></div>
    <div className="estimate-form-fields">
      <label>First name<input name="firstName" autoComplete="given-name" placeholder="Jane…" required /></label>
      <label>Last name<input name="lastName" autoComplete="family-name" placeholder="Smith…" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" spellCheck={false} placeholder="jane@example.com…" required /></label>
      <label>Phone<input name="phone" type="tel" autoComplete="tel" placeholder="(760) 783-9401…" required /></label>
      <label>ZIP code<input name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} placeholder="92101…" required /></label>
      <div className="service-select-label" ref={serviceSelectRef}><span>Service needed</span>
        <input type="hidden" name="service" value={service} required />
        <button className={`service-select-trigger${service ? ' has-value' : ''}`} type="button" aria-haspopup="listbox" aria-expanded={serviceOpen} onClick={() => setServiceOpen(!serviceOpen)}>{service || 'Choose a service'}<ArrowDown aria-hidden="true" /></button>
        {serviceOpen && <div className="service-select-menu" role="listbox">{services.map((option) => <button className="service-select-option" type="button" role="option" aria-selected={service === option} key={option} onClick={() => { setService(option); setServiceOpen(false) }}>{option}</button>)}</div>}
      </div>
    </div>
    <div className="estimate-form-footer"><p>No obligation. We never share your information.</p><button className="button button-dark" type="submit">Get My Free Estimate <ArrowRight aria-hidden="true" /></button></div>
  </form>
}
