"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"

export default function Contact() {
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
