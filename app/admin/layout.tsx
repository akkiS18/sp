'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaHome, FaProjectDiagram, FaTools, FaEnvelope, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useEffect } from 'react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: FaHome },
  { name: 'Messages', href: '/admin/messages', icon: FaEnvelope },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && !pathname?.includes('/login')) {
      router.push('/admin/login')
    }
  }, [status, router, pathname])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="text-2xl text-primary font-bangers">Loading...</div>
      </div>
    )
  }

  if (pathname?.includes('/login')) {
    return <>{children}</>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-50 w-64 h-full border-r-2 bg-darker border-primary/30">
        {/* Logo */}
        <div className="p-6 border-b-2 border-primary/30">
          <h1 className="text-3xl font-bangers text-primary">ADMIN</h1>
          <p className="mt-1 text-sm text-accent/50">{session.user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive
                        ? 'bg-primary/20 border-l-4 border-primary text-primary'
                        : 'text-accent/70 hover:bg-primary/10 hover:text-primary border-l-4 border-transparent'
                    }`}
                  >
                    <Icon className="text-xl" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t-2 border-primary/30">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center w-full gap-3 px-4 py-3 transition-colors text-accent/70 hover:bg-primary/10 hover:text-primary"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-8 ml-64">
        {children}
      </main>
    </div>
  )
}