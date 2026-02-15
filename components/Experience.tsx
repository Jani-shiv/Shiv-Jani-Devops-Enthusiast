"use client"

import { motion } from "framer-motion"

const experience = [
  {
    role: "Linux Administrator",
    company: "Electromech Cloudtech Pvt.Ltd.",
    period: "2025 - Present",
    description: "Assisting in migration of monolithic applications to microservices. Managing CI/CD pipelines and monitoring production environments.",
    skills: ["Docker", "Linux"],
  },
  {
    role: "Freelancer",
    company: "Web Development & UI/UX Design",
    period: "2024 - Present",
    description: "Designing and developing responsive websites with a focus on user experience and modern UI principles.",
    skills: ["React", "Next.js", "Tailwind CSS", "Figma"],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-foreground flex items-center gap-2">
            <span className="text-primary">07.</span> Experience
          </h2>

          <div className="relative border-l border-border/50 ml-3 md:ml-6 space-y-12">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">{job.role}</h3>
                  <span className="text-sm font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                    {job.period}
                  </span>
                </div>
                
                <h4 className="text-lg text-accent mb-4 font-medium">{job.company}</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="text-xs text-muted-foreground border border-border px-2 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
