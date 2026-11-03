import type { Metadata } from 'next'
import AppDownloads from '@/components/AppDownloads'

// Private page for restaurant / taxi staff: not linked anywhere and kept out of search engines.
export const metadata: Metadata = {
  title: 'DS Delivery ilovalari',
  robots: { index: false, follow: false, nocache: true },
}

export default function AppsPage() {
  return <AppDownloads />
}
