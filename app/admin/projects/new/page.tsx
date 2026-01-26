'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUpload, FaSave, FaTimes } from 'react-icons/fa'
import Link from 'next/link'

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    tech: '',
    liveUrl: '',
    githubUrl: '',
    imageUrl: '',
    order: 0,
    published: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await res.json()
      if (data.url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.url }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const techArray = formData.tech.split(',').map((t) => t.trim()).filter(Boolean)

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tech: techArray,
          order: parseInt(formData.order.toString()),
        }),
      })

      if (res.ok) {
        router.push('/admin/projects')
      } else {
        alert('Failed to create project')
      }
    } catch (error) {
      console.error('Failed to create project:', error)
      alert('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-5xl font-bangers text-primary">NEW PROJECT</h1>
          <p className="text-accent/70">Add a new project to your portfolio</p>
        </div>
        <Link
          href="/admin/projects"
          className="flex items-center gap-2 px-6 py-3 transition-all text-accent/70 hover:text-primary"
        >
          <FaTimes /> Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Project Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 bg-secondary border-2 border-primary/50 text-accent focus:border-primary focus:outline-none" />
          </div>

          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Project Type *</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-3 bg-secondary border-2 border-primary/50 text-accent focus:border-primary focus:outline-none" />
          </div>

          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-secondary border-2 border-primary/50 text-accent focus:border-primary focus:outline-none resize-none" />
          </div>

          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Technologies (comma separated) *</label>
            <input type="text" name="tech" value={formData.tech} onChange={handleChange} required className="w-full px-4 py-3 bg-secondary border-2 border-primary/50 text-accent focus:border-primary focus:outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Live URL</label>
              <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="w-full px-4 py-3 bg-secondary border-2 border-primary/50 text-accent focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">GitHub URL</label>
              <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full px-4 py-3 bg-secondary border-2 border-primary/50 text-accent focus:border-primary focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Project Image</label>
            <div className="flex gap-4">
              <label className="flex-1 px-4 py-3 border-2 border-primary/50 bg-primary/10 text-accent cursor-pointer hover:border-primary transition-all">
                <div className="flex items-center justify-center gap-2">
                  <FaUpload />
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
            {formData.imageUrl && (
              <div className="mt-4">
                <img src={formData.imageUrl} alt="Preview" className="max-w-xs border-2 border-primary/50" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm tracking-wider uppercase text-accent">Display Order</label>
              <input type="number" name="order" value={formData.order} onChange={handleChange} min="0" className="w-full px-4 py-3 bg-secondary border-2 border-primary/50 text-accent focus:border-primary focus:outline-none" />
            </div>
            <div className="flex items-end pb-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="w-5 h-5 border-2 border-primary/50 bg-secondary checked:bg-primary" />
                <span className="text-sm tracking-wider uppercase text-accent">Published</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" disabled={loading || uploading} className="flex items-center gap-2 px-8 py-4 bg-primary text-accent font-bold uppercase tracking-wider hover:bg-primary/90 disabled:opacity-50">
              <FaSave /> {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
