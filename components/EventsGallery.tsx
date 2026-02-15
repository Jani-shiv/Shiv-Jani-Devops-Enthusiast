"use client"

import { motion } from "framer-motion"
import { Image as ImageIcon, Video as VideoIcon, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const Typewriter = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [currentText, setCurrentText] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const timer = setInterval(() => {
        if (i < text.length) {
          setCurrentText((prev) => prev + text.charAt(i))
          i++
        } else {
          clearInterval(timer)
        }
      }, 50)
      return () => clearInterval(timer)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span className={className}>{currentText}</span>
}

const assets = [
  { url: "/assets/events/IMG-20260111-WA0033.jpg", type: "image", title: "Event Capture", description: "A moment from our community events." },
  { url: "/assets/events/PXL_20250322_032801547.jpg", type: "image", title: "Volunteering Day", description: "Supporting local initiatives and giving back." },
  { url: "/assets/events/PXL_20250322_032802706.jpg", type: "image", title: "Team Collaboration", description: "Working together on impactful projects." },
  { url: "/assets/events/PXL_20250322_040203479.mp4", type: "video", title: "Project Launch", description: "Live demonstration of our latest automation tools." },
  { url: "/assets/events/PXL_20250322_092137103~2.jpg", type: "image", title: "Tech Workshop", description: "Deep dive into cloud infrastructure." },
  { url: "/assets/events/PXL_20250322_092355815.jpg", type: "image", title: "Seminar Session", description: "Sharing knowledge on DevOps practices." },
  { url: "/assets/events/PXL_20250322_151722135.jpg", type: "image", title: "Networking Event", description: "Connecting with industry professionals." },
  { url: "/assets/events/PXL_20250322_151854412.jpg", type: "image", title: "Community Meetup", description: "Building stronger tech communities." },
  { url: "/assets/events/PXL_20250323_122244482.jpg", type: "image", title: "Outdoor Volunteering", description: "Engagement in environmental sustainability." },
  { url: "/assets/events/PXL_20250323_122246556.mp4", type: "video", title: "Event Highlights", description: "Quick look at our weekend activities." },
  { url: "/assets/events/PXL_20250510_052156842.mp4", type: "video", title: "Knowledge Sharing", description: "Capturing the essence of peer-to-peer learning." },
  { url: "/assets/events/PXL_20250628_054622161.jpg", type: "image", title: "Code Lab", description: "Hands-on session with new technologies." },
  { url: "/assets/events/PXL_20250906_072209283.mp4", type: "video", title: "Tech Talk", description: "Presenting on scalable architecture." },
  { url: "/assets/events/PXL_20250913_060022140.jpg", type: "image", title: "Hackathon Entry", description: "Innovation at its finest." },
  { url: "/assets/events/PXL_20251005_063524604~2.jpg", type: "image", title: "Volunteer Recognition", description: "Celebrating community contributions." },
  { url: "/assets/events/PXL_20251005_105653140.PORTRAIT.jpg", type: "image", title: "Tech Portrait", description: "Moments from the tech journey." },
  { url: "/assets/events/PXL_20251005_105707505~2.jpg", type: "image", title: "Event Setup", description: "Behind the scenes of our workshops." },
  { url: "/assets/events/PXL_20251005_130052051~2.jpg", type: "image", title: "Mentorship Session", description: "Guiding the next generation of developers." },
  { url: "/assets/events/PXL_20260110_004804034.jpg", type: "image", title: "Morning Briefing", description: "Planning for the day's events." },
  { url: "/assets/events/PXL_20260110_041917337.jpg", type: "image", title: "Workshop Interaction", description: "Engaging with participants." },
  { url: "/assets/events/PXL_20260110_041920922.jpg", type: "image", title: "Product Demo", description: "Showcasing automation capabilities." },
  { url: "/assets/events/PXL_20260124_051717233.mp4", type: "video", title: "Training Session", description: "Interactive training on Linux systems." },
  { url: "/assets/events/PXL_20260124_051734432.mp4", type: "video", title: "Live Lab", description: "Real-time infrastructure setup." },
  { url: "/assets/events/PXL_20260124_231450717.mp4", type: "video", title: "Event Wrap-up", description: "Closing thoughts after a productive day." },
  { url: "/assets/events/PXL_20260124_231834840.mp4", type: "video", title: "Night Hack", description: "Late night innovation sessions." },
  { url: "/assets/events/PXL_20260125_065658337.jpg", type: "image", title: "Success Celebration", description: "Milestones reached as a team." },
  { url: "/assets/events/PXL_20260125_070230079.jpg", type: "image", title: "Post-Event Discussion", description: "Reflecting on project outcomes." },
  { url: "/assets/events/PXL_20260207_051453749.PORTRAIT~2.jpg", type: "image", title: "Community Portrait", description: "A portrait of our growing community." },
  { url: "/assets/events/Snapchat-1701400994.mp4", type: "video", title: "Fun Moments", description: "Lighthearted clips from our gatherings." },
  { url: "/assets/events/Snapchat-547147976.mp4", type: "video", title: "Social Interaction", description: "Connecting beyond the technical aspects." },
  { url: "/assets/events/Snapchat-639706440.jpg", type: "image", title: "Social Gathering", description: "Building relationships within the team." },
  { url: "/assets/events/lv_0_20260113184750.mp4", type: "video", title: "Journey Overview", description: "A montage of our recent activities." }
]

const Row = ({ items, speed, direction = "left" }: { items: typeof assets, speed: number, direction?: "left" | "right" }) => (
  <div className="flex overflow-hidden whitespace-nowrap mb-6 pointer-events-auto">
    <motion.div
      className="flex gap-6"
      animate={{
        x: direction === "left" ? [0, -1000] : [-1000, 0],
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
      {[...items, ...items, ...items].map((asset, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05, y: -10, zIndex: 50 }}
          className="relative group w-72 h-44 rounded-xl overflow-hidden border border-border/50 bg-secondary/20 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
        >
          {asset.type === "video" ? (
            <video
              src={asset.url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <img
              src={asset.url}
              alt={asset.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}

          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
             <div className="flex items-center gap-2 mb-1">
                {asset.type === "video" ? <VideoIcon size={14} className="text-primary" /> : <ImageIcon size={14} className="text-primary" />}
                <h4 className="text-sm font-bold text-white truncate">{asset.title}</h4>
             </div>
             <p className="text-[10px] text-white/70 line-clamp-2 leading-tight">{asset.description}</p>
          </div>

          {/* Asset Badge */}
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
            {asset.type.toUpperCase()}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
)

export default function EventsGallery() {
  const row1 = assets.slice(0, 16)
  const row2 = assets.slice(16, 32)

  return (
    <section id="events" className="py-24 bg-background relative overflow-hidden border-y border-border/50">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black text-foreground/2 tracking-widest pointer-events-none select-none -rotate-12 uppercase">
        Memories & Beyond
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-4">
            <Sparkles size={16} />
            <span>Beyond the Terminal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            <Typewriter text="Events & Volunteering" delay={500} />
            <span className="text-primary animate-pulse">_</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A living gallery of my journey — 32 key moments captured while sharing knowledge, collaborating on tech, and giving back to the community.
          </p>
        </motion.div>
      </div>

      {/* Infinite Wall Rows */}
      <div className="relative pointer-events-none">
        {/* Glow Effects */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
        
        <Row items={row1} speed={50} direction="left" />
        <Row items={row2} speed={60} direction="right" />
      </div>
    </section>
  )
}
