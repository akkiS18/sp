'use client'

import { useEffect, useState } from 'react'
import { FaSave, FaUserCircle } from 'react-icons/fa'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    telegram: '',
    instagram: '',
    resumeUrl: '',
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setFormData({
            name: data.name || '',
            role: data.role || '',
            bio: data.bio || '',
            email: data.email || '',
            github: data.github || '',
            linkedin: data.linkedin || '',
            telegram: data.telegram || '',
            instagram: data.instagram || '',
            resumeUrl: data.resumeUrl || '',
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert('Profile muvaffaqiyatli saqlandi!')
      } else {
        alert('Xatolik yuz berdi.')
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Xatolik yuz berdi.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="py-12 text-center text-accent/50">Yuklanmoqda...</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2 text-5xl font-bangers text-primary">PROFILE SOZLAMALARI</h1>
        <p className="text-accent/70">Shaxsiy ma&apos;lumotlar va ijtimoiy tarmoqlar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Asosiy ma'lumotlar */}
        <div className="p-8 border-2 bg-primary/5 border-primary">
          <div className="flex items-center gap-4 mb-6">
            <FaUserCircle className="text-3xl text-primary" />
            <h2 className="text-2xl font-bangers text-accent">ASOSIY MA&apos;LUMOTLAR</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Ism-sharif</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Kasbi / Rol</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Biografiya (Hero qismi uchun)</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
              className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Ijtimoiy tarmoqlar */}
        <div className="p-8 border-2 bg-primary/5 border-primary">
          <h2 className="mb-6 text-2xl font-bangers text-accent">IJTIMOIY TARMOQLAR & LINKLAR</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">GitHub Link</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">LinkedIn Link</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Telegram Link (masalan: https://t.me/username)</label>
              <input
                type="url"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Instagram Link</label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Resume URL (Drive yoki R2 linki)</label>
              <input
                type="text"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center w-full gap-2 py-4 font-bold tracking-widest uppercase bg-primary text-accent hover:bg-primary/90 disabled:opacity-70"
        >
          <FaSave /> {saving ? 'SAQLANMOQDA...' : 'BARCHASINI SAQLASH'}
        </button>
      </form>
    </div>
  )
}
