"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Events", href: "#events" },
  { name: "Community", href: "#community" },
  { name: "Experience", href: "#experience" },
  { name: "Content", href: "#content" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-7xl",
        scrolled ? "top-4" : "top-4"
      )}
    >
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-lg px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-primary font-mono font-bold text-lg hover:opacity-80 transition-opacity shrink-0">
          <Terminal size={20} />
          <span className="hidden sm:inline">~/shiv_jani</span>
          <span className="sm:hidden">~/sj</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs xl:text-sm font-medium text-muted-foreground hover:text-primary transition-all px-3 py-1.5 rounded-full hover:bg-white/5 relative group"
            >
              <span className="text-primary/50 font-mono mr-1 text-[10px] xl:text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                {String(index + 1).padStart(2, '0')}.
              </span>
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground p-2 hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-4 grid grid-cols-1 gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-primary font-mono text-xs opacity-70">{String(index + 1).padStart(2, '0')}.</span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
