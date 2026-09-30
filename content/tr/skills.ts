export type SkillIcon = "mobile" | "web" | "ai" | "api" | "db" | "tools";
/** [teknoloji, kullanıldığı yerler] */
export type Skill = [name: string, usedIn: string[]];
export type SkillGroup = { title: string; icon: SkillIcon; desc: string; items: Skill[]; size?: "wide"; dark?: boolean; note?: string };

const U = { ow: "OwnWay", px: "Pixel Art", ci: "Çini Motif", rk: "ColorVision", et: "Eterna", ss: "Speedsoft", gdg: "GDG", web: "Bu site", ist: "İstanbul projesi", staj: "Staj Defteri" };

// Kural: bu bölümde en fazla BİR koyu kart olur (şu an Web).
export const skills: SkillGroup[] = [
  { title: "Mobil", icon: "mobile", size: "wide", desc: "iOS ve Android için uçtan uca uygulama geliştirme",
    items: [["React Native", [U.px, U.ow, U.et, U.ss]], ["TypeScript", [U.px, U.ow, U.et]], ["Firebase Auth", [U.px]], ["Firestore", [U.px]], ["Cloud Functions", [U.px]], ["State yönetimi & UI", [U.ss]]] },
  { title: "Web", icon: "web", dark: true, desc: "Özenli, hızlı ve her ekrana uyumlu arayüzler", note: "Şu an gezdiğin siteyi de ben tasarlayıp kodladım.",
    items: [["React", [U.ss, U.web]], ["Next.js", [U.web]], ["JavaScript", [U.ss, U.web]], ["HTML & CSS", [U.web, U.ist]], ["PHP", [U.ist, U.staj]]] },
  { title: "Yapay Zekâ & Görüntü İşleme", icon: "ai", size: "wide", desc: "Model eğitimi, görüntü işleme ve AI entegrasyonu",
    items: [["Python", [U.ci, U.rk]], ["YOLOv8", [U.ci]], ["OpenCV", [U.rk]], ["NumPy", [U.rk]], ["K-Means", [U.rk]], ["Data augmentation", [U.ci]], ["Streamlit", [U.ci, U.rk]], ["AI entegrasyonu", [U.ow]]] },
  { title: "Backend", icon: "api", desc: "API'ler, servisler ve sunucu mantığı",
    items: [["Node.js", [U.ow]], ["Express", [U.ow]], ["REST API", [U.ow, U.et]]] },
  { title: "Veri", icon: "db", desc: "SQL ve NoSQL veri modelleme",
    items: [["PostgreSQL", [U.ow, U.staj]], ["MongoDB", []], ["Firestore", [U.px]], ["SQL", [U.ow]]] },
  { title: "Süreç & Araçlar", icon: "tools", size: "wide", desc: "Ekip içinde üretim ve kalite",
    items: [["Git & GitHub", [U.ss, U.gdg]], ["Agile / Scrum", [U.ss]], ["QA & senaryo testleri", [U.et]], ["Otomasyon betikleri", [U.et]], ["İngilizce · B1", []]] },
];

export const skillCount = new Set(skills.flatMap((g) => g.items.map(([n]) => n))).size;
