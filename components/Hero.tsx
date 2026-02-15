"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Terminal, ArrowRight, Download, ShieldCheck, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState("")

  useEffect(() => {
    setCurrentText("") // Reset on effect run to avoid Strict Mode duplication
    const timeout = setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        if (i < text.length) {
          setCurrentText((prev) => prev + text.charAt(i))
          i++
        } else {
          clearInterval(timer)
        }
      }, 50)
      return () => clearInterval(timer)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span>{currentText}</span>
}

export default function Hero() {
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
     // Surprise reveal timer
     const timer = setTimeout(() => setShowProfile(true), 1500)
     return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 text-primary font-mono text-sm mb-6 bg-secondary/50 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-primary/20">
              <Terminal size={14} />
              <span className="flex gap-1">
                shiv@devops:~$ <Typewriter text="./init_portfolio.sh --interactive" delay={500} />
                <span className="animate-pulse">_</span>
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Shiv Jani
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground flex items-center gap-3">
              DevOps Enthusiast <span className="text-primary/30">|</span> 
              <span className="relative">
                Linux Practitioner
                <motion.span 
                   className="absolute -right-6 -top-1 text-primary"
                   animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Zap size={16} fill="currentColor" />
                </motion.span>
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            I build and automate reliable systems using <span className="text-foreground font-semibold border-b border-primary/50 hover:text-primary transition-colors cursor-default">Linux</span>,{" "}
            <span className="text-foreground font-semibold border-b border-primary/50 hover:text-primary transition-colors cursor-default">CI/CD</span>, and{" "}
            <span className="text-foreground font-semibold border-b border-primary/50 hover:text-primary transition-colors cursor-default">cloud tools</span>.
            Focusing on infrastructure as code and observable reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-background bg-primary rounded-xl hover:bg-primary/90 transition-all gap-2 shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.5)]"
            >
              View Projects
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/DevOps_Trainee_Resume_Shiv_Jani.docx"
              download="Shiv_Jani_Resume.docx"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-foreground bg-secondary/30 border border-border rounded-xl hover:bg-secondary/50 hover:text-primary hover:border-primary/50 transition-all gap-2 backdrop-blur-sm"
            >
              Download Resume
              <Download size={18} />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column: Surprise Profile Image */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                transition={{ 
                   type: "spring", 
                   stiffness: 100, 
                   damping: 20, 
                   duration: 0.8 
                }}
                className="relative group w-64 h-64 md:w-80 md:h-80"
              >
                {/* Holographic Glowing Rings */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse group-hover:bg-primary/30 transition-colors" />
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center pointer-events-none"
                />
                
                {/* 3D Container */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full rounded-full p-2 bg-linear-to-br from-primary/30 via-transparent to-primary/10 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden"
                >
                  <img 
                    src="/assets/profile.jpg" 
                    alt="Shiv Jani"
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  
                  {/* Scanline Effect Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-30 group-hover:opacity-10" />
                </motion.div>

                {/* Cyber Badge */}
                <motion.div 
                   initial={{ x: 50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 1, duration: 0.5 }}
                   className="absolute -bottom-4 -right-4 bg-background/80 backdrop-blur-lg border border-primary/30 px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 text-primary font-mono text-xs z-20 overflow-hidden"
                >
                   <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                   <ShieldCheck size={14} className="relative z-10" />
                   <span className="relative z-10 font-bold uppercase tracking-widest">Verified Operator</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
