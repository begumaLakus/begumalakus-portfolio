# Begüm Alakuş · Portfolyo

Kişisel portfolyo sitesi: **Mobile & AI Engineer**. Next.js 16 (App Router) + TypeScript, harici UI kütüphanesi olmadan elle yazılmış CSS.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # üretim derlemesi
npm run lint
```

## Klasör yapısı

```
app/
  layout.tsx            yazı tipleri (Plus Jakarta Sans, JetBrains Mono), SEO/Open Graph, stil dosyaları
  page.tsx              tek sayfa: bölümlerin sırası burada
  not-found.tsx         404 sayfası
  api/contact/route.ts  iletişim formu → Resend → e-posta
content/                ← SİTENİN TÜM METİNLERİ. İçerik güncellemek için yalnızca burayı düzenle.
  site.ts               ad, unvan, bağlantılar, hobiler, terminal satırları
  projects.ts           projeler (telefon ekranlarıyla eşleşir)
  experience.ts         deneyim, gönüllülük, sertifikalar
  events.ts             polaroid galeri
  skills.ts             yetenek kartları
  services.ts           hizmetler
components/
  layout/               Nav, Footer
  sections/             sayfanın her bölümü
  phone/                telefon çerçevesi ve canlı uygulama ekranları
  chat/                 "Begüm'e sor" asistanı
  effects/              inci imleç, kaydırma efektleri
  ui/                   ikonlar, e-posta kopyalama
lib/
  contact.ts            form doğrulaması (istemci + sunucu ortak)
  chat/intents.ts       asistanın konuları ve cevapları
styles/                 bölüm bölüm CSS; renkler styles/tokens.css'te
public/images/          işlenmiş görseller (script üretir)
scripts/process-images.py  ham fotoğrafları sitenin film tonuna getirir
assets/raw/             ham fotoğraflar (git'e gönderilmez)
```

## İçerik ve görsel güncelleme

- **Metin:** `content/` altındaki ilgili dosyayı düzenle. Bilgiler çeliştiğinde CV esas alınır.
- **Yeni etkinlik fotoğrafı:** ham dosyayı `assets/raw/` içine koy → `scripts/process-images.py` içindeki `EVENTS` listesine ekle → `npm run images` → `content/events.ts`'e kaydını gir.
- **Renkler:** yalnızca `styles/tokens.css`.

## Tasarım kuralları

- Palet: süt, espresso, latte, pudra. Vurgu rengi tek (latte).
- Koyu espresso zemin yalnızca vurgu alanlarında: etkinlik galerisi, iletişim kartı ve yetenekler bölümündeki **tek** koyu kart.
- Animasyonlar `prefers-reduced-motion` açıkken kapanır.

## İletişim formu

`.env.example` dosyasını `.env.local` olarak kopyalayıp doldur. Anahtar yoksa form "yapılandırılmadı" hatası döner, mesaj kaybolmaz; kullanıcıya e-posta adresi gösterilir.

## Yol haritası

- [ ] Asistan: `lib/chat/intents.ts` örneklerinden veri seti → tarayıcıda çalışan küçük bir embedding modeli
- [ ] Open Graph görseli (link önizlemesi) ve favicon
- [ ] Proje ekranlarına gerçek ekran görüntüleri
- [ ] Alan adı + Vercel'e yayın
- [ ] İngilizce sürüm
