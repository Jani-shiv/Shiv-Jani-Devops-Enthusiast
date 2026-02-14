"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Github, Linkedin, Send, User, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"

export default function Contact() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      })

      if (response.ok) {
        setStatus("success")
        setName("")
        setMessage("")
        setTimeout(() => setStatus("idle"), 5000)
      } else {
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
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />

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
              Let&apos;s Build Something <br className="hidden md:block"/>
              <span className="text-primary">Extraordinary</span> Together
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              I&apos;m always excited to connect with fellow developers and visionaries. 
              Whether you have a project in mind or just want to chat about the latest in tech, 
              drop me a line! 
              <motion.span
                className="inline-block ml-2"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
                style={{ originX: 0.7, originY: 0.7 }}
              >
                👋
              </motion.span>
            </p>

            <div className="flex justify-center lg:justify-start gap-5">
              {[
                { icon: <Github size={22} />, href: "https://github.com/Jani-shiv", label: "GitHub" },
                { icon: <Linkedin size={22} />, href: "https://www.linkedin.com/in/shiv-jani/", label: "LinkedIn" },
                { icon: <Mail size={22} />, href: "mailto:contact@shivjani.com", label: "Email" },
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
             <div className="relative group">
                {/* Glow effect underneath */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative p-8 rounded-2xl bg-secondary/30 backdrop-blur-xl border border-white/10 shadow-2xl">
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
                        <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
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
                          className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
