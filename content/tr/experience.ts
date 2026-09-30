export type Experience = { when: string; org: string; role: string; points: string[] };
export type LogoFit = "contain" | "cover";
export type Volunteer = { when: string; role: string; org: string; text: string; logo: string; logoFit?: LogoFit };

export const experience: Experience[] = [
  {
    when: "Ağu 2026 — Bugün",
    org: "Eterna Teknoloji",
    role: "Mobil Uygulama Geliştirme Stajyeri · Mersin",
    points: [
      "Çizim editörü, oylama motoru ve profil yönetimi içeren Pixel Art Challenge mobil uygulamasını React Native ve TypeScript ile sıfırdan geliştirdim; Firebase Auth, Firestore ve Cloud Functions ile otomatik yarışma döngüsü ve arşivleme altyapısını kurdum.",
      "Lipyum uygulaması için Iconify REST API'yi kullanan bir otomasyon yazılımı geliştirdim; 9.000'den fazla ham hizmet sektörünü 614 kategoriye indirgeyip 36.000 görselin üretim sürecini optimize ettim.",
      "App Store'da yayında olan Beatify mobil uygulamasının kalite kontrol ve kullanıcı senaryosu testlerini yürüttüm; profil yönetimi ve medya yükleme süreçlerindeki kritik üretim hatalarını giderdim.",
    ],
  },
  {
    when: "Eki 2025 — Bugün",
    org: "GDG Zonguldak",
    role: "Sponsorluk Takım Lideri · Google Developer Groups",
    points: [
      "70-80 kişilik DevFest konferansının tüm finansal sponsorluk süreçlerini, bütçe yönetimini ve etkinlik operasyonunu uçtan uca koordine ettim.",
    ],
  },
  {
    when: "Tem — Eyl 2025",
    org: "Speedsoft Yazılım",
    role: "Yazılım Geliştirme Stajyeri",
    points: [
      "Finansal yönetim platformu için modüler ve yeniden kullanılabilir React bileşenleri geliştirdim; yeni özellikleri canlı ortama aktararak arayüz tutarlılığını sağladım.",
      "İki haftalık Agile/Scrum döngülerinde bir React Native mobil uygulamasının state yönetimi mimarisini optimize ettim ve Git iş akışlarıyla ekip içi kod entegrasyonunu yürüttüm.",
    ],
  },
  {
    when: "Eki 2023 — Haz 2024",
    org: "GDG on Campus BEUN",
    role: "Sponsorluk Takım Lideri",
    points: [
      "Sponsorluk ekibine liderlik ederek kurumsal ortaklık görüşmelerini, sözleşme evraklarını ve finansman kaynaklarını yönettim.",
      "Üniversite bünyesindeki yazılım geliştirici etkinliklerinin ve teknik atölyelerin bütçelendirilmesini ve lojistik koordinasyonunu sağladım.",
      "Geliştirici topluluğu bünyesinde Git ve GitHub sürüm kontrol pratikleri üzerine uygulamalı teknik atölyeler düzenledim.",
    ],
  },
  {
    when: "Mezuniyet · Haz 2026",
    org: "Zonguldak Bülent Ecevit Üniversitesi",
    role: "Bilgisayar Mühendisliği, Lisans",
    points: ["TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı kapsamında araştırmacı olarak kabul aldım; OwnWay projesinin teknik analiz çalışmalarını yürüttüm."],
  },
];

export const volunteer: Volunteer[] = [
  {
    when: "Ara 2025 — Haz 2026",
    role: "Mentee · Gender-Sensitive Mentorship Program",
    org: "Uluslararası BPW İstanbul İş ve Meslek Sahibi Kadınlar Derneği",
    text: "Kariyer gelişimi, liderlik, öz farkındalık ve uzun vadeli profesyonel planlama odaklı 6 aylık yapılandırılmış mentorluk programı.",
    logo: "/images/logos/bpw.png",
  },
  {
    when: "Eki 2024 — Eki 2025",
    role: "Sosyal Medya Tasarımcısı",
    org: "BEÜN Genç TEMA Topluluğu",
    text: "Çevre topluluğunun sosyal medya tasarımlarını hazırladım; doğa etkinliklerinde ve okul ziyaretlerinde yer aldım.",
    logo: "/images/logos/tema.jpg",
    logoFit: "cover",
  },
  {
    when: "Eki 2022 — Oca 2023",
    role: "Core Member",
    org: "BEU CYBER",
    text: "Üniversitenin siber güvenlik topluluğunun çekirdek ekibinde yer aldım.",
    logo: "/images/logos/beucyber.png",
  },
];

export const certificates = ["Huawei Ar-Ge Buluşması"];
