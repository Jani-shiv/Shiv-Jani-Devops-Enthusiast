export default function Footer() {
    return (
      <footer className="py-8 bg-background border-t border-border text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">
            Designed & Built by <span className="text-foreground font-medium">Shiv Jani</span> using Next.js & Tailwind.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
            <span>git commit -m &quot;Initial portfolio release&quot;</span>
          </div>
        </div>
      </footer>
    )
  }
