"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, animate } from "framer-motion"
import { Mail, Github, Linkedin, Send, User, MessageSquare, CheckCircle, AlertCircle, Youtube, Activity } from "lucide-react"

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView && ref.current) {
      ref.current.textContent = "0" + suffix
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
          }
        }
      })
      return () => controls.stop()
    }
  }, [inView, value, suffix])

  return <span ref={ref} />
}

export default function Contact() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // Direct client-side submission to FormSubmit.co
      const response = await fetch("https://formsubmit.co/ajax/shivjani2005@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          name, 
          message,
          _subject: `Portfolio Message from ${name}`,
          _template: "table",
          _captcha: "false" 
        }),
      })

      const result = await response.json();

      if (response.ok) {
        setStatus("success")
        setName("")
        setMessage("")
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        console.error("FormSubmit Error:", result)
        setStatus("error")
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column: Text & Socials */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              <span className="text-primary">07.</span> Let&apos;s Build Something <br className="hidden md:block"/>
              <span className="text-primary">Extraordinary</span> Together
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              I&apos;m always excited to connect with fellow developers and visionaries. 
              Whether you have a project in mind or just want to chat about the latest in tech, 
              drop me a line! 
              👋
            </p>

            {/* Social Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
               {[
                 { label: "LinkedIn", value: 2000, suffix: "+", icon: <Linkedin size={16} className="text-blue-500" />, desc: "Connections" },
                 { label: "GitHub", value: 1500, suffix: "+", icon: <Github size={16} className="text-purple-500" />, desc: "Monthly Visitors" },
                 { label: "YouTube", value: 30000, suffix: "+", icon: <Youtube size={16} className="text-red-500" />, desc: "Total Views" },
                 { label: "Portfolio", value: 1000, suffix: "+", icon: <Activity size={16} className="text-green-500" />, desc: "Live Visits" },
               ].map((stat, i) => (
                 <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-secondary/20 border border-primary/10 p-4 rounded-xl flex flex-col items-center lg:items-start transition-colors hover:bg-secondary/40 hover:border-primary/30"
                 >
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono mb-1">
                      {stat.icon}
                      {stat.label}
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground/60">{stat.desc}</div>
                 </motion.div>
               ))}
            </div>

            <div className="flex justify-center lg:justify-start gap-5">
              {[
                { icon: <Github size={22} />, href: "https://github.com/Jani-shiv", label: "GitHub" },
                { icon: <Linkedin size={22} />, href: "https://www.linkedin.com/in/shiv-jani/", label: "LinkedIn" },
                { icon: <Mail size={22} />, href: "mailto:shivjani2005@gmail.com", label: "Email" },
                { icon: <Youtube size={22} />, href: "https://youtube.com/@devops-shiv?si=xyz", label: "YouTube" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: "#fff" }} // Assuming dark mode context, white on hover
                  className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm border border-border/50"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Form */}
          <motion.div variants={itemVariants} className="w-full">
              <div className="relative">
                <div className="relative p-8 rounded-2xl bg-secondary/30 border border-border shadow-2xl">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    Send a Message
                  </h3>
                  
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500"
                        >
                          <CheckCircle size={40} />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h4>
                        <p className="text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground ml-1">Your Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="w-full pl-12 pr-4 py-4 bg-background/50 rounded-xl border border-border/50 focus:border-primary focus:bg-background/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-sm font-medium text-muted-foreground ml-1">Your Message</label>
                          <div className="relative">
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                              rows={4}
                              className="w-full p-4 bg-background/50 rounded-xl border border-border/50 focus:border-primary focus:bg-background/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-none"
                              placeholder="Hello, I'd like to talk about..."
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full py-4 bg-primary text-background font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {status === "loading" ? (
                            <span className="flex items-center gap-2">
                               <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                               Sending...
                            </span>
                          ) : status === "error" ? (
                             <span className="flex items-center gap-2 text-red-200">
                               <AlertCircle size={20} />
                               Failed. Try Again
                             </span>
                          ) : (
                            <>
                              Send Message
                              <Send size={18} />
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
