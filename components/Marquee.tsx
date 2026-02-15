"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MarqueeProps {
  children: ReactNode
  direction?: "left" | "right"
  speed?: number
  className?: string
}

export default function Marquee({ 
  children, 
  direction = "left", 
  speed = 20,
  className = "" 
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap group ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="inline-block whitespace-nowrap">{children}</span>
        <span className="inline-block whitespace-nowrap">{children}</span>
      </motion.div>
    </div>
  )
}
