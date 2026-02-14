"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Send } from "lucide-react"

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
        setTimeout(() => setStatus("idle"), 3000)
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Let&apos;s Build Something Scalable
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
            I&apos;m currently open to new opportunities in DevOps and Cloud Engineering.
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full p-4 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                "Sending..."
              ) : status === "success" ? (
                "Message Sent!"
              ) : status === "error" ? (
                "Error! Try Again"
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="flex justify-center gap-6 mb-12">
            <a
              href="mailto:contact@shivjani.com" // Placeholder
              className="px-8 py-4 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              <Mail size={20} />
              Say Hello
            </a>
          </div>

          <div className="flex justify-center gap-8">
             {[
               { icon: <Github size={24} />, href: "https://github.com/Jani-shiv", label: "GitHub" },
               { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/shiv-jani/", label: "LinkedIn" },
               /* { icon: <Twitter size={24} />, href: "#", label: "Twitter" }, */ 
             ].map((social, index) => (
               <a
                 key={index}
                 href={social.href}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-primary transition-colors p-2"
                 aria-label={social.label}
               >
                 {social.icon}
               </a>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
