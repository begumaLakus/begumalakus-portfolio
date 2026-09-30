import Link from "next/link";

// Kök seviyesi yedek 404 (normalde middleware her isteği /[locale] altına yönlendirdiği için
// buraya düşülmez; asıl yerelleştirilmiş 404 app/[locale]/not-found.tsx).
export default function RootNotFound() {
  return (
    <html lang="tr">
      <body style={{ minHeight: "100svh", display: "grid", placeItems: "center", fontFamily: "system-ui, sans-serif" }}>
        <Link href="/">Ana sayfaya dön · Back to home</Link>
      </body>
    </html>
  );
}
