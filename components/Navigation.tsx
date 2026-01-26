'use client'

import { useEffect, useState } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-black/95'
      } border-b-2 border-primary`}
      style={{ animation: 'slideInLeft 0.8s ease' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <ul className="flex justify-end gap-8 list-none">
          <li>
            <button 
              onClick={() => scrollToSection('home')}
              className="text-accent font-bold text-sm uppercase tracking-wider relative group hover:text-primary transition-colors"
            >
              Home
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-accent font-bold text-sm uppercase tracking-wider relative group hover:text-primary transition-colors"
            >
              Skills
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-accent font-bold text-sm uppercase tracking-wider relative group hover:text-primary transition-colors"
            >
              Projects
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-accent font-bold text-sm uppercase tracking-wider relative group hover:text-primary transition-colors"
            >
              Contact
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
