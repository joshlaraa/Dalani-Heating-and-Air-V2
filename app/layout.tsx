import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dalani Heating & Air Conditioning | San Diego HVAC',
  description: 'Owner-operated heating and air conditioning service in San Diego. Get a clear, no-pressure estimate for your home.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dalani-heating-and-air-v2.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Dalani Heating & Air Conditioning',
    title: 'Dalani Heating & Air Conditioning | San Diego HVAC',
    description: 'Owner-operated heating and air conditioning service in San Diego. Get a clear, no-pressure estimate for your home.',
    images: [{ url: '/og-preview.png', width: 1200, height: 630, alt: 'Dalani Heating & Air Conditioning serving San Diego homes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dalani Heating & Air Conditioning | San Diego HVAC',
    description: 'Owner-operated heating and air conditioning service in San Diego.',
    images: ['/og-preview.png'],
  },
  icons: {
    icon: [
      {
        url: '/dalani-icon.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/dalani-icon.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/dalani-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/dalani-icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [{ color: '#ffffff' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
