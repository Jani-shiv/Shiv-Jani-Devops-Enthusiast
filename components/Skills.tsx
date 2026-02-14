"use client"

import { motion } from "framer-motion"
import { Server, Container, Workflow, Cloud, Code2, MonitorCheck } from "lucide-react"

const skillCategories = [
  {
    title: "Linux & OS",
    icon: <Server className="w-6 h-6 text-primary" />,
    skills: ["Bash Scripting", "User Management", "Process Management", "Networking (TCP/IP)", "RHCSA Prep"],
  },
  {
    title: "Containers & Orchestration",
    icon: <Container className="w-6 h-6 text-primary" />,
    skills: ["Docker", "Kubernetes (K8s)", "Docker Compose", "Podman"],
  },
  {
    title: "CI/CD & Automation",
    icon: <Workflow className="w-6 h-6 text-primary" />,
    skills: ["GitHub Actions", "Jenkins", "GitLab CI", "ArgoCD"],
  },
  {
    title: "Cloud Services",
    icon: <Cloud className="w-6 h-6 text-primary" />,
    skills: ["AWS (EC2, S3, VPC, LAMBDA)", "IAM Policies", "CloudWatch"],
  },
  {
    title: "IaC & Config Mgmt",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    skills: ["Terraform", "Ansible", "CloudFormation"],
  },
  {
    title: "Monitoring & Observability",
    icon: <MonitorCheck className="w-6 h-6 text-primary" />,
    skills: ["Prometheus", "Grafana", "ELK Stack", "CloudWatch"],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-foreground flex items-center gap-2">
            <span className="text-primary">02.</span> Technical Arsenal
          </h2>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, borderColor: "var(--color-primary)" }}
                className="bg-card border border-border p-6 rounded-lg transition-colors group shadow-lg shadow-transparent hover:shadow-primary/5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md font-mono border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
