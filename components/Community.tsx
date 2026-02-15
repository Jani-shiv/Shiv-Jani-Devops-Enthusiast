"use client"

import { motion } from "framer-motion"
import { Users, Calendar, Award, Globe, Terminal, Cloud, Server, Box, Cpu, Activity, Code2 } from "lucide-react"
import Marquee from "@/components/Marquee"

const communities = [
  { name: "Grafana Community", icon: Activity },
  { name: "Java Developer User Group", icon: Code2 },
  { name: "CNCF", icon: Cloud },
  { name: "Open Source World", icon: Globe },
  { name: "GDG Ahmedabad", icon: Terminal },
  { name: "AWS Learning Groups", icon: Server },
  { name: "DevOps Gujarat", icon: Box },
  { name: "HashiCorp User Group", icon: Cloud },
  { name: "K8s & Cloud Native", icon: Cpu },
  { name: "Docker Ahmedabad", icon: Box },
]

export default function Community() {
  return (
    <section id="community" className="py-24 bg-background relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/10 rounded-full blur-[100px]" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-60 h-60 bg-emerald-500/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span className="text-primary">06.</span> Community & Leadership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Building bridges between code and people. 
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Leadership Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-card/50 border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--color-primary),0.1)] overflow-hidden"
            >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <Award size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Leadership</h3>
                </div>
                <ul className="space-y-4 text-muted-foreground">
                    <li className="flex gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>Led and coordinated team activities during major hackathons</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>Supported event execution and participant management as a volunteer</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>Thriving in fast-paced, collaborative technical environments</span>
                    </li>
                </ul>
              </div>
            </motion.div>

            {/* Meetups Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative bg-card/50 border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--color-primary),0.1)] overflow-hidden"
            >
               <div className="absolute inset-0 bg-linear-to-bl from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary-foreground ring-1 ring-secondary/20 group-hover:scale-110 transition-transform duration-300">
                    <Calendar size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Meetups</h3>
                </div>
                <p className="text-muted-foreground mb-4">Active participant in technology events focusing on:</p>
                <div className="flex flex-wrap gap-2">
                    {["LLMs", "Vibe Coding", "Open Source", "Cloud Native"].map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-background border border-border text-xs font-mono text-muted-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

       {/* Active Communities Marquee - Full Width */}
       <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Users size={24} className="text-primary" />
              <h3 className="text-xl font-bold text-foreground">Active Community Member & Volunteer</h3>
            </div>
            
            <Marquee speed={40} className="bg-primary text-background py-4 font-bold text-lg uppercase tracking-widest border-y border-primary/20 shadow-[0_0_20px_rgba(var(--color-primary),0.3)]">
                 <div className="flex items-center gap-8 px-4">
                    {communities.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <item.icon size={24} className="text-background" />
                            <span>{item.name}</span>
                            <span className="text-background/50">|</span>
                        </div>
                    ))}
                </div>
            </Marquee>
       </motion.div>
    </section>
  )
}
