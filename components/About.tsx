"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-2">
            <span className="text-primary">01.</span> About Me
          </h2>

          <div className="grid md:flex gap-8 items-start">
            <div className="space-y-4 text-muted-foreground leading-relaxed flex-1">
              <p>
                Hello! I&apos;m <span className="text-foreground">Shiv Jani</span>, a DevOps enthusiast with a passion for
                automating infrastructure and optimizing delivery pipelines. My journey started with Linux administration
                and evolved into building scalable cloud solutions.
              </p>
              <p>
                Currently, I&apos;m diving deep into <span className="text-primary">Kubernetes</span> and{" "}
                <span className="text-primary">Ansible</span>, while documenting my learning journey through my &quot;DevOpsNi Diary&quot;.
                I believe in &quot;learning by doing&quot; and constantly challenge myself with real-world scenarios.
              </p>
              <p>
                I am actively preparing for my <span className="text-foreground">RHCSA</span> certification seamlessly blending theory with hands-on labs.
              </p>
            </div>

            <div className="w-full md:w-80 bg-card border border-border rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-secondary/50 px-4 py-2 flex items-center gap-2 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="p-4 font-mono text-sm space-y-2">
                <div>
                  <span className="text-accent">shiv@linux:~$</span> whoami
                </div>
                <div className="text-muted-foreground">DevOps Engineer in progress...</div>
                
                <div className="mt-4">
                  <span className="text-accent">shiv@linux:~$</span> cat current_focus.txt
                </div>
                <div className="text-muted-foreground">
                  [&quot;AWS&quot;, &quot;Terraform&quot;, &quot;Docker&quot;, &quot;Go&quot;]
                </div>

                <div className="mt-4">
                  <span className="text-accent">shiv@linux:~$</span> <span>_</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
