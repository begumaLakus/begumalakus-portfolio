"""Ham fotoğrafları (assets/raw) sitenin tek tip, sıcak film tonuna getirip public/images altına üretir.

Kullanım:  npm run images      (ya da: python scripts/process-images.py)
Gereksinim: pip install pillow
Yeni bir etkinlik fotoğrafı eklemek için ham dosyayı assets/raw'a koy, aşağıdaki EVENTS listesine
bir satır ekle ve content/events.ts'e kaydını gir.
"""
import os
import random
from PIL import Image, ImageChops, ImageEnhance, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "assets", "raw")
OUT = os.path.join(ROOT, "public", "images")


def grade(im, grain=5):
    """Hafif soluk, sıcak film tonu + ince gren: farklı kalitedeki fotoğrafları tek koleksiyon gibi gösterir."""
    im = ImageEnhance.Color(im).enhance(0.9)
    im = ImageEnhance.Contrast(im).enhance(0.93)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.03 + 6)))
    g = g.point(lambda v: min(255, int(v * 1.0 + 5)))
    b = b.point(lambda v: min(255, int(v * 0.95 + 8)))
    im = Image.merge("RGB", (r, g, b))
    if grain:
        random.seed(7)
        n = Image.effect_noise(im.size, grain * 4).convert("L").point(lambda v: 128 + (v - 128) // 3)
        im = ImageChops.overlay(im, Image.merge("RGB", (n, n, n)))
    return im


def crop(im, ratio, cx=0.5, cy=0.5, scale=1.0):
    """Verilen oranda, (cx, cy) odak noktası etrafında kırpar. scale < 1 yakınlaştırır."""
    w_img, h_img = im.size
    h = min(h_img, w_img / ratio) * scale
    w = h * ratio
    x = max(0, min(w_img - w, cx * w_img - w / 2))
    y = max(0, min(h_img - h, cy * h_img - h / 2))
    return im.crop((int(x), int(y), int(x + w), int(y + h)))


def save(src, dst, ratio, size, cx=0.5, cy=0.5, scale=1.0, grain=5):
    im = ImageOps.exif_transpose(Image.open(os.path.join(RAW, src))).convert("RGB")
    im = crop(im, ratio, cx, cy, scale).resize((size, round(size / ratio)), Image.LANCZOS)
    path = os.path.join(OUT, dst)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    grade(im, grain).save(path, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"{dst:40s} {os.path.getsize(path) // 1024} KB")


def save_feathered_circle(src, dst, size, inner=0.90, grain=0):
    """Kare bir fotoğrafı, kenarı sert değil YUMUŞAK biçimde şeffaflığa geçen bir daire olarak PNG'ye kaydeder.

    Bazı kaynak fotoğraflar (ör. bir AI arka plan/daire kırpma aracından geçmiş profil fotoğrafları)
    gürültülü/pikselli bir daire kenarıyla gelir ve arka planı öznenin geri kalanından ayırmaz — yani
    arka planı temiz biçimde değiştirmek mümkün olmaz. Bu fonksiyon o gürültülü kenarı tamamen atıp
    (inner < 1 ile içeriden kırparak) yerine düzgün, yumuşak bir geçiş çizer. Sonuç, kenarı şeffaf bir
    PNG olduğu için sitede hangi zeminin (gradyan, düz renk) üstüne konursa o zeminle kaynaşır.
    """
    im = ImageOps.exif_transpose(Image.open(os.path.join(RAW, src))).convert("RGB")
    w, h = im.size
    side = min(w, h)
    im = crop(im, 1, 0.5, 0.5, 1.0)  # tam kare, ortalanmış
    im = grade(im, grain) if grain else im
    im = im.resize((size, size), Image.LANCZOS)

    # Yumuşak daire maskesi: r <= inner tam opak, inner..1 arası feather ile 0'a iner.
    mask = Image.new("L", (size, size), 0)
    px = mask.load()
    cx = cy = size / 2
    r_in = cx * inner
    r_out = cx
    for y in range(size):
        dy = y - cy
        for x in range(size):
            dx = x - cx
            r = (dx * dx + dy * dy) ** 0.5
            if r <= r_in:
                px[x, y] = 255
            elif r >= r_out:
                px[x, y] = 0
            else:
                k = 1 - (r - r_in) / (r_out - r_in)
                px[x, y] = int(255 * (k ** 1.6))  # hafif ease: kenara doğru daha çabuk solar

    out = Image.new("RGBA", (size, size))
    out.paste(im, (0, 0))
    out.putalpha(mask)
    path = os.path.join(OUT, dst)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    out.save(path, "PNG", optimize=True)
    print(f"{dst:40s} {os.path.getsize(path) // 1024} KB")


# (ham dosya, çıktı adı, odak x, odak y)
EVENTS = [
    ("devfest-2.jpg", "devfest-2.jpg", 0.5, 0.56),
    ("devfest-3.jpg", "devfest-3.jpg", 0.5, 0.5),
    ("devfest-4.jpg", "devfest-4.jpg", 0.5, 0.5),
    ("githubsunum-1.jpg", "githubsunum-1.jpg", 0.5, 0.5),
    ("githubsunum-2.jpg", "githubsunum-2.jpg", 0.5, 0.6),
    ("githubsunum-3.jpg", "githubsunum-3.jpg", 0.52, 0.5),
    ("hackhathon-1.jpg", "hackathon-1.jpg", 0.55, 0.5),
    ("hackhathon-2.jpg", "hackathon-2.jpg", 0.5, 0.5),
    ("temaetkinlik-2.jpg", "temaetkinlik-2.jpg", 0.5, 0.62),
    ("temaetkinlk.jpg", "temaetkinlik-okul.jpg", 0.5, 0.64),
    ("mezuniyyet-1.jpg", "mezuniyet-1.jpg", 0.5, 0.62),
    ("mezuniyet-2.jpg", "mezuniyet-2.jpg", 0.5, 0.56),
    ("mezuniyet-3.jpg", "mezuniyet-3.jpg", 0.5, 0.52),
    ("mezuniyet-4.jpg", "mezuniyet-4.jpg", 0.5, 0.6),
]
# Not: tema.jpg'de çocukların yüzleri göründüğü için kullanılmıyor.

if __name__ == "__main__":
    save("begum.jpg", "portrait.jpg", 4 / 5, 900, cx=0.48, cy=0.5, grain=3)
    # Profesyonel stüdyo fotoğrafı: kaynaktaki pikselli daire kenarı atılıp yumuşak bir feather ile
    # değiştiriliyor; gri stüdyo fonu olduğu gibi kalıyor. Sonuç şeffaf kenarlı bir PNG.
    save_feathered_circle("begum-headshot.webp", "portrait-circle.png", 1000, inner=0.90)
    for src, dst, cx, cy in EVENTS:
        save(src, f"events/{dst}", 1, 640, cx, cy)
