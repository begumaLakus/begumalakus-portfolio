// Telefon çerçevesi içindeki temsili uygulama ekranlarının metinleri.
// İngilizce karşılığı: content/en/phone.ts — ikisi de aynı şekli taşımalı.

export const phone = {
  ownway: {
    testLabel: "Envanter Testi · Soru 14/42",
    title: "Kampüs Zekâsı",
    question: "“Yeni bir problemi mantıksal adımlara bölerek çözmekten keyif alırım.”",
    scaleLow: "Katılmıyorum",
    scaleHigh: "Katılıyorum",
    cities: { a: "İstanbul", b: "Ankara", c: "İzmir", d: "Zonguldak" },
  },
  pixel: {
    live: "Canlı",
    theme: "Günün teması: Lale",
    skip: "Atla",
    vote: "Oy ver",
  },
  cini: {
    status: "Tespit · 3 motif · 41 ms",
    tulip: "lale",
    carnation: "karanfil",
    cintemani: "çintemani",
    detTulip: "Lale",
    detCintemani: "Çintemani",
    detCarnation: "Karanfil",
  },
  colorvision: {
    title: "Renk ayrıştırma",
    subtitle: "K = 6 küme · döteranopi",
    original: "Orijinal", originalSub: "RGB",
    simulated: "Döteranop görüş", simulatedSub: "simülasyon",
    separated: "Ayrıştırılmış", separatedSub: "sonuç",
    caption: "karışan küme çifti:",
  },
} as const;
