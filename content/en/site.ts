// English mirror of content/tr/site.ts — keep both in sync.
// Anchor ids (href) stay the same as the Turkish version on purpose: DOM ids aren't visible
// text, and keeping them identical means every internal link and scroll target works in both
// languages without extra logic.

export const site = {
  name: "Begüm Alakuş",
  shortName: "begüm",
  title: "Mobile & AI Engineer",
  tagline: "I build mobile products end to end and weave AI into them.",
  description:
    "Begüm Alakuş — a computer engineer who builds mobile apps end to end with React Native and integrates AI into them.",
  url: "https://begumalakus.com", // to be updated once the domain is bought
  location: "Mersin, Turkey",
  email: "begumaalakus3@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/begumalakus",
    github: "https://github.com/begumaLakus",
    instagram: "https://www.instagram.com/begumaalakus/",
  },
  openToWork: true,
  graduation: "June 2026",
  hobbies: ["Yoga", "Running", "Fitness", "Hiking", "Reading", "Journaling"],
  // Commands that cycle through the terminal line on the hero
  terminal: [
    "react-native run-ios",
    "node api/server.js",
    "yolo train model=yolov8n.pt",
    "firebase deploy --only functions",
    "python kmeans_lms.py",
  ],
  marquee: ["React Native", "TypeScript", "Node.js", "Firebase", "PostgreSQL", "Python", "YOLOv8", "OpenCV", "React", "MongoDB", "Express", "Streamlit"],
  cv: { tr: "/cv/Begum-Alakus-CV-TR.pdf", en: "/cv/Begum-Alakus-CV-EN.pdf" },
} as const;

export const nav = [
  { href: "#hakkimda", label: "About" },
  { href: "#projeler", label: "Projects" },
  { href: "#deneyim", label: "Experience" },
  { href: "#etkinlikler", label: "Events" },
  { href: "#yetenekler", label: "Skills" },
  { href: "#hizmetler", label: "Services" },
] as const;
