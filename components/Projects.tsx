'use client'

import { PROJECTS } from '@/lib/data'

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-bangers text-6xl md:text-8xl text-accent uppercase tracking-wider relative inline-block">
            Loyihalar
            <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-primary shadow-[0_0_20px_var(--primary)]" />
          </h2>
        </div>

        <div className="space-y-16">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="bg-primary/5 border-3 border-primary relative overflow-hidden transition-all duration-400 hover:translate-y-[-10px] hover:shadow-[0_20px_60px_rgba(227,24,55,0.5)] group"
            >
              <div className="p-12 relative z-10">
                <h3 className="font-bangers text-5xl text-primary mb-4 uppercase tracking-wider">
                  {project.title}
                </h3>
                
                <p className="text-accent text-lg mb-6 uppercase tracking-wider opacity-70">
                  {project.type}
                </p>
                
                <p className="text-lg leading-relaxed opacity-90 mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-primary/20 border border-primary text-sm uppercase tracking-wide transition-all hover:bg-primary hover:translate-y-[-2px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border-2 border-primary bg-transparent text-primary font-bold uppercase tracking-wide transition-all hover:bg-primary hover:text-accent hover:translate-x-[5px]"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border-2 border-primary bg-transparent text-primary font-bold uppercase tracking-wide transition-all hover:bg-primary hover:text-accent hover:translate-x-[5px]"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
