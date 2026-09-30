import { ImageResponse } from "next/og";
import { dict, locales, type Locale } from "@/content/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function loadFont(weight: number, text: string) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}&text=${encodeURIComponent(text)}`)
  ).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("Font indirilemedi");
  return (await fetch(match[1])).arrayBuffer();
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (locales.includes(locale as Locale) ? locale : "tr") as Locale;
  const { site } = dict[loc];
  const domain = "begumalakus.vercel.app";
  const text = `${site.name}${site.title}${site.tagline}${domain}B`;

  const [light, medium, bold] = await Promise.all([loadFont(300, text), loadFont(500, text), loadFont(700, text)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          background: "#FAF8F6", padding: "72px", position: "relative", fontFamily: "Jakarta",
        }}
      >
        <div
          style={{
            position: "absolute", top: -140, right: -140, width: 460, height: 460, borderRadius: "50%",
            background: "radial-gradient(circle, #F4EAE4 0%, rgba(244,234,228,0) 70%)", display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: -160, left: -100, width: 360, height: 360, borderRadius: "50%",
            background: "radial-gradient(circle, #EADBD1 0%, rgba(234,219,209,0) 70%)", display: "flex",
          }}
        />
        <div
          style={{
            width: 88, height: 88, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: "radial-gradient(circle at 32% 28%, #fff 0%, #F4EAE4 45%, #EADBD1 100%)",
            border: "1px solid #fff", fontSize: 36, fontWeight: 300, color: "#221D1A",
          }}
        >
          B
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 36 }}>
          <div style={{ fontSize: 24, fontWeight: 500, color: "#A9876F", display: "flex", letterSpacing: "-0.01em" }}>{site.name}</div>
          <div style={{ fontSize: 74, fontWeight: 700, color: "#221D1A", marginTop: 10, letterSpacing: "-0.035em", lineHeight: 1.05, display: "flex", maxWidth: 1000 }}>
            {site.title}
          </div>
          <div style={{ fontSize: 27, fontWeight: 300, color: "#4E4641", marginTop: 26, maxWidth: 860, lineHeight: 1.45, display: "flex" }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 21, color: "#8E857E", fontWeight: 500, display: "flex" }}>{domain}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [
      { name: "Jakarta", data: light, weight: 300, style: "normal" },
      { name: "Jakarta", data: medium, weight: 500, style: "normal" },
      { name: "Jakarta", data: bold, weight: 700, style: "normal" },
    ] }
  );
}
