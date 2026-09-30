// English mirror of content/tr/experience.ts — keep both in sync.
import type { LogoFit } from "@/content/tr/experience";

export type Experience = { when: string; org: string; role: string; points: string[] };
export type Volunteer = { when: string; role: string; org: string; text: string; logo: string; logoFit?: LogoFit };

export const experience: Experience[] = [
  {
    when: "Aug 2026 — Present",
    org: "Eterna Teknoloji",
    role: "Mobile App Development Intern · Mersin",
    points: [
      "Built the Pixel Art Challenge mobile app from scratch with React Native and TypeScript — including a drawing editor, a voting engine, and profile management — and set up the automated contest cycle and archiving with Firebase Auth, Firestore, and Cloud Functions.",
      "Built automation software for the Lipyum app using the Iconify REST API; reduced 9,000+ raw service sectors to 614 categories and streamlined the production of 36,000 images.",
      "Ran quality control and user-scenario testing for Beatify, a mobile app live on the App Store; fixed critical production bugs in profile management and media upload.",
    ],
  },
  {
    when: "Oct 2025 — Present",
    org: "GDG Zonguldak",
    role: "Sponsorship Team Lead · Google Developer Groups",
    points: [
      "Coordinated the entire financial sponsorship process, budget management, and end-to-end event operations for a DevFest conference with 70-80 attendees.",
    ],
  },
  {
    when: "Jul — Sep 2025",
    org: "Speedsoft Yazılım",
    role: "Software Development Intern",
    points: [
      "Built modular, reusable React components for a financial management platform, shipping new features to production while keeping the interface consistent.",
      "Optimized the state-management architecture of a React Native mobile app across two-week Agile/Scrum cycles and handled the team's code integration with Git workflows.",
    ],
  },
  {
    when: "Oct 2023 — Jun 2024",
    org: "GDG on Campus BEUN",
    role: "Sponsorship Team Lead",
    points: [
      "Led the sponsorship team, managing corporate partnership talks, contract paperwork, and funding sources.",
      "Handled budgeting and logistics coordination for the university's developer events and technical workshops.",
      "Ran hands-on Git and GitHub workshops for the developer community.",
    ],
  },
  {
    when: "Graduation · Jun 2026",
    org: "Zonguldak Bülent Ecevit University",
    role: "B.Sc. in Computer Engineering",
    points: [
      "Accepted as a researcher under the TÜBİTAK 2209-A University Students Research Projects Support Program; carried out the technical-analysis work for the OwnWay project.",
    ],
  },
];

export const volunteer: Volunteer[] = [
  {
    when: "Dec 2025 — Jun 2026",
    role: "Mentee · Gender-Sensitive Mentorship Program",
    org: "International BPW Istanbul – Business and Professional Women's Association",
    text: "A structured 6-month mentorship program focused on career development, leadership, self-awareness, and long-term professional planning.",
    logo: "/images/logos/bpw.png",
  },
  {
    when: "Oct 2024 — Oct 2025",
    role: "Social Media Designer",
    org: "BEÜN Genç TEMA Community",
    text: "Designed social media content for the environmental community; took part in nature events and school visits.",
    logo: "/images/logos/tema.jpg",
    logoFit: "cover",
  },
  {
    when: "Oct 2022 — Jan 2023",
    role: "Core Member",
    org: "BEU CYBER",
    text: "Member of the core team of the university's cybersecurity community.",
    logo: "/images/logos/beucyber.png",
  },
];

export const certificates = ["Huawei Ar-Ge Buluşması (Huawei R&D Meetup)"];
