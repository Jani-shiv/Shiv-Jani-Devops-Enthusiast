"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award, BookOpen } from "lucide-react"

export default function Education() {
  const academic = [
    {
      institution: "Gujarat University",
      degree: "Bachelor's Degree",
      period: "Graduated",
      location: "Ahmedabad, India",
    },
  ]

  const certifications = [
    {
      title: "RHCSA (EX200)",
      provider: "Red Hat",
      status: "In Progress / Preparing",
      skills: ["System Administration", "Network Configuration", "Security"],
    },
    {
      title: "AWS Solutions Architect",
      provider: "Amazon Web Services",
      status: "Actively Learning",
      skills: ["Cloud Architecture", "Scalable Systems", "VPC/EC2"],
    },
    {
      title: "CKA (Kubernetes)",
      provider: "Cloud Native Computing Foundation",
      status: "In Roadmap",
      skills: ["Orchestration", "Cluster Mgmt", "Pods & Services"],
    },
  ]

  return (
    <section id="education" className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-foreground flex items-center gap-2">
            <span className="text-primary">02.</span> Education & Study
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Academic Column */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Academic Background</h3>
              </div>

              {academic.map((edu, idx) => (
                <div key={idx} className="bg-card border border-border p-6 rounded-xl hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-primary">{edu.institution}</h4>
                    <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">{edu.period}</span>
                  </div>
                  <p className="text-foreground font-medium">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground mt-1">{edu.location}</p>
                </div>
              ))}

              <div className="bg-secondary/30 p-6 rounded-xl border border-dashed border-border flex items-center gap-4 mt-8">
                <BookOpen className="text-primary shrink-0" size={32} />
                <div>
                  <h4 className="font-semibold text-foreground italic">&quot;I believe in continuous learning and documentation.&quot;</h4>
                  <p className="text-xs text-muted-foreground mt-1">Documenting deep-dives in DevOpsNi Diary</p>
                </div>
              </div>
            </div>

            {/* Certifications Column */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">Active Certifications Path</h3>
              </div>

              <div className="grid gap-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="bg-card border border-border p-4 rounded-xl flex items-center gap-4 hover:bg-secondary/10 transition-colors">
                    <div className="w-2 h-full bg-primary rounded-full min-h-[40px]" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-foreground">{cert.title}</h4>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary/80">{cert.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{cert.provider}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.map((skill, si) => (
                          <span key={si} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded border border-border/50">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
