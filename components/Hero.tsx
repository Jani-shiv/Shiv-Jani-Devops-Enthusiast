"use client"

import { motion } from "framer-motion"
import { Terminal, ArrowRight, Download } from "lucide-react"
import { useState, useEffect } from "react"

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        if (i < text.length) {
          setCurrentText((prev) => prev + text.charAt(i))
          i++
        } else {
          clearInterval(timer)
        }
      }, 50) // Typing speed
      return () => clearInterval(timer)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span>{currentText}</span>
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 text-primary font-mono text-sm mb-6 bg-secondary/50 backdrop-blur-sm w-fit px-4 py-2 rounded-full border border-primary/20">
            <Terminal size={14} />
            <span className="flex gap-1">
              shiv@devops:~$ <Typewriter text="./init_portfolio.sh --interactive" delay={500} />
              <span>_</span>
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Shiv Jani
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
            DevOps Engineer <span className="text-primary">|</span> Linux Practitioner
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          I build and automate reliable systems using <span className="text-foreground font-semibold border-b border-primary/50">Linux</span>,{" "}
          <span className="text-foreground font-semibold border-b border-primary/50">CI/CD</span>, and{" "}
          <span className="text-foreground font-semibold border-b border-primary/50">cloud tools</span>.
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
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-background bg-primary rounded-lg hover:bg-primary/90 transition-colors gap-2"
          >
            View Projects
            <ArrowRight size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/DevOps_Trainee_Resume_Shiv_Jani.docx"
            download="Shiv_Jani_Resume.docx"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-foreground bg-secondary/50 border border-border rounded-lg hover:bg-secondary hover:text-primary hover:border-primary/50 transition-all gap-2 backdrop-blur-sm"
          >
            Download Resume
            <Download size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
