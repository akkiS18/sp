'use client'

import { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa'
import * as Icons from 'react-icons/fa'

interface Skill {
  id: string
  name: string
  icon: string
  items: string[]
  order: number
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    icon: 'FaCode',
    items: '',
    order: 0,
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          setSkills(data)
        }
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const itemsArray = formData.items.split(',').map((i) => i.trim()).filter(Boolean)
    const payload = {
      ...formData,
      items: itemsArray,
      order: parseInt(formData.order.toString()),
    }

    try {
      if (editing) {
        // Update
        await fetch(`/api/skills/${editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        // Create
        await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      
      fetchSkills()
      resetForm()
    } catch (error) {
      console.error('Failed to save skill:', error)
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditing(skill.id)
    setFormData({
      name: skill.name,
      icon: skill.icon,
      items: skill.items.join(', '),
      order: skill.order,
    })
    setAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return

    try {
      await fetch(`/api/skills/${id}`, { method: 'DELETE' })
      fetchSkills()
    } catch (error) {
      console.error('Failed to delete skill:', error)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', icon: 'FaCode', items: '', order: 0 })
    setEditing(null)
    setAdding(false)
  }

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName]
    return IconComponent ? <IconComponent className="text-5xl text-primary" /> : <Icons.FaCode className="text-5xl text-primary" />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-5xl font-bangers text-primary">SKILLS</h1>
          <p className="text-accent/70">Manage your skills and technologies</p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 px-6 py-3 font-bold tracking-wider uppercase transition-all bg-primary text-accent hover:bg-primary/90"
          >
            <FaPlus /> Add Skill
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {adding && (
        <div className="p-6 mb-8 border-2 bg-primary/5 border-primary">
          <h2 className="mb-4 text-2xl font-bangers text-accent">
            {editing ? 'EDIT SKILL' : 'NEW SKILL'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
                  Skill Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
                  placeholder="e.g., Frontend"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
                  Icon (React Icons)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
                  placeholder="e.g., FaReact, FaPalette"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
                Items * (comma separated)
              </label>
              <input
                type="text"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
                placeholder="e.g., React Native, React.js, Next.js"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                min="0"
                className="w-full px-4 py-3 border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 font-bold uppercase bg-primary text-accent hover:bg-primary/90"
              >
                <FaSave /> {editing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-primary/50 text-accent hover:border-primary"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Grid */}
      {loading ? (
        <div className="py-12 text-center text-accent/50">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(skills) && skills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 transition-all border-2 bg-primary/5 border-primary/30 hover:border-primary"
            >
              <div className="flex items-start justify-between mb-4">
                <div>{getIcon(skill.icon)}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 transition-all bg-primary/10 text-primary hover:bg-primary hover:text-accent"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 transition-all bg-primary/10 text-primary hover:bg-primary hover:text-accent"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <h3 className="mb-2 text-2xl font-bangers text-accent">{skill.name}</h3>
              <div className="space-y-1 text-sm text-accent/80">
                {Array.isArray(skill.items) && skill.items.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}