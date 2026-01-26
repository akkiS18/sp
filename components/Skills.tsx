'use client'

import { useEffect, useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io5'
import * as SiIcons from 'react-icons/si'
import { SKILLS } from '@/lib/data'

const getIcon = (iconName: string) => {
  const allIcons: any = { ...FaIcons, ...IoIcons, ...SiIcons }
  const IconComponent = allIcons[iconName]
  return IconComponent ? IconComponent : FaIcons.FaCode
}

export default function Skills() {
  const [glitchingId, setGlitchingId] = useState<string | null>(null)

  useEffect(() => {
    const triggerRandomGlitch = () => {
      const randomIndex = Math.floor(Math.random() * SKILLS.length)
      const randomSkill = SKILLS[randomIndex]
      setGlitchingId(randomSkill.id)

      setTimeout(() => {
        setGlitchingId(null)
      }, 1000) // Longer duration for effect
      
      setTimeout(triggerRandomGlitch, Math.random() * 3000 + 2000) // Random interval 2-5s
    }

    const timer = setTimeout(triggerRandomGlitch, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="skills" className="min-h-screen py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-bangers text-6xl md:text-8xl text-accent uppercase tracking-wider relative inline-block">
            Ko&apos;nikmalar
            <span className="absolute bottom-[-10px] left-0 w-full h-1 bg-primary shadow-[0_0_20px_var(--primary)]" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((skill) => {
            const Icon = getIcon(skill.icon)
            const isGlitching = glitchingId === skill.id
            
            return (
              <div 
                key={skill.id}
                className="bg-primary/5 border-2 border-primary p-10 text-center relative overflow-hidden transition-all duration-300 h-full"
              >
                {/* Background gradient (no hover effect) */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-transparent opacity-5" />

                <div className="relative z-10">
                  <Icon 
                    className="text-6xl mb-6 mx-auto text-primary"
                    style={{ filter: 'drop-shadow(0 0 10px var(--primary))' }}
                  />
                  
                  <div className="relative inline-block mb-4">
                    <h3 
                      className="font-bangers text-3xl text-accent uppercase tracking-wider relative"
                      data-text={skill.name}
                      style={{
                        textShadow: isGlitching ? '-2px 0 var(--glitch-1), 2px 0 var(--glitch-2)' : 'none'
                      }}
                    >
                      {skill.name}
                      
                      {/* Glitch layer 1 - RED/PINK */}
                      {isGlitching && (
                        <span 
                          className="absolute top-0 left-0 w-full h-full pointer-events-none"
                          style={{
                            color: 'var(--glitch-1)',
                            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                            zIndex: -1,
                            animation: 'text-glitch 0.3s infinite'
                          }}
                        >
                          {skill.name}
                        </span>
                      )}
                      
                      {/* Glitch layer 2 - CYAN */}
                      {isGlitching && (
                        <span 
                          className="absolute top-0 left-0 w-full h-full pointer-events-none"
                          style={{
                            color: 'var(--glitch-2)',
                            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                            zIndex: -2,
                            animation: 'text-glitch 0.3s infinite reverse'
                          }}
                        >
                          {skill.name}
                        </span>
                      )}

                      {/* Flash effect */}
                      {isGlitching && (
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(transparent 0%, rgba(255, 255, 255, 0.8) 49%, rgba(255, 255, 255, 0.8) 51%, transparent 100%)',
                            backgroundSize: '100% 2px',
                            animation: 'glitch-flash 0.3s steps(5) infinite'
                          }}
                        />
                      )}
                    </h3>
                  </div>
                  
                  <div className="text-base opacity-80 leading-relaxed space-y-1">
                    {skill.items.map((item, i) => (
                      <div key={i}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
