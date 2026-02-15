import Hero from "@/components/Hero"
import About from "@/components/About"
import Education from "@/components/Education"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Community from "@/components/Community"
import Experience from "@/components/Experience"
import Content from "@/components/Content"
import Contact from "@/components/Contact"
import Marquee from "@/components/Marquee"
import EventsGallery from "@/components/EventsGallery"
import SnakeGame from "@/components/SnakeGame"
import { Terminal, Activity, Server, Cloud, Cpu } from "lucide-react"

export default function Home() {
  return (
    <>
      <Hero />
      
      <Marquee className="bg-primary text-background py-4 font-bold text-lg uppercase tracking-widest border-y border-primary/20 shadow-[0_0_20px_rgba(var(--color-primary),0.3)]">
        <span className="mx-8 flex items-center gap-4">
          <Terminal size={20} /> SHIV JANI  |  <Activity size={20} /> DEVOPS ENTHUSIAST  |  <Server size={20} /> LINUX PRACTITIONER  |  <Cloud size={20} /> CLOUD LEARNER  |  <Cpu size={20} /> AUTOMATION AFICIONADO  |  
        </span>
      </Marquee>

      <About />
      <Education />

      <Marquee speed={30} direction="right" className="bg-secondary/30 py-5 font-mono text-sm border-y border-border backdrop-blur-sm">
        <span className="mx-8 text-primary flex items-center gap-6">
          🚀 Eager to build robust infrastructure? Contact Shiv Jani!  |  
          ✨ High availability systems enthusiast  |  
          🛠️ Transforming code into cloud reality  |  
          🎯 Kubernetes & Docker Learner  |  
          🔥 Available for Freelance Dev Projects  |
        </span>
      </Marquee>

      <Skills />
      <Projects />
      
      <EventsGallery />
      
      <Community />

      <Experience />
      <Content />

      <Marquee speed={40} className="bg-background py-6 font-black text-6xl opacity-5 border-y border-border pointer-events-none select-none">
        <span className="mx-12">SHIV JANI • SHIV JANI • SHIV JANI • SHIV JANI • SHIV JANI • SHIV JANI • SHIV JANI • SHIV JANI • </span>
      </Marquee>

      <Contact />
      <SnakeGame />
    </>
  )
}
