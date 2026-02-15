"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, ArrowRight, BookOpen, GraduationCap, Laptop, Rocket, Code2, Brain, Coffee, Globe, Cloud, Sparkles } from "lucide-react"
import Marquee from "react-fast-marquee"

const phrases = ["Hello World", "Welcome to my Digital Space", "Let's Build Something Amazing", "DevOps & Cloud Native", "Linux Enthusiast"]
const bgTexts = [
    "WELCOME", "HELLO", "NAMASTE", "BONJOUR", "HOLA", "GUTEN TAG", "CIAO", "OLÁ", "KONNICHIWA", "ANYEONGHASEYO",
    "CODE", "DEPLOY", "SCALE", "AUTOMATE", "MONITOR", "SECURE", "OPTIMIZE", "BUILD", "create", "innovate",
    "STUDENT", "LEARNER", "MAKER", "HACKER", "ENGINEER", "DEVELOPER", "CREATOR", "VISIONARY"
]

const FloatingIcon = ({ Icon, delay, x, y }: { Icon: any, delay: number, x: string, y: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.15, scale: [1, 1.2, 1], rotate: [0, 10, -10, 0], x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay, ease: "easeInOut" }}
        className={`absolute ${x} ${y} text-primary`}
    >
        <Icon size={64} />
    </motion.div>
)

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % phrases.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
    >
      {/* 1. Dynamic Background Marquees */}
      <div className="absolute inset-0 z-0 flex flex-col justify-between opacity-20 pointer-events-none select-none overflow-hidden">
        {/* Tilting the container for a dynamic look */}
        <div className="absolute inset-[-50%] rotate-12 flex flex-col gap-12 justify-center h-[200%] w-[200%]">
             {[...Array(8)].map((_, i) => (
                <Marquee key={i} speed={20 + i * 5} direction={i % 2 === 0 ? "left" : "right"} gradient={false} className="py-2">
                    <div className="flex gap-12">
                        {[...bgTexts].sort(() => Math.random() - 0.5).map((text, j) => (
                            <span key={j} className={`text-6xl md:text-8xl font-black uppercase ${i % 3 === 0 ? "text-primary/20" : "text-foreground/5"}`}>
                                {text}
                            </span>
                        ))}
                    </div>
                </Marquee>
             ))}
        </div>
      </div>

      {/* 2. Floating Student/Tech Icons (Toons) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
           <FloatingIcon Icon={GraduationCap} delay={0} x="top-20" y="left-20" />
           <FloatingIcon Icon={Laptop} delay={1} x="bottom-40" y="right-20" />
           <FloatingIcon Icon={Rocket} delay={2} x="top-1/3" y="right-1/3" />
           <FloatingIcon Icon={Code2} delay={3} x="bottom-20" y="left-1/3" />
           <FloatingIcon Icon={Brain} delay={4} x="top-40" y="right-40" />
           <FloatingIcon Icon={Coffee} delay={1.5} x="top-1/2" y="left-10" />
           <FloatingIcon Icon={Globe} delay={2.5} x="bottom-10" y="right-1/2" />
           <FloatingIcon Icon={Cloud} delay={3.5} x="top-10" y="left-1/2" />
      </div>

       {/* 3. Radial Gradient Overlay for Focus */}
       <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent via-background/80 to-background flex items-center justify-center" />


      {/* 4. Central Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full mx-4"
      >
        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[40px] shadow-[0_0_50px_rgba(var(--color-primary),0.2)] overflow-hidden group">
          
          {/* Animated Border Gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          <div className="flex flex-col items-center text-center relative z-10">
             
             {/* Logo Animation */}
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mb-10 relative"
             >
                 <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full animate-pulse" />
                 <div className="bg-background/50 p-6 rounded-full border border-primary/50 relative">
                    <Terminal size={64} className="text-primary" />
                 </div>
             </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-lg">
              HELLO <span className="text-primary">THERE!</span>
              <motion.span 
                animate={{ rotate: [0, 20, 0] }} 
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                className="inline-block ml-4 origin-bottom-right"
              >
                👋
              </motion.span>
            </h1>

            <div className="h-12 mb-12 flex items-center justify-center w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={textIndex}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        className="text-xl md:text-2xl text-primary/80 font-mono font-bold bg-primary/5 px-6 py-2 rounded-full border border-primary/10"
                    >
                        {phrases[textIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="group relative px-10 py-5 bg-primary text-primary-foreground text-lg font-black tracking-wider rounded-2xl overflow-hidden flex items-center gap-4 shadow-[0_0_30px_rgba(var(--color-primary),0.4)] hover:shadow-[0_0_60px_rgba(var(--color-primary),0.6)] transition-all"
            >
              <span className="relative z-10">OPEN PORTFOLIO</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
              
              {/* Button Shine */}
              <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            </motion.button>
          </div>
        </div>
        
        <motion.p 
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center text-primary/40 text-sm mt-8 font-mono tracking-widest uppercase"
        >
            Experience the journey
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
