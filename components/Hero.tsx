'use client'

import { useEffect, useState } from 'react'
import { PROFILE } from '@/lib/data'

export default function Hero() {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    let glitchTimeout: NodeJS.Timeout;
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      glitchTimeout = setTimeout(() => {
        setIsGlitching(false);
      }, 700);
    }, 3000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(glitchTimeout);
    };
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden">
      {/* Portal spin background */}
      <div 
        className="absolute inset-[-50%] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, var(--primary) 0%, transparent 50%)',
          animation: 'portal-spin 20s linear infinite'
        }}
      />

      <div className="relative z-10 max-w-5xl text-center">

        {/* Main Title with Glitch */}
        <div className="relative inline-block mb-4">
          <h1 
            className="relative leading-none font-bangers text-7xl md:text-9xl text-accent uppercase"
            data-text={PROFILE.name}
            style={{
              animation: 'fadeInUp 1s ease 0.3s both',
              textShadow: isGlitching ? '-2px 0 var(--glitch-1), 2px 0 var(--glitch-2)' : 'none'
            }}
          >
            {PROFILE.name}
            
            {/* Glitch layer 1 - RED/PINK - Always present but only animates when glitching */}
            <span 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                color: 'var(--glitch-1)',
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                zIndex: -1,
                animation: isGlitching ? 'text-glitch 0.3s infinite' : 'none'
              }}
            >
              {PROFILE.name}
            </span>
            
            {/* Glitch layer 2 - CYAN - Always present but only animates when glitching */}
            <span 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                color: 'var(--glitch-2)',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                zIndex: -2,
                animation: isGlitching ? 'text-glitch 0.3s infinite reverse' : 'none'
              }}
            >
              {PROFILE.name}
            </span>
          </h1>
          
          {/* Flash effect */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-100 ${isGlitching ? 'opacity-100' : 'opacity-0'}`}
            style={{
              background: 'linear-gradient(transparent 0%, rgba(255, 255, 255, 0.8) 49%, rgba(255, 255, 255, 0.8) 51%, transparent 100%)',
              backgroundSize: '100% 2px',
              animation: isGlitching ? 'glitch-flash 0.3s steps(5) infinite' : 'none'
            }}
          />
        </div>

        <p 
          className="text-2xl md:text-4xl text-primary mb-8 uppercase tracking-[4px]"
          style={{ animation: 'fadeInUp 1s ease 0.6s both' }}
        >
          {PROFILE.role}
        </p>

        <p 
          className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed opacity-90"
          style={{ animation: 'fadeInUp 1s ease 0.9s both' }}
        >
          {PROFILE.bio}
        </p>

        <div 
          className="flex flex-wrap justify-center gap-6"
          style={{ animation: 'fadeInUp 1s ease 1.2s both' }}
        >
          <button
            onClick={scrollToProjects}
            className="px-10 py-4 font-mono font-bold text-base uppercase tracking-wider border-3 border-primary bg-primary text-accent relative overflow-hidden transition-all hover:translate-y-[-3px] hover:shadow-[0_5px_30px_rgba(227,24,55,0.8)] group"
          >
            <span className="relative z-10">Loyihalarim</span>
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[100%] transition-all duration-500" />
          </button>
          
          <button
            onClick={scrollToContact}
            className="px-10 py-4 font-mono font-bold text-base uppercase tracking-wider border-3 border-accent bg-transparent text-accent transition-all hover:bg-accent hover:text-secondary hover:translate-y-[-3px] hover:shadow-[0_5px_30px_rgba(255,255,255,0.3)]"
          >
            Bog&apos;lanish
          </button>
        </div>
      </div>

      {/* Spider-Web Decorations */}
      <div 
        className="absolute w-[300px] h-[2px] top-[20%] left-[10%] opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          transform: 'rotate(-45deg)',
          animation: 'pulse-glow 2s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-[400px] h-[2px] bottom-[30%] right-[5%] opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          transform: 'rotate(30deg)',
          animation: 'pulse-glow 2s ease-in-out infinite 0.5s'
        }}
      />
      <div 
        className="absolute w-[250px] h-[2px] top-[60%] left-[15%] opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          transform: 'rotate(60deg)',
          animation: 'pulse-glow 2s ease-in-out infinite 1s'
        }}
      />
    </section>
  )
}