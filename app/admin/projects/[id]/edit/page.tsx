'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaUpload, FaSave, FaTimes } from 'react-icons/fa'
import Link from 'next/link'

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fetching, setFetching] = useState(true)
  
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

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${params.id}`)
      const data = await res.json()
      
      setFormData({
        title: data.title,
        type: data.type,
        description: data.description,
        tech: data.tech.join(', '),
        liveUrl: data.liveUrl || '',
        githubUrl: data.githubUrl || '',
        imageUrl: data.imageUrl || '',
        order: data.order,
        published: data.published,
      })
    } catch (error) {
      console.error('Failed to fetch project:', error)
    } finally {
      setFetching(false)
    }
  }

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
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
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

      const res = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
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
        alert('Failed to update project')
      }
    } catch (error) {
      console.error('Failed to update project:', error)
      alert('Failed to update project')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="py-12 text-center text-accent/50">Loading project...</div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-5xl font-bangers text-primary">EDIT PROJECT</h1>
          <p className="text-accent/70">Update project details</p>
        </div>
        <Link
          href="/admin/projects"
          className="flex items-center gap-2 px-6 py-3 transition-all text-accent/70 hover:text-primary"
        >
          <FaTimes /> Cancel
        </Link>
      </div>

      {/* Form - Same as New Project */}
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 transition-colors border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              placeholder="e.g., Akademx Platform"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
              Project Type *
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 transition-colors border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              placeholder="e.g., Web Platform, Mobile App"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 transition-colors border-2 resize-none bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              placeholder="Describe your project..."
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
              Technologies * (comma separated)
            </label>
            <input
              type="text"
              name="tech"
              value={formData.tech}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 transition-colors border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              placeholder="e.g., Next.js, TypeScript, Tailwind CSS"
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
              Live URL
            </label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-colors border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              placeholder="https://example.com"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 transition-colors border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
              Project Image
            </label>
            <div className="flex gap-4">
              <label className="flex-1 px-4 py-3 transition-colors border-2 cursor-pointer bg-primary/10 border-primary/50 text-accent hover:border-primary">
                <div className="flex items-center justify-center gap-2">
                  <FaUpload />
                  <span>{uploading ? 'Uploading...' : 'Change Image'}</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            {formData.imageUrl && (
              <div className="mt-4">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="max-w-xs border-2 border-primary/50"
                />
              </div>
            )}
          </div>

          {/* Order */}
          <div>
            <label className="block mb-2 text-sm tracking-wider uppercase text-accent">
              Display Order
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 transition-colors border-2 bg-secondary border-primary/50 text-accent focus:border-primary focus:outline-none"
              placeholder="0"
            />
            <p className="mt-1 text-sm text-accent/50">Lower numbers appear first</p>
          </div>

          {/* Published */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 border-2 bg-secondary border-primary/50 checked:bg-primary focus:outline-none"
              />
              <span className="text-sm tracking-wider uppercase text-accent">
                Published
              </span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex items-center gap-2 px-8 py-4 font-bold tracking-wider uppercase transition-all bg-primary text-accent hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave />
              {loading ? 'Updating...' : 'Update Project'}
            </button>
            <Link
              href="/admin/projects"
              className="flex items-center gap-2 px-8 py-4 transition-all bg-transparent border-2 border-primary/50 text-accent hover:border-primary"
            >
              <FaTimes />
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}