// English mirror of content/tr/skills.ts — keep both in sync.
import type { SkillIcon, Skill, SkillGroup } from "@/content/tr/skills";

export type { SkillIcon, Skill, SkillGroup };

const U = { ow: "OwnWay", px: "Pixel Art", ci: "Tile Motif", rk: "ColorVision", et: "Eterna", ss: "Speedsoft", gdg: "GDG", web: "This site", ist: "Istanbul project", staj: "Internship logbook" };

// Rule: at most ONE dark card in this section (currently Web).
export const skills: SkillGroup[] = [
  { title: "Mobile", icon: "mobile", size: "wide", desc: "End-to-end app development for iOS and Android",
    items: [["React Native", [U.px, U.ow, U.et, U.ss]], ["TypeScript", [U.px, U.ow, U.et]], ["Firebase Auth", [U.px]], ["Firestore", [U.px]], ["Cloud Functions", [U.px]], ["State management & UI", [U.ss]]] },
  { title: "Web", icon: "web", dark: true, desc: "Polished, fast interfaces that fit every screen", note: "I designed and built the very site you're browsing right now.",
    items: [["React", [U.ss, U.web]], ["Next.js", [U.web]], ["JavaScript", [U.ss, U.web]], ["HTML & CSS", [U.web, U.ist]], ["PHP", [U.ist, U.staj]]] },
  { title: "AI & Computer Vision", icon: "ai", size: "wide", desc: "Model training, image processing, and AI integration",
    items: [["Python", [U.ci, U.rk]], ["YOLOv8", [U.ci]], ["OpenCV", [U.rk]], ["NumPy", [U.rk]], ["K-Means", [U.rk]], ["Data augmentation", [U.ci]], ["Streamlit", [U.ci, U.rk]], ["AI integration", [U.ow]]] },
  { title: "Backend", icon: "api", desc: "APIs, services, and server-side logic",
    items: [["Node.js", [U.ow]], ["Express", [U.ow]], ["REST API", [U.ow, U.et]]] },
  { title: "Data", icon: "db", desc: "SQL and NoSQL data modeling",
    items: [["PostgreSQL", [U.ow, U.staj]], ["MongoDB", []], ["Firestore", [U.px]], ["SQL", [U.ow]]] },
  { title: "Process & Tools", icon: "tools", size: "wide", desc: "Delivery and quality within a team",
    items: [["Git & GitHub", [U.ss, U.gdg]], ["Agile / Scrum", [U.ss]], ["QA & scenario testing", [U.et]], ["Automation scripts", [U.et]], ["English · B1", []]] },
];

export const skillCount = new Set(skills.flatMap((g) => g.items.map(([n]) => n))).size;
