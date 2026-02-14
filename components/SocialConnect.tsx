"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, Linkedin, Github, Youtube, X } from "lucide-react"

export default function SocialConnect() {
  const [isOpen, setIsOpen] = useState(false)

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/shiv-jani/",
      label: "Follow on LinkedIn",
      color: "bg-[#0077b5]",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/Jani-shiv",
      label: "Follow on GitHub",
      color: "bg-[#333]",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      href: "https://www.youtube.com/@devopsnidiary",
      label: "Join DevOps Channel",
      color: "bg-[#ff0000]",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-card border border-border p-4 rounded-2xl shadow-2xl min-w-[240px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">Let&apos;s Connect</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all group"
                >
                  <div className={`p-2 rounded-lg text-white ${link.color}`}>
                    {link.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-foreground">{link.name}</span>
                    <span className="text-xs text-muted-foreground">{link.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-background rounded-full shadow-lg flex items-center justify-center border-4 border-background focus:outline-none"
        aria-label="Connect with me"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Share2 size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
