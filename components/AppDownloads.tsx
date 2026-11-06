'use client'

import { useEffect, useState } from 'react'
import { FaAndroid, FaDownload, FaWindows } from 'react-icons/fa'

const BASE = 'https://apk.sultonxoja.uz'

type Key = 'restoran' | 'taksi' | 'restoran-windows' | 'taksi-windows'
type Meta = { version: string; size: number; updatedAt: string }
type Latest = Partial<Record<Key, Meta>>

const APPS: Array<{ key: Key; title: string; note: string; file: string; windows?: boolean }> = [
  { key: 'restoran', title: 'Restoran ilovasi', note: 'Telefon (Android): buyurtmalarni qabul qilish uchun', file: 'restoran.apk' },
  { key: 'taksi', title: 'Taksi ilovasi', note: 'Telefon (Android): taksi operatori va haydovchilar uchun', file: 'taksi.apk' },
  { key: 'restoran-windows', title: 'Restoran dasturi', note: 'Kompyuter (Windows): buyurtmalar, menyu, bronlar', file: 'restoran-windows.exe', windows: true },
  { key: 'taksi-windows', title: 'Taksi dasturi', note: 'Kompyuter (Windows): operator uchun', file: 'taksi-windows.exe', windows: true },
]

const mb = (n: number) => `${(n / 1024 / 1024).toFixed(1)} MB`
const day = (iso: string) => new Date(iso).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' })

export default function AppDownloads() {
  const [latest, setLatest] = useState<Latest | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetch(`${BASE}/latest.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setLatest)
      .catch(() => setFailed(true))
  }, [])

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-bangers text-5xl md:text-7xl mb-4 text-accent uppercase tracking-wider text-center">DS Delivery</h1>
        <p className="text-accent/70 text-center mb-12">Ilovani yuklab oling va o&apos;rnating. Har doim eng oxirgi versiya yuklanadi.</p>

        <div className="space-y-6">
          {APPS.map((app) => {
            const meta = latest?.[app.key]
            // A program that was never published has no entry: show it as not available yet instead of a button that leads to "Not found".
            const missing = latest !== null && !meta
            const Icon = app.windows ? FaWindows : FaAndroid
            return (
              <div key={app.key} className="bg-primary/5 border-2 border-primary p-6 flex items-center gap-4">
                <Icon className="text-primary text-4xl shrink-0" />
                <div className="grow">
                  <div className="font-bangers text-3xl text-accent tracking-wide">{app.title}</div>
                  <div className="text-accent/60 text-sm">{app.note}</div>
                  <div className="text-accent/60 text-sm mt-1">
                    {meta
                      ? `Versiya ${meta.version} · ${day(meta.updatedAt)} · ${mb(meta.size)}`
                      : missing
                        ? 'Hali yuklanmagan'
                        : failed
                          ? 'Versiya ma’lumoti olinmadi'
                          : 'Yuklanmoqda…'}
                  </div>
                  {app.windows && meta && (
                    <div className="text-accent/50 text-xs mt-1">
                      Windows &quot;noma&apos;lum nashriyotchi&quot; deb ogohlantirsa: &quot;Batafsil&quot; → &quot;Baribir ishga tushirish&quot;.
                    </div>
                  )}
                </div>
                {!missing && (
                  <a
                    href={`${BASE}/${app.file}`}
                    download
                    className="bg-primary text-accent font-bangers text-xl px-5 py-3 uppercase tracking-wider flex items-center gap-2 hover:opacity-90 shrink-0"
                  >
                    <FaDownload /> Yuklash
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
