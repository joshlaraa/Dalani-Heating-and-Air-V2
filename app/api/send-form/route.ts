import { NextResponse } from 'next/server'
import { services } from '@/lib/services'

type FormPayload = {
  formType?: 'estimate' | 'contact'
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  phone?: string
  zip?: string
  service?: string
  message?: string
  website?: string
}

function clean(value: unknown, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character] ?? character)
}

function field(label: string, value: string) {
  return `<tr><td style="padding:12px 0;color:#766a66;font-size:13px;width:38%">${label}</td><td style="padding:12px 0;color:#2f2a29;font-size:15px;font-weight:600">${escapeHtml(value || 'Not provided')}</td></tr>`
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY ?? process.env.resend_api_key
  const to = process.env.RESEND_TO_EMAIL ?? process.env.test_email
  const from = process.env.RESEND_FROM_EMAIL ?? 'website@dalanihvac.com'

  if (!apiKey || !to) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  let payload: FormPayload
  try {
    payload = await request.json() as FormPayload
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 })
  }

  // Hidden honeypot field: real visitors never fill this in.
  if (clean(payload.website)) return NextResponse.json({ success: true })

  const formType = payload.formType === 'contact' ? 'contact' : 'estimate'
  const firstName = clean(payload.firstName, 80)
  const lastName = clean(payload.lastName, 80)
  const name = clean(payload.name, 160) || [firstName, lastName].filter(Boolean).join(' ')
  const email = clean(payload.email, 160)
  const phone = clean(payload.phone, 40)
  const zip = clean(payload.zip, 10)
  const service = clean(payload.service, 80)
  const message = clean(payload.message, 2000)

  const phoneDigits = phone.replace(/\D/g, '')
  if (!name || !email || phoneDigits.length !== 10 || !zip || !service || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{5}$/.test(zip) || !services.includes(service as typeof services[number])) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
  }

  if (formType === 'contact' && !message) {
    return NextResponse.json({ error: 'Please tell us how we can help.' }, { status: 400 })
  }

  const subject = formType === 'estimate'
    ? `New estimate request from ${name}`
    : `New contact request from ${name}`

  const rows = [
    field('Full name', name),
    field('Email', email),
    field('Phone', phone),
    field('ZIP code', zip),
    field('Service', service),
    ...(formType === 'contact' ? [field('Message', message)] : []),
  ].join('')

  const html = `
    <div style="margin:0;background:#f8fafb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#2f2a29">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #ead9d3">
        <div style="padding:28px 32px;background:#c05444;color:#ffffff">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:.12em;text-transform:uppercase">Dalani Heating &amp; Air Conditioning</p>
          <h1 style="margin:0;font-size:26px;line-height:1.2">${escapeHtml(subject)}</h1>
        </div>
        <div style="padding:24px 32px">
          <p style="margin:0 0 16px;color:#766a66;line-height:1.5">A visitor submitted the ${formType === 'estimate' ? 'estimate' : 'contact'} form on dalanihvac.com.</p>
          <table style="width:100%;border-collapse:collapse">${rows}</table>
          <p style="margin:24px 0 0;color:#766a66;font-size:12px">Reply to this email to contact ${escapeHtml(name)} directly.</p>
        </div>
      </div>
    </div>`

  let resendResponse: Response
  try {
    resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Dalani Website <${from}>`,
        to: [to],
        reply_to: email,
        subject,
        html,
      }),
    })
  } catch (error) {
    console.error('Resend request failed', error)
    return NextResponse.json({ error: 'We could not send your request. Please call us at (760) 783-9401.' }, { status: 502 })
  }

  if (!resendResponse.ok) {
    console.error('Resend email failed', await resendResponse.text())
    return NextResponse.json({ error: 'We could not send your request. Please call us at (760) 783-9401.' }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
