import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { dict, type Locale } from "@/content/i18n";

const W = 1080, H = 1920;

async function loadFont(weight: number, text: string) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@${weight}&text=${encodeURIComponent(text)}`)
  ).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("Font indirilemedi");
  return (await fetch(match[1])).arrayBuffer();
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const loc = (searchParams.get("locale") === "en" ? "en" : "tr") as Locale;
  const { site, ui } = dict[loc];
  const chips = site.marquee.slice(0, 6);
  const domain = "begumalakus.vercel.app";
  const text = `${site.name}${site.title}${site.tagline}${domain}B${chips.join("")}${ui.about.openToWork}${site.location}`;

  const [light, medium, bold] = await Promise.all([loadFont(300, text), loadFont(500, text), loadFont(700, text)]);
  const portrait = readFileSync(join(process.cwd(), "public/images/portrait-circle.png"));
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          background: "#FAF8F6", position: "relative", fontFamily: "Jakarta", padding: "90px 90px 70px",
        }}
      >
        <div style={{ position: "absolute", top: -180, left: -160, width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle, #F4EAE4 0%, rgba(244,234,228,0) 70%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -160, right: -140, width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, #EADBD1 0%, rgba(234,219,209,0) 70%)", display: "flex" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 20, zIndex: 1 }}>
          <div style={{
            width: 84, height: 84, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            background: "radial-gradient(circle at 32% 28%, #fff 0%, #F4EAE4 45%, #EADBD1 100%)",
            border: "3px solid #fff", fontSize: 34, fontWeight: 300, color: "#221D1A",
          }}>
            B
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 500, color: "#8E857E" }}>Merhaba, ben {site.name}</div>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative",
          width: "100%", height: 800, borderRadius: 32, overflow: "hidden", marginTop: 44, zIndex: 1,
          boxShadow: "0 30px 60px -30px rgba(34,29,26,.4)",
        }}>
          <img src={portraitSrc} width={900} height={800} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
          <div style={{
            position: "absolute", top: 26, left: 26, display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,.9)", borderRadius: 999, padding: "12px 22px", fontSize: 24, fontWeight: 600, color: "#221D1A",
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#6E9A7B", display: "flex" }} />
            {ui.about.openToWork}
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between", padding: "26px 28px",
            background: "linear-gradient(to top, rgba(0,0,0,.55), transparent)",
          }}>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 600, letterSpacing: "0.05em", color: "#fff" }}>{site.name.toUpperCase()}</div>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 600, letterSpacing: "0.05em", color: "#fff" }}>{site.location.toUpperCase()}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 50, zIndex: 1 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#221D1A", letterSpacing: "-0.03em", lineHeight: 1.1, display: "flex" }}>
            {site.title}
          </div>
          <div style={{ fontSize: 30, fontWeight: 300, color: "#4E4641", marginTop: 20, lineHeight: 1.5, display: "flex" }}>
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40, zIndex: 1 }}>
          {chips.map((c) => (
            <div key={c} style={{
              display: "flex", fontSize: 24, fontWeight: 500, color: "#4E4641",
              background: "#FFFFFF", border: "1px solid #ECE7E2", borderRadius: 999, padding: "12px 24px",
            }}>
              {c}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "center", zIndex: 1 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14, background: "#221D1A", color: "#FAF8F6",
            borderRadius: 999, padding: "26px 48px", fontSize: 30, fontWeight: 500,
          }}>
            {domain}
            <div style={{ display: "flex", fontSize: 30 }}>↗</div>
          </div>
        </div>
      </div>
    ),
    { width: W, height: H, fonts: [
      { name: "Jakarta", data: light, weight: 300, style: "normal" },
      { name: "Jakarta", data: medium, weight: 500, style: "normal" },
      { name: "Jakarta", data: bold, weight: 700, style: "normal" },
    ] }
  );
}
