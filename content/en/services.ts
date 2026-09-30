// English mirror of content/tr/services.ts — keep both in sync.
import type { Service } from "@/content/tr/services";

export type { Service };

export const services: Service[] = [
  { title: "Mobile App Development", icon: "mobile",
    text: "High-performance, store-ready apps for iOS and Android from a single codebase.",
    items: ["React Native and TypeScript architecture", "Node.js- or Firebase-based backend and database integration", "Authentication, push notifications, and offline caching"] },
  { title: "Web & Interface Architecture", icon: "web",
    text: "Interfaces and admin panels that follow modern web standards, load fast, and fit every screen.",
    items: ["Modular component architecture with React and Next.js", "REST API integration and state management", "Optimized load times and responsive design"],
    foot: "I designed and built this very site with Next.js, from scratch, the same way." },
  { title: "AI & Computer Vision", icon: "ai",
    text: "An intelligent layer for a product or workflow: decision-support mechanisms, data analysis, and computer vision models.",
    items: ["LLM-based chat assistant integration", "Object and motif detection with YOLO and OpenCV", "Data analytics and rule-based recommendation engines"],
    foot: "The chat assistant on the right is a live example of exactly that." },
];
