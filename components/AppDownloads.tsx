'use client'

import { useEffect, useState } from 'react'
import { FaAndroid, FaDownload } from 'react-icons/fa'

const BASE = 'https://apk.sultonxoja.uz'

type Meta = { version: string; size: number; updatedAt: string }
type Latest = Partial<Record<'restoran' | 'taksi', Meta>>

const APPS: Array<{ key: 'restoran' | 'taksi'; title: string; note: string }> = [
  { key: 'restoran', title: 'Restoran ilovasi', note: 'Buyurtmalarni qabul qilish uchun' },
  { key: 'taksi', title: 'Taksi ilovasi', note: 'Taksi operatori va haydovchilar uchun' },
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
            return (
              <div key={app.key} className="bg-primary/5 border-2 border-primary p-6 flex items-center gap-4">
                <FaAndroid className="text-primary text-4xl shrink-0" />
                <div className="grow">
                  <div className="font-bangers text-3xl text-accent tracking-wide">{app.title}</div>
                  <div className="text-accent/60 text-sm">{app.note}</div>
                  <div className="text-accent/60 text-sm mt-1">
                    {meta ? `Versiya ${meta.version} · ${day(meta.updatedAt)} · ${mb(meta.size)}` : failed ? 'Versiya ma’lumoti olinmadi' : 'Yuklanmoqda…'}
                  </div>
                </div>
                <a
                  href={`${BASE}/${app.key}.apk`}
                  download
                  className="bg-primary text-accent font-bangers text-xl px-5 py-3 uppercase tracking-wider flex items-center gap-2 hover:opacity-90 shrink-0"
                >
                  <FaDownload /> Yuklash
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
