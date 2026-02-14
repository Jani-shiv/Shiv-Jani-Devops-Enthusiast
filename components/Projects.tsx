"use client"

import { motion } from "framer-motion"
import { Github, GitBranch } from "lucide-react"

const projects = [
  {
    title: "Kubernetes GitOps Cluster",
    description: "Automated K8s cluster bootstrap using ArgoCD and Terraform. Implemented strict security policies and monitoring stack with Prometheus/Grafana.",
    tech: ["Kubernetes", "ArgoCD", "Terraform", "AWS"],
    link: "https://github.com/Jani-shiv", // Placeholder
  },
  {
    title: "Serverless CI/CD Pipeline",
    description: "Built a highly scalable event-driven CI/CD pipeline using AWS Lambda and GitHub Actions Runners to reduce build costs by 40%.",
    tech: ["AWS Lambda", "GitHub Actions", "Python", "Docker"],
    link: "https://github.com/Jani-shiv",
  },
  {
    title: "High-Availability Web Server",
    description: "Deployed a fault-tolerant Nginx web server cluster on Linux with automated failover and load balancing configured via Ansible.",
    tech: ["Linux", "Nginx", "Ansible", "Bash"],
    link: "https://github.com/Jani-shiv",
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
            <span className="text-primary">03.</span> Featured Projects
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
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all group flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-secondary rounded-lg text-primary">
                      <GitBranch size={24} />
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
