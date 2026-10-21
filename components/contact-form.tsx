'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Wrench } from 'lucide-react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return <div className="contact-form-notice" role="status" aria-live="polite"><Wrench aria-hidden="true" /><h2>Online requests are coming soon.</h2><p>We&apos;re still connecting this form to our request system, so no information was sent. Please call <a href="tel:7607839401">(760) 783-9401</a> for help today.</p><button className="button button-outline-dark" type="button" onClick={() => setSubmitted(false)}>Send another message</button></div>
  }

  return <form className="contact-form" onSubmit={submit}>
    <label htmlFor="contact-name">Name<input id="contact-name" required name="name" autoComplete="name" placeholder="Your name…" /></label>
    <label htmlFor="contact-email">Email<input id="contact-email" required type="email" name="email" autoComplete="email" spellCheck={false} placeholder="you@example.com…" /></label>
    <label htmlFor="contact-phone">Phone<input id="contact-phone" type="tel" name="phone" autoComplete="tel" placeholder="(760) 783-9401…" /></label>
    <label htmlFor="contact-message">How can we help?<textarea id="contact-message" required name="message" rows={5} placeholder="Tell us about your home or system…" /></label>
    <button className="button button-dark" type="submit">Send request <ArrowUpRight aria-hidden="true" /></button>
  </form>
}
