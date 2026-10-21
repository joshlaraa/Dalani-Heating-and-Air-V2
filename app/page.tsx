import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Check, Wind, Wrench, ThermometerSun } from 'lucide-react'
import { EstimateCta, Shell } from '@/components/site-shell'
import { EstimateForm } from '@/components/estimate-form'

const services = [
  { icon: Wind, number: '01', title: 'Air conditioning', copy: 'Repairs, replacement, and seasonal tune-ups that keep your home cool when San Diego heats up.' },
  { icon: ThermometerSun, number: '02', title: 'Heating', copy: 'Thoughtful furnace and heat pump service for comfortable, efficient winter mornings.' },
  { icon: Wrench, number: '03', title: 'Maintenance', copy: 'Preventive care that helps your system run quieter, cleaner, and longer.' },
]

export default function Page() {
  return <Shell>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Residential HVAC · San Diego</p>
          <h1>Reliable comfort, all year.</h1>
          <p className="hero-lede">Professional heating and air conditioning service from a local owner who keeps your home comfortable, your system efficient, and every estimate clear.</p>
          <div className="hero-actions"><Link className="button button-dark" href="/services">Explore services <ArrowUpRight aria-hidden="true" /></Link><Link className="button button-outline" href="/#estimate">Request an estimate <ArrowDown aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="estimate-section container-wide" id="estimate">
        <div className="estimate-section-heading"><p className="eyebrow">Start here</p><h2>Let&apos;s get your home comfortable.</h2><p>Tell us what&apos;s going on and we&apos;ll follow up with a clear, no-pressure estimate.</p></div>
        <EstimateForm />
      </section>

      <section className="intro-section container-wide">
        <div className="section-label"><span>01</span><span>THE DALANI DIFFERENCE</span></div>
        <div className="intro-feature"><div className="intro-feature-panel"><span className="intro-feature-number">01</span><p className="section-kicker">THE DALANI DIFFERENCE</p><h2>Comfort, handled personally.</h2><span className="intro-feature-line" /></div><div className="intro-feature-content"><p className="section-kicker">LOCAL, BY DESIGN</p><p className="large-copy">Dalani provides thoughtful heating and cooling service for homes and businesses, with clear guidance and quality work from start to finish.</p><div className="intro-points"><span><strong>01</strong> Family-owned</span><span><strong>02</strong> Straight answers</span><span><strong>03</strong> Built to last</span></div><Link className="text-link" href="/about">Our story <ArrowUpRight aria-hidden="true" /></Link></div></div>
      </section>

      <section className="dark-section"><div className="container-wide"><div className="section-label light"><span>02</span><span>WHAT WE DO</span></div><div className="service-heading"><h2>One home.<br />One honest estimate.</h2><p>Every home is different. That is why we visit first, understand what you need, and give you a clear estimate before any work begins.</p></div><div className="service-grid">{services.map(({ icon: Icon, ...service }) => <article className="service-card" key={service.number}><div className="service-top"><span>{service.number}</span><Icon aria-hidden="true" /></div><h3>{service.title}</h3><p>{service.copy}</p><Link href="/services" aria-label={`Learn more about ${service.title}`}>Learn more <ArrowUpRight aria-hidden="true" /></Link></article>)}</div></div></section>

      <section className="proof-section container-wide"><div className="proof-card"><p className="eyebrow">The Dalani promise</p><h2>Clear answers.<br />Comfortable spaces.</h2><ul><li><Check aria-hidden="true" /> Owner-operated from start to finish</li><li><Check aria-hidden="true" /> Estimates before recommendations</li><li><Check aria-hidden="true" /> Proudly serving San Diego County</li></ul><Link className="button button-light" href="/#estimate">Let&apos;s talk <ArrowUpRight aria-hidden="true" /></Link></div><div className="proof-aside"><span>03</span><p>“I want every customer to feel like they called a neighbor—not a call center.”</p><small>— Chris, Owner</small></div></section><EstimateCta title="Need help with your comfort?" text="Tell us what is going on. We will come by, take a look, and give you a clear estimate for the work." />
    </main>
  </Shell>
}
