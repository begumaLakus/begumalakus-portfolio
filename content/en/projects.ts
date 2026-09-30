// English mirror of content/tr/projects.ts — keep both in sync.
// `id` values are shared UI identifiers (they map to the phone-screen components in
// components/phone/screens.tsx) and are never translated.
import type { ScreenId } from "@/content/tr/projects";

export type Project = {
  id: ScreenId;
  title: string;
  kind: string;
  summary: string;
  points: string[];
  stack: string[];
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "ownway",
    title: "OwnWay",
    kind: "Mobile · AI · TÜBİTAK 2209-A",
    summary: "An AI-powered career management system that analyzes student data and gives each student personalized career guidance.",
    points: [
      "Worked as backend developer and system architect in a 4-person team.",
      "Wrote scalable Node.js REST API services that analyze student data.",
      "Optimized the PostgreSQL database architecture.",
      "Integrated the AI models that generate career recommendations into the backend.",
    ],
    stack: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "REST API", "AI"],
    repo: "https://github.com/begumaLakus/OwnWay",
  },
  {
    id: "pixel",
    title: "Pixel Art Challenge",
    kind: "Mobile · Full Stack · Eterna Teknoloji",
    summary: "A new theme every day, a pixel canvas, and community voting — a mobile app I built end to end from scratch at Eterna Teknoloji.",
    points: [
      "Built the drawing, daily-challenge, and voting modules with React Native and TypeScript.",
      "Set up authentication with Firebase Auth and modeled the data as NoSQL in Firestore.",
      "Automated the contest cycle with Cloud Functions: the server enforces the timer, counts votes, and starts the next theme on its own.",
      "Blocked voting for your own drawing, and multiple votes, on the server side with Firestore security rules.",
    ],
    stack: ["React Native", "TypeScript", "Firebase Auth", "Firestore", "Cloud Functions"],
    repo: "https://github.com/begumaLakus/pixel-art-challenge",
  },
  {
    id: "cini",
    title: "Tile Motif Detection",
    kind: "Computer Vision · YOLOv8",
    summary: "An object-detection model that identifies and classifies motifs and symbols in Turkish tile (çini) art.",
    points: [
      "Trained a YOLOv8-based model on four motif classes: tulip, carnation, çintemani, and hyacinth.",
      "Improved model accuracy with data augmentation.",
      "Built an interface with Streamlit that finds the motif in an uploaded image and explains its symbolism and history.",
    ],
    stack: ["Python", "YOLOv8", "Data Augmentation", "Streamlit"],
    repo: "https://github.com/begumaLakus/TileArt-Vision-YOLOv8",
  },
  {
    id: "renk",
    title: "ColorVision Enhancer",
    kind: "Image Processing · Accessibility",
    summary: "An image-processing system that separates colors that blend together for users with deuteranopia (red-green color blindness).",
    points: [
      "Simulated color blindness by mapping the image into LMS color space.",
      "Simplified the image into its dominant colors with K-Means clustering.",
      "Made red and green regions distinguishable by separating their brightness in HSV space.",
      "Documented the results in an academic report format.",
    ],
    stack: ["Python", "OpenCV", "NumPy", "K-Means"],
    repo: "https://github.com/begumaLakus/ColorVision-Enhancer",
  },
];
