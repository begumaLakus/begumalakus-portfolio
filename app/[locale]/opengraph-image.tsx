import { readFileSync } from "node:fs";
import { join } from "node:path";
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
  const { site, ui } = dict[loc];
  const domain = "begumalakus.vercel.app";
  const text = `${site.name}${site.title}${site.tagline}${domain}B${ui.about.openToWork}${site.location}`;

  const [light, medium, bold] = await Promise.all([loadFont(300, text), loadFont(500, text), loadFont(700, text)]);
  const portrait = readFileSync(join(process.cwd(), "public/images/portrait-circle.png"));
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center",
          background: "#FAF8F6", padding: "60px", position: "relative", fontFamily: "Jakarta", gap: 56,
        }}
      >
        <div style={{ position: "absolute", top: -160, left: -140, width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, #F4EAE4 0%, rgba(244,234,228,0) 70%)", display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", flex: "1 1 0", height: "100%", justifyContent: "center", zIndex: 1 }}>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 600, letterSpacing: "0.12em", color: "#8E857E" }}>
            {ui.about.eyebrow.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 700, color: "#221D1A", marginTop: 18, letterSpacing: "-0.03em", lineHeight: 1.12, maxWidth: 620 }}>
            {site.tagline}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 44 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: "radial-gradient(circle at 32% 28%, #fff 0%, #F4EAE4 45%, #EADBD1 100%)",
              border: "1px solid #fff", fontSize: 22, fontWeight: 300, color: "#221D1A",
            }}>
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 22, fontWeight: 600, color: "#221D1A" }}>{site.name}</div>
              <div style={{ display: "flex", fontSize: 19, fontWeight: 500, color: "#A9876F" }}>{domain}</div>
            </div>
          </div>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative",
          width: 420, height: "100%", borderRadius: 28, overflow: "hidden", flex: "none",
          boxShadow: "0 30px 60px -30px rgba(34,29,26,.35)",
        }}>
          <img src={portraitSrc} width={420} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
          <div style={{
            position: "absolute", top: 20, left: 20, display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,.88)", borderRadius: 999, padding: "9px 16px", fontSize: 17, fontWeight: 600, color: "#221D1A",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6E9A7B", display: "flex" }} />
            {ui.about.openToWork}
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between", padding: "18px 20px",
            background: "linear-gradient(to top, rgba(0,0,0,.55), transparent)",
          }}>
            <div style={{ display: "flex", fontSize: 16, fontWeight: 600, letterSpacing: "0.05em", color: "#fff" }}>{site.name.toUpperCase()}</div>
            <div style={{ display: "flex", fontSize: 16, fontWeight: 600, letterSpacing: "0.05em", color: "#fff" }}>{site.location.toUpperCase()}</div>
          </div>
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
