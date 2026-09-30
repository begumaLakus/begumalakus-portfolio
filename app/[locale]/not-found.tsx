import Link from "next/link";
import { dict, defaultLocale } from "@/content/i18n";

// Next.js locale-siz global 404'te de bu dosyayı kullanır (o durumda locale bilinmez,
// varsayılan dile düşülür); asıl yerelleştirilmiş 404 her zaman /[locale] altında render edilir.
export default function NotFound() {
  const { ui } = dict[defaultLocale];
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", textAlign: "center", padding: "0 16px" }}>
      <div>
        <span className="label">{ui.notFound.eyebrow}</span>
        <h1 className="h2" style={{ marginTop: 16 }}>{ui.notFound.titlePre} <b>{ui.notFound.titleBold}</b></h1>
        <p className="lead" style={{ margin: "18px auto 0" }}>{ui.notFound.lead}</p>
        <p style={{ marginTop: 32 }}><Link className="btn dark" href="/">{ui.notFound.cta}</Link></p>
      </div>
    </main>
  );
}
