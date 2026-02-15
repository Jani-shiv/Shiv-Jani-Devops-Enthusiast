"use client"

import { motion } from "framer-motion"
import { Youtube, Linkedin, BookOpen } from "lucide-react"

const contentLinks = [
  {
    title: "DevOpsNi Diary - YouTube",
    description: "Documenting my daily learnings, tutorials, and certification prep guides.",
    icon: <Youtube className="w-6 h-6 text-red-500" />,
    link: "https://www.youtube.com/@devopsnidiary",
    action: "Watch Videos",
  },
  {
    title: "LinkedIn Engineering Blog",
    description: "Sharing insights on Kubernetes patterns, cloud architecture, and career growth.",
    icon: <Linkedin className="w-6 h-6 text-blue-500" />,
    link: "https://www.linkedin.com/in/shiv-jani/", 
    action: "Read Posts",
  },
]

export default function Content() {
  return (
    <section id="content" className="py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center justify-center gap-2">
            <span className="text-primary">08.</span> Learning in Public
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I believe the best way to master a concept is to teach it. Check out my
            <span className="text-primary font-semibold"> DevOpsNi Diary </span>
            where I share my journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {contentLinks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-background border border-border p-8 rounded-xl hover:border-primary/50 transition-colors group"
            >
              <div className="mb-6 bg-secondary/30 w-fit p-3 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground mb-6">
                {item.description}
              </p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 font-medium"
              >
                {item.action}
                <BookOpen size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
