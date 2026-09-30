export type ScreenId = "ownway" | "pixel" | "cini" | "renk";

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
    kind: "Mobil · AI · TÜBİTAK 2209-A",
    summary: "Öğrenci verisini analiz edip her öğrenciye kariyer önerisi sunan, yapay zekâ destekli bir kariyer yönetim sistemi.",
    points: [
      "4 kişilik takımda backend geliştirici ve sistem mimarı olarak çalıştım.",
      "Öğrenci verisini analiz eden ölçeklenebilir Node.js REST API servisleri yazdım.",
      "PostgreSQL veritabanı mimarisini optimize ettim.",
      "Kariyer önerisi üreten yapay zekâ modellerini arka uca entegre ettim.",
    ],
    stack: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "REST API", "AI"],
    repo: "https://github.com/begumaLakus/OwnWay",
  },
  {
    id: "pixel",
    title: "Pixel Art Challenge",
    kind: "Mobil · Full Stack · Eterna Teknoloji",
    summary: "Her gün yeni bir tema, bir piksel tuvali ve topluluk oylaması. Eterna Teknoloji'de sıfırdan uçtan uca geliştirdiğim bir mobil uygulama.",
    points: [
      "Çizim, günlük challenge ve oylama modüllerini React Native ve TypeScript ile geliştirdim.",
      "Kimlik doğrulamayı Firebase Auth ile kurdum, veriyi Firestore üzerinde NoSQL olarak modelledim.",
      "Challenge döngüsünü Cloud Functions ile otomatikleştirdim: süre sunucuda denetleniyor, oylar sayılıyor, yeni tema kendiliğinden başlıyor.",
      "Kendi çizimine ve birden fazla oy vermeyi Firestore güvenlik kuralları ile sunucu tarafında engelledim.",
    ],
    stack: ["React Native", "TypeScript", "Firebase Auth", "Firestore", "Cloud Functions"],
    repo: "https://github.com/begumaLakus/pixel-art-challenge",
  },
  {
    id: "cini",
    title: "Çini Motif Tespiti",
    kind: "Bilgisayarlı Görü · YOLOv8",
    summary: "Türk çini sanatındaki motif ve sembolleri tespit edip sınıflandıran bir nesne tespit modeli.",
    points: [
      "YOLOv8 tabanlı modeli lale, karanfil, çintemani ve sümbül olmak üzere 4 motif sınıfı üzerinde eğittim.",
      "Veri artırma ile model doğruluğunu artırdım.",
      "Streamlit ile bir arayüz geliştirdim: yüklenen görseldeki motifi bulup sembolizmini ve tarihçesini anlatıyor.",
    ],
    stack: ["Python", "YOLOv8", "Data Augmentation", "Streamlit"],
    repo: "https://github.com/begumaLakus/TileArt-Vision-YOLOv8",
  },
  {
    id: "renk",
    title: "ColorVision Enhancer",
    kind: "Görüntü İşleme · Erişilebilirlik",
    summary: "Döteranopi (kırmızı-yeşil renk körlüğü) olan kullanıcılar için birbirine karışan renkleri ayrıştıran bir görüntü işleme sistemi.",
    points: [
      "Görüntüyü LMS renk uzayına taşıyıp renk körlüğünü simüle ettim.",
      "K-Means kümeleme ile görüntüyü baskın renklere sadeleştirdim.",
      "HSV uzayında kırmızı ve yeşil bölgelerin parlaklığını birbirinden ayırarak renkleri ayırt edilebilir hale getirdim.",
      "Sonuçları akademik rapor formatında belgeledim.",
    ],
    stack: ["Python", "OpenCV", "NumPy", "K-Means"],
    repo: "https://github.com/begumaLakus/ColorVision-Enhancer",
  },
];
