'use client'

import { useEffect, useState } from 'react'
import { FaProjectDiagram, FaTools, FaEnvelope, FaEye } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface StatCardProps {
  title: string
  fetchUrl: string
  icon: IconType
  processor: (data: any) => number | string
}

function StatCard({ title, fetchUrl, icon: Icon, processor }: StatCardProps) {
  const [value, setValue] = useState<number | string>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(fetchUrl)
        if (res.ok) {
          const data = await res.json()
          setValue(processor(data))
        } else {
          setError(true)
        }
      } catch (err) {
        console.error(`Failed to fetch ${title}:`, err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [title, fetchUrl, processor])

  return (
    <div className="p-6 transition-all border-2 bg-primary/5 border-primary hover:border-accent">
      <div className="flex items-center justify-between mb-4">
        <Icon className="text-4xl text-primary" />
      </div>
      <div className="mb-2 text-5xl font-bangers text-accent">
        {loading ? (
          <div className="h-10 w-16 bg-primary/20 animate-pulse rounded" />
        ) : error ? (
          <span className="text-sm font-sans text-red-500">Error</span>
        ) : (
          value
        )}
      </div>
      <div className="text-sm tracking-wider uppercase text-accent/70">
        {title}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-5xl font-bangers text-primary">DASHBOARD</h1>
        <p className="text-accent/70">Welcome back to the admin portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Unread Messages"
          fetchUrl="/api/messages"
          icon={FaEnvelope}
          processor={(data) => (Array.isArray(data) ? data.filter((m: any) => !m.read).length : 0)}
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="mb-6 text-3xl font-bangers text-accent">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <a
            href="/admin/messages"
            className="p-6 text-center transition-all border-2 bg-primary/10 border-primary hover:bg-primary/20"
          >
            <div className="mb-2 font-bold text-accent">View Messages</div>
            <div className="text-sm text-accent/70">Check new contact messages</div>
          </a>
        </div>
      </div>
    </div>
  )
}