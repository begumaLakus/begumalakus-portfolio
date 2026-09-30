// Sitenin tek bilgi kaynağı: kişisel bilgiler ve bağlantılar.
// Bilgiler çeliştiğinde CV esas alınır.

export const site = {
  name: "Begüm Alakuş",
  shortName: "begüm",
  title: "Mobile & AI Engineer",
  tagline: "Fikirleri App Store'da çalışan stabil mobil ürünlere dönüştürüyorum.",
  description:
    "Begüm Alakuş — React Native ile uçtan uca mobil uygulamalar geliştiren ve ürünlere yapay zekâ entegre eden bilgisayar mühendisi.",
  url: "https://begumalakus.vercel.app",
  location: "Mersin, Türkiye",
  email: "begumaalakus3@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/begumalakus",
    github: "https://github.com/begumaLakus",
    instagram: "https://www.instagram.com/begumaalakus/",
  },
  openToWork: true,
  graduation: "Haziran 2026",
  hobbies: ["Yoga", "Koşu", "Fitness", "Doğa yürüyüşü", "Kitap okumak", "Günlük tutmak"],
  // Açılıştaki terminal satırında dönen komutlar
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
  { href: "#hakkimda", label: "Hakkımda" },
  { href: "#projeler", label: "Projeler" },
  { href: "#deneyim", label: "Deneyim" },
  { href: "#etkinlikler", label: "Etkinlikler" },
  { href: "#yetenekler", label: "Yetenekler" },
  { href: "#hizmetler", label: "Hizmetler" },
] as const;
