export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shiv Jani",
    "url": "https://itsme-gold.vercel.app",
    "jobTitle": "DevOps Engineer",
    "sameAs": [
      "https://github.com/Jani-shiv",
      "https://www.linkedin.com/in/shiv-jani/",
      "https://www.youtube.com/@devopsnidiary"
    ],
    "knowsAbout": [
      "DevOps",
      "Linux",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "Cloud Computing",
      "AWS",
      "Azure",
      "Automation"
    ],
    "description": "DevOps Engineer specializing in Linux, automation, CI/CD, and reliable systems. Creator of DevOpsNi Diary."
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
