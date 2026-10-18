'use client'

import Link from 'next/link'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 760) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <Link className="brand" href="/" aria-label="Dalani Heating & Air Conditioning home">
        <img className="brand-logo" src="/dalani-icon.svg" alt="" />
        <span>Dalani<br />Heating & Air Conditioning</span>
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link className="header-cta" href="/#estimate">Get an estimate <ArrowUpRight aria-hidden="true" /></Link>
      <button className="mobile-menu-trigger" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {mobileOpen && <div className="mobile-menu-backdrop" aria-hidden="true" onClick={closeMobileMenu} />}
      <aside id="mobile-navigation" className={`mobile-menu${mobileOpen ? ' is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!mobileOpen} inert={!mobileOpen ? true : undefined}>
        <div className="mobile-menu-header">
          <span>Menu</span>
          <button type="button" aria-label="Close navigation menu" onClick={closeMobileMenu}><X aria-hidden="true" /></button>
        </div>
        <nav>
          <Link href="/" onClick={closeMobileMenu}>Home</Link>
          <Link href="/about" onClick={closeMobileMenu}>About</Link>
          <Link href="/services" onClick={closeMobileMenu}>Services</Link>
          <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
        </nav>
        <div className="mobile-menu-footer">
          <a href="tel:6195550148"><Phone aria-hidden="true" /> Call now</a>
          <Link className="mobile-menu-cta" href="/#estimate" onClick={closeMobileMenu}>Get an estimate <ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </aside>
    </header>
  )
}

export function Footer() {
  const services = ['Air Conditioning', 'Heating', 'Mini Split Systems', 'Quiet Cool Installation', 'Service & Repairs', 'New Installations']

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p className="eyebrow">Dalani Heating & Air Conditioning</p>
        <h2>Comfort, made personal.</h2>
        <div className="footer-contact">
          <a href="tel:6195550148"><Phone aria-hidden="true" /> (619) 555-0148</a>
          <p>Serving San Diego County<br />Mon–Sat · 7am–7pm</p>
        </div>
      </div>
      <nav className="footer-column" aria-label="Footer menu">
        <p className="footer-label">Menu</p>
        <Link href="/about">About us</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/#estimate">Request an estimate</Link>
      </nav>
      <nav className="footer-column" aria-label="Footer navigation">
        <p className="footer-label">Navigation</p>
        <Link href="/">Home</Link>
        <Link href="/about">Our story</Link>
        <Link href="/services">What we do</Link>
        <Link href="/contact">Common questions</Link>
      </nav>
      <div className="footer-column footer-services">
        <p className="footer-label">Services</p>
        {services.map((service) => <Link href="/services" key={service}>{service}</Link>)}
      </div>
    </footer>
  )
}

export function EstimateCta({ eyebrow = 'The next step', title = 'Let\'s take a look.', text = 'Tell us what is going on and we\'ll come by, take a look, and give you a clear estimate before any work begins.' }: { eyebrow?: string; title?: string; text?: string }) {
  return <section className="estimate-cta container-wide"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div><Link className="button button-dark" href="/#estimate">Request an estimate <ArrowUpRight aria-hidden="true" /></Link></section>
}

export function FaqSection() {
  const faqs = [
    ['Do you provide free estimates?', 'Yes. We visit your home, assess the system and recommend the right next step before providing a clear estimate.'],
    ['What areas do you serve?', 'We serve homes throughout San Diego County, from La Jolla to Chula Vista and nearby communities.'],
    ['Do you work on existing systems?', 'Yes. We service and maintain many existing heating and air conditioning systems, including central air, heat pumps and mini-splits.'],
    ['Who will come to my home?', 'Chris, the owner and technician, handles every visit personally. You will always know who is showing up.'],
  ]
  return <section className="faq-section container-wide"><div className="faq-intro"><p className="eyebrow">Common questions</p><h2>Before you<br /><em>call, you may wonder.</em></h2><p>Still have a question? Call directly and we&apos;ll be glad to help.</p><a className="text-link" href="tel:6195550148">(619) 555-0148 <ArrowUpRight aria-hidden="true" /></a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
}

export function Shell({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><div id="main-content">{children}</div><Footer /></>
}
