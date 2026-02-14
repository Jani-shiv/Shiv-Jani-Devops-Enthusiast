"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, X } from "lucide-react"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50"
        >
          <div className="bg-card border border-border p-6 rounded-2xl shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground">Privacy Preference</h3>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-4 py-2 bg-primary text-background font-bold rounded-xl hover:bg-primary/90 transition-colors text-sm"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-4 py-2 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors text-sm"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
