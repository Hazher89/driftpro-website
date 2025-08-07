import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BodyWrapper from '@/components/BodyWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DriftPro - Enterprise Management Platform',
  description: 'Komplett bedriftsadministrasjonsplattform med HMS, personaladministrasjon, rapportering og mobil-apps for iOS og Android.',
  keywords: 'DriftPro, bedriftsadministrasjon, HMS, personaladministrasjon, mobil-app, iOS, Android, rapportering',
  authors: [{ name: 'DriftPro Team' }],
  creator: 'DriftPro',
  publisher: 'DriftPro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://driftpro.no'),
  openGraph: {
    title: 'DriftPro - Enterprise Management Platform',
    description: 'Komplett bedriftsadministrasjonsplattform med HMS, personaladministrasjon, rapportering og mobil-apps.',
    url: 'https://driftpro.no',
    siteName: 'DriftPro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DriftPro Enterprise Management Platform',
      },
    ],
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DriftPro - Enterprise Management Platform',
    description: 'Komplett bedriftsadministrasjonsplattform med HMS, personaladministrasjon, rapportering og mobil-apps.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <BodyWrapper>
          {children}
        </BodyWrapper>
      </body>
    </html>
  )
} 