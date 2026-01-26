'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError('Email yoki parol noto\'g\'ri!')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('Tizimda xatolik yuz berdi. Keyinroq qayta urinib ko\'ring.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-sans">
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="bg-darker/40 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bangers text-primary tracking-wider mb-2">ADMIN LOGIN</h1>
            <p className="text-accent/60 text-sm">Boshqaruv paneliga kirish</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-accent/80 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-accent/40 group-focus-within:text-primary transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-darker/60 border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all text-white placeholder:text-accent/20"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-accent/80 ml-1">Parol</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-accent/40 group-focus-within:text-primary transition-colors">
                  <FaLock />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-darker/60 border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all text-white placeholder:text-accent/20"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary hover:bg-primary/90 text-darker font-bold rounded-xl shadow-lg shadow-primary/20 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-darker/30 border-t-darker rounded-full animate-spin" />
              ) : (
                <>
                  <span>KIRISH</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.div>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push('/')}
              className="text-accent/40 hover:text-primary text-sm transition-colors"
            >
              ← Portfolioga qaytish
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
