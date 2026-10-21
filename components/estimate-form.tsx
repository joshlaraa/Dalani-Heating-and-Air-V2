'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Wrench } from 'lucide-react'

const services = ['Air conditioning', 'Heating', 'Maintenance', 'Something else']

export function EstimateForm() {
  const [submitted, setSubmitted] = useState<string | null>(null)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(String(new FormData(event.currentTarget).get('firstName') ?? '').trim())
  }

  if (submitted !== null) return <div className="estimate-form-notice" role="status" aria-live="polite"><Wrench aria-hidden="true" /><h3>Online requests are coming soon{submitted ? `, ${submitted}` : ''}.</h3><p>We&apos;re still connecting this form to our request system, so no information was sent. Please call <a href="tel:7607839401">(760) 783-9401</a> for help today.</p><button className="button button-outline-dark" type="button" onClick={() => setSubmitted(null)}>Send another request</button></div>

  return <form className="estimate-form" onSubmit={submit}>
    <div className="estimate-form-intro"><p className="estimate-form-kicker">Free, no-obligation estimate</p><h3>Tell us what you need.</h3><p>Share a few details and we&apos;ll be in touch to schedule a visit.</p></div>
    <div className="estimate-form-fields">
      <label htmlFor="estimate-first-name">First name<input id="estimate-first-name" name="firstName" autoComplete="given-name" placeholder="Jane…" required /></label>
      <label htmlFor="estimate-last-name">Last name<input id="estimate-last-name" name="lastName" autoComplete="family-name" placeholder="Smith…" required /></label>
      <label htmlFor="estimate-email">Email<input id="estimate-email" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="jane@example.com…" required /></label>
      <label htmlFor="estimate-phone">Phone<input id="estimate-phone" name="phone" type="tel" autoComplete="tel" placeholder="(760) 783-9401…" required /></label>
      <label htmlFor="estimate-zip">ZIP code<input id="estimate-zip" name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} placeholder="92101…" required /></label>
      <label className="service-select-label" htmlFor="estimate-service">Service needed
        <select id="estimate-service" name="service" defaultValue="" required>
          <option value="" disabled>Choose a service</option>
          {services.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
    </div>
    <div className="estimate-form-footer"><p>No obligation. We never share your information.</p><button className="button button-dark" type="submit">Get My Free Estimate <ArrowRight aria-hidden="true" /></button></div>
  </form>
}
