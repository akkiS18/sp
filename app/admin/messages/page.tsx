'use client'

import { useEffect, useState } from 'react'
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa'

interface Message {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  read: boolean
  createdAt: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          setMessages(data)
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const messagesArray = Array.isArray(messages) ? messages : []

  const toggleRead = async (message: Message) => {
    try {
      const res = await fetch(`/api/messages/${message.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !message.read }),
      })

      if (res.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error('Failed to update message:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setMessages(messagesArray.filter((m) => m.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  const filteredMessages = messagesArray.filter((m) => {
    if (filter === 'unread') return !m.read
    if (filter === 'read') return m.read
    return true
  })

  const unreadCount = messagesArray.filter((m) => !m.read).length

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-5xl font-bangers text-primary">MESSAGES</h1>
        <p className="text-accent/70">
          {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'No unread messages'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all ${
            filter === 'all'
              ? 'bg-primary text-accent'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          All ({messages.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all ${
            filter === 'unread'
              ? 'bg-primary text-accent'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all ${
            filter === 'read'
              ? 'bg-primary text-accent'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          Read ({messages.length - unreadCount})
        </button>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="py-12 text-center text-accent/50">Loading messages...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="py-12 text-center border-2 bg-primary/5 border-primary/30">
          <p className="text-accent/70">No messages found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`border-2 p-6 transition-all ${
                message.read
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-primary/10 border-primary'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bangers text-accent">{message.name}</h3>
                    {!message.read && (
                      <span className="px-2 py-1 text-xs tracking-wider uppercase bg-primary text-accent">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="mb-1 text-accent/70">{message.email}</p>
                  {message.subject && (
                    <p className="mb-2 font-bold text-primary">{message.subject}</p>
                  )}
                  <p className="mb-3 text-sm text-accent/50">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                  <p className="whitespace-pre-wrap text-accent/90">{message.message}</p>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => toggleRead(message)}
                    className="p-3 transition-all border bg-primary/10 text-primary hover:bg-primary hover:text-accent border-primary"
                    title={message.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {message.read ? <FaEnvelope /> : <FaEnvelopeOpen />}
                  </button>
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="p-3 transition-all border bg-primary/10 text-primary hover:bg-primary hover:text-accent border-primary"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}