'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash } from 'react-icons/fa'

interface Project {
  id: string
  title: string
  type: string
  description: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  order: number
  published: boolean
  createdAt: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          setProjects(data)
        }
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  const togglePublish = async (project: Project) => {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, published: !project.published }),
      })

      if (res.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Failed to update project:', error)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-5xl font-bangers text-primary">PROJECTS</h1>
          <p className="text-accent/70">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 font-bold tracking-wider uppercase transition-all bg-primary text-accent hover:bg-primary/90"
        >
          <FaPlus /> New Project
        </Link>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="py-12 text-center text-accent/50">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="py-12 text-center border-2 bg-primary/5 border-primary/30">
          <p className="mb-4 text-accent/70">No projects yet</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-6 py-3 font-bold bg-primary text-accent"
          >
            <FaPlus /> Create First Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {Array.isArray(projects) && projects.map((project) => (
            <div
              key={project.id}
              className="p-6 transition-all border-2 bg-primary/5 border-primary/30 hover:border-primary"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bangers text-accent">{project.title}</h3>
                    {project.published ? (
                      <span className="px-3 py-1 text-xs tracking-wider uppercase border bg-primary/20 text-primary border-primary">
                        Published
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs tracking-wider uppercase border bg-accent/20 text-accent border-accent/30">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mb-2 text-sm text-accent/70">{project.type}</p>
                  <p className="mb-3 text-accent/80 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(project.tech) && project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs border bg-primary/10 text-primary border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => togglePublish(project)}
                    className="p-3 transition-all border bg-primary/10 text-primary hover:bg-primary hover:text-accent border-primary"
                    title={project.published ? 'Unpublish' : 'Publish'}
                  >
                    {project.published ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-3 transition-all border bg-primary/10 text-primary hover:bg-primary hover:text-accent border-primary"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => deleteProject(project.id)}
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