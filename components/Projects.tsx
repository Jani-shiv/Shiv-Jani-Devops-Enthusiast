"use client"

import { motion } from "framer-motion"
import { Github, Server, Activity, FileText, Cpu, MessageSquare } from "lucide-react"

const projects = [
  {
    title: "Anti-Gravity DevOps",
    description: "A self-healing, auto-scaling, fault-tolerant infrastructure demonstration. Built as a demonstration of resilient systems using Docker and Kubernetes.",
    tech: ["Kubernetes", "Docker", "Grafana", "DevOps"],
    link: "https://github.com/Jani-shiv/anti-gravity-devops",
    icon: <Server size={24} />,
  },
  {
    title: "MyCycleCare",
    description: "A TSX-based wellness and cycle care tracking app with mood journal, symptom tracker, and AI assistant for health monitoring.",
    tech: ["React", "Typescript", "AI", "Wellness"],
    link: "https://github.com/Jani-shiv/MyCycleCare",
    icon: <Activity size={24} />,
  },
  {
    title: "RHCSA Study Guide",
    description: "Interactive web-based study guide for Red Hat Certified System Administrator exam, covering 17 essential Linux topics with hands-on examples.",
    tech: ["Linux", "RedHat", "SysAdmin", "RHEL"],
    link: "https://github.com/Jani-shiv/rhcsa-study-guide",
    icon: <FileText size={24} />,
  },
  {
    title: "TechInnovate",
    description: "AI-powered innovation platform showcasing smart tools, automation workflows, and next-gen tech products built with modern frameworks.",
    tech: ["Next.js", "React", "Tailwind", "AI"],
    link: "https://github.com/Jani-shiv/TechInnovate",
    icon: <Cpu size={24} />,
  },
  {
    title: "AI Meeting Tracker",
    description: "Corporate meeting minutes tracker using AI for summaries, decisions, and PDF exports. Powered by NLP and Flask.",
    tech: ["Python", "Flask", "NLP", "AI"],
    link: "https://github.com/Jani-shiv/AI-Powered-Corporate-Meeting-Minutes-Action-Tracker",
    icon: <MessageSquare size={24} />,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/30 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-foreground flex items-center gap-2">
            <span className="text-primary">04.</span> Featured Projects
          </h2>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-xl overflow-hidden transition-all group flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-secondary rounded-lg text-primary">
                      {project.icon}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github size={20} />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono text-primary/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
