export default function Footer() {
    return (
      <footer className="py-8 bg-background border-t border-border text-center">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Shiv Jani. All rights reserved.
        </div>
      </footer>
    )
  }
