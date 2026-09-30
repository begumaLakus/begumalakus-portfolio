// Polaroid galerisi. Görseller `npm run images` ile public/images/events altına üretilir.
// Tarihi "?" olanlar teyit bekliyor.

export type EventPhoto = { date: string; title: string; community: string; src: string };

export const events: EventPhoto[] = [
  { date: "Haz 2026", title: "Mezuniyet Günü", community: "ZBEÜ · Bilgisayar Mühendisliği", src: "/images/events/mezuniyet-3.jpg" },
  { date: "2025", title: "DevFest Zonguldak", community: "GDG Zonguldak", src: "/images/events/devfest-4.jpg" },
  { date: "2024", title: "Git ve GitHub Kullanımı Eğitimi ", community: "GDG on Campus BEUN", src: "/images/events/githubsunum-1.jpg" },
  { date: "Haz 2026", title: "Mezuniyet Töreni", community: "Zonguldak Bülent Ecevit Üniversitesi", src: "/images/events/mezuniyet-1.jpg" },
  { date: "2024 — 25", title: "Meşe Palamudu Toplama Etkinliğimiz", community: "ZBEÜ Genç TEMA", src: "/images/events/temaetkinlik-2.jpg" },
  { date: "2025", title: "DevFest 2025 Organizasyon Ekibi", community: "GDG Zonguldak", src: "/images/events/devfest-3.jpg" },
  { date: "Haz 2026", title: "Birlikte Mezun Olduk", community: "ZBEÜ · Bilgisayar Mühendisliği", src: "/images/events/mezuniyet-2.jpg" },
  { date: "May 2025", title: "Hackathon'a Katıldık", community: "ZBEÜ", src: "/images/events/hackathon-1.jpg" },
  { date: "2024", title: "Eğitimden Kalanlar", community: "GDG on Campus BEUN", src: "/images/events/githubsunum-2.jpg" },
  { date: "Haz 2026", title: "Son Kez Kampüste", community: "ZBEÜ", src: "/images/events/mezuniyet-4.jpg" },
  { date: "2024 — 25", title: "Genç Tema Küçüklere Eğitim Günü", community: "BEÜN Genç TEMA", src: "/images/events/temaetkinlik-okul.jpg" },
  { date: "2025", title: "DevFest Zonguldak", community: "GDG Zonguldak", src: "/images/events/devfest-2.jpg" },
  { date: "2024", title: "Eğitmen Ekibi", community: "GDG on Campus BEUN", src: "/images/events/githubsunum-3.jpg" },
  { date: "2025", title: "Hackhathon Proje Sunumları", community: "BEÜN", src: "/images/events/hackathon-2.jpg" },
];
