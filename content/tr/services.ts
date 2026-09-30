export type Service = { title: string; icon: "mobile" | "web" | "ai"; text: string; items: string[]; foot?: string };

export const services: Service[] = [
  { title: "Mobil Uygulama Geliştirme", icon: "mobile",
    text: "iOS ve Android için tek kod tabanı üzerinden, mağaza dağıtımına hazır yüksek performanslı uygulamalar.",
    items: ["React Native ve TypeScript mimarisi", "Node.js veya Firebase tabanlı arka uç ve veritabanı entegrasyonu", "Kimlik doğrulama, anlık bildirim ve çevrimdışı önbellekleme"] },
  { title: "Web & Arayüz Mimarisi", icon: "web",
    text: "Modern web standartlarına uygun, hızlı yüklenen ve her ekrana uyumlu arayüzler ve yönetim panelleri.",
    items: ["React ve Next.js tabanlı modüler bileşen mimarisi", "REST API entegrasyonu ve state yönetimi", "Optimize edilmiş yükleme süreleri ve responsive tasarım"],
    foot: "Bu siteyi de Next.js ile böyle sıfırdan tasarlayıp kodladım." },
  { title: "Yapay Zekâ & Görüntü İşleme", icon: "ai",
    text: "Ürüne ya da iş sürecine akıllı bir katman: karar destek mekanizmaları, veri analizi ve bilgisayarlı görü modelleri.",
    items: ["LLM tabanlı sohbet asistanı entegrasyonu", "YOLO ve OpenCV ile nesne ve motif tespiti", "Veri analitiği ve kural tabanlı öneri motorları"],
    foot: "Sağdaki sohbet asistanı da bunun canlı bir örneği." },
];
