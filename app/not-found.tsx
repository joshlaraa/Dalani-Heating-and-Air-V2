import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Shell } from '@/components/site-shell'

export default function NotFound() { return <Shell><main className="not-found"><p className="eyebrow">404 · Wrong address</p><h1>This page is<br /><em>out of range.</em></h1><p>Looks like this page took a wrong turn. Let&apos;s get you back to comfortable.</p><Link className="button button-dark" href="/">Back home <ArrowUpRight aria-hidden="true" /></Link></main></Shell> }
