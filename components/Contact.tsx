'use client'

import { useState } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaTelegramPlane } from 'react-icons/fa'
import { PROFILE } from '@/lib/data'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const socialLinks = [
    { icon: FaEnvelope, label: 'Email', url: `mailto:${PROFILE.email}` },
    { icon: FaGithub, label: 'GitHub', url: PROFILE.github },
    { icon: FaLinkedin, label: 'LinkedIn', url: PROFILE.linkedin },
    { icon: FaTelegramPlane, label: 'Telegram', url: PROFILE.telegram },
  ]

  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-bangers text-6xl md:text-8xl mb-16 text-accent uppercase tracking-wider relative inline-block">
          Bog&apos;lanish
          <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-primary shadow-[0_0_20px_var(--primary)]" />
        </h2>

        {/* Message Form */}
        <div className="mb-20 text-left max-w-2xl mx-auto bg-primary/5 border-2 border-primary p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-primary uppercase font-bangers text-xl mb-2">Ism</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary border-2 border-primary/30 p-3 text-accent focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-primary uppercase font-bangers text-xl mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary border-2 border-primary/30 p-3 text-accent focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-primary uppercase font-bangers text-xl mb-2">Mavzu</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-secondary border-2 border-primary/30 p-3 text-accent focus:border-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-primary uppercase font-bangers text-xl mb-2">Xabar</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-secondary border-2 border-primary/30 p-3 text-accent focus:border-primary outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-primary text-secondary font-bangers text-2xl uppercase tracking-wider hover:bg-accent transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Yuborilmoqda...' : 'Xabar Yuborish'}
            </button>
            {status === 'success' && <p className="text-green-500 font-bold text-center">Xabaringiz yuborildi!</p>}
            {status === 'error' && <p className="text-red-500 font-bold text-center">Xatolik yuz berdi. Qayta urinib ko&apos;ring.</p>}
          </form>
        </div>

        <p className="text-xl leading-relaxed mb-12 opacity-90">
          Menga quyidagi ijtimoiy tarmoqlar orqali murojaat qiling!
        </p>

        <div className="flex justify-center gap-8 flex-wrap mb-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="w-20 h-20 flex items-center justify-center border-3 border-primary bg-primary/5 text-primary text-4xl transition-all hover:rotate-[5deg] hover:scale-110 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Icon className="relative z-10 group-hover:text-accent transition-colors duration-300" />
              </a>
            )
          })}
        </div>

        {PROFILE.resumeUrl && (
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 font-mono font-bold text-base uppercase tracking-wider border-3 border-primary bg-primary text-accent relative overflow-hidden transition-all hover:translate-y-[-3px] hover:shadow-[0_5px_30px_rgba(227,24,55,0.8)] group"
          >
            <span className="relative z-10">Resume Yuklash</span>
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[100%] transition-all duration-500" />
          </a>
        )}
      </div>
    </section>
  )
}
