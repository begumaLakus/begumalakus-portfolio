import type { CSSProperties } from "react";
import type { ScreenId } from "@/content/tr/projects";
import { dict, type Locale } from "@/content/i18n";

// Telefon çerçevesinin içindeki canlı uygulama ekranları.
// Gerçek ekran görüntüleri gelince bunların yerine <Image> konabilir.

const StatusBar = () => (
  <>
    <div className="island" />
    <div className="sbar"><span>9:41</span><span>●●● ▮</span></div>
  </>
);

const v = (x: Record<string, string>) => x as CSSProperties;

function OwnWay({ locale }: { locale: Locale }) {
  // Gerçek özelliklere göre: kişilik envanteri sorusu (RIASEC) + kampüs karşılaştırma haritası.
  // Kariyer "eşleşme yüzdesi" gibi uydurma bir çıktı yok; uygulama gerçekte bunu göstermiyor.
  const t = dict[locale].phone.ownway;
  const pins: [string, string, string, string][] = [
    ["24%", "30%", t.cities.a, "0s"],
    ["58%", "18%", t.cities.b, ".5s"],
    ["70%", "58%", t.cities.c, "1s"],
    ["38%", "62%", t.cities.d, "1.5s"],
  ];
  return (
    <div className="app">
      <span className="sm">{t.testLabel}</span>
      <h4>{t.title}</h4>
      <p className="quest">{t.question}</p>
      <div className="likert">{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n === 4 ? "on" : ""} />)}</div>
      <div className="likert-lab"><span>{t.scaleLow}</span><span>{t.scaleHigh}</span></div>
      <div className="map">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <line x1="24" y1="30" x2="58" y2="18" stroke="#D9CFC6" strokeWidth="1" />
          <line x1="58" y1="18" x2="70" y2="58" stroke="#D9CFC6" strokeWidth="1" />
          <line x1="70" y1="58" x2="38" y2="62" stroke="#D9CFC6" strokeWidth="1" />
          <line x1="38" y1="62" x2="24" y2="30" stroke="#D9CFC6" strokeWidth="1" />
        </svg>
        {pins.map(([l, top, label, d]) => <span key={label} className="pin" data-l={label} style={v({ left: l, top, "--d": d })} />)}
      </div>
    </div>
  );
}

const TULIP = ["................", "......R..R......", ".....RRRRRR.....", ".....RRRRRR.....", "......RRRR......", ".......GG.......", "....GG.GG.......", ".....GGGG...GG..", "......GGG.GGG...", ".......GGGG.....", ".......GG.......", "...BBBBBBBBBB...", "....BBBBBBBB....", "....BBBBBBBB....", ".....BBBBBB.....", "................"];
const TCOL: Record<string, string> = { R: "#D9695A", G: "#7FA07A", B: "#C9A58B" };

function PixelArt({ locale }: { locale: Locale }) {
  const t = dict[locale].phone.pixel;
  let k = 0;
  const cells = TULIP.join("").split("").map((c, i) =>
    c === "." ? <i key={i} /> : <i key={i} className="c" style={v({ background: TCOL[c], "--d": `${(k++ * 0.035).toFixed(3)}s` })} />
  );
  return (
    <div className="app">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="pill" style={{ background: "#FBEDEA", color: "#C4544A" }}>● {t.live} · 02:14:09</span>
        <span className="sm">#214</span>
      </div>
      <h4>{t.theme}</h4>
      <div className="pix">{cells}</div>
      <div className="pal">{["#D9695A", "#7FA07A", "#C9A58B", "#F2C6A8", "#1E1A18"].map((c) => <b key={c} style={{ background: c }} />)}</div>
      <div className="vote"><span style={{ background: "#F7F3F0" }}>{t.skip}</span><span style={{ background: "#1E1A18", color: "#fff" }}>♥ {t.vote}</span></div>
    </div>
  );
}

function TileArt({ uid, locale }: { uid: string; locale: Locale }) {
  const t = dict[locale].phone.cini;
  const pid = `iz-${uid}`;
  const boxes: [string, string, string, string, string, string, string][] = [
    ["36%", "36%", "28%", "28%", ".2s", "#E0564A", `${t.tulip} 0.94`],
    ["3%", "70%", "25%", "25%", ".7s", "#2A8C87", `${t.carnation} 0.88`],
    ["69%", "12%", "26%", "24%", "1.2s", "#1E1A18", `${t.cintemani} 0.91`],
  ];
  return (
    <div className="app">
      <span className="sm">{t.status}</span>
      <div className="tile">
        <svg viewBox="0 0 120 120" aria-label="Çini deseni">
          <defs>
            <pattern id={pid} width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#F8F4EE" />
              <path d="M20 4 L24 16 L36 20 L24 24 L20 36 L16 24 L4 20 L16 16 Z" fill="#2D4E9E" />
              <circle cx="20" cy="20" r="4" fill="#F8F4EE" /><circle cx="20" cy="20" r="2" fill="#C4544A" />
              <path d="M0 0 Q6 6 0 12 M40 0 Q34 6 40 12 M0 40 Q6 34 0 28 M40 40 Q34 34 40 28" stroke="#2A8C87" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="120" height="120" fill={`url(#${pid})`} />
        </svg>
        {boxes.map(([l, top, w, h, d, c, label]) => (
          <div key={label} className="bb" style={v({ left: l, top, width: w, height: h, borderColor: c, "--d": d })}>
            <span style={{ background: c }}>{label}</span>
          </div>
        ))}
      </div>
      <div className="det">
        <div><span>{t.detTulip}</span><code>0.94</code></div>
        <div><span>{t.detCintemani}</span><code>0.91</code></div>
        <div><span>{t.detCarnation}</span><code>0.88</code></div>
      </div>
    </div>
  );
}

function ColorVision({ locale }: { locale: Locale }) {
  const t = dict[locale].phone.colorvision;
  const strips: [string, string, string[], boolean][] = [
    [t.original, t.originalSub, ["#C8392B", "#3F9B3A", "#D98A2B", "#7BAE3A", "#A0522D", "#2F6FB5"], false],
    [t.simulated, t.simulatedSub, ["#9C8A3A", "#8F8741", "#B8A63A", "#A9A044", "#7F7440", "#4E6FB0"], false],
    [t.separated, t.separatedSub, ["#B5403A", "#2F78C4", "#E0A63A", "#5AB5C9", "#7A4B2F", "#23408F"], true],
  ];
  return (
    <div className="app">
      <h4>{t.title}</h4>
      <span className="sm">{t.subtitle}</span>
      {strips.map(([label, sub, colors, wipe]) => (
        <div className="cv-row" key={label}>
          <div className="cv-lab"><span>{label}</span><span>{sub}</span></div>
          <div className={`cv-strip${wipe ? " wipe" : ""}`}>{colors.map((c) => <i key={c} style={{ background: c }} />)}</div>
        </div>
      ))}
      <div className="lms"><b>RGB → LMS</b> → K-Means<br />{t.caption} <b>2</b> → <b>0</b></div>
    </div>
  );
}

export function Screen({ id, uid, locale }: { id: ScreenId; uid: string; locale: Locale }) {
  return (
    <div className="screen">
      <StatusBar />
      {id === "ownway" && <OwnWay locale={locale} />}
      {id === "pixel" && <PixelArt locale={locale} />}
      {id === "cini" && <TileArt uid={uid} locale={locale} />}
      {id === "renk" && <ColorVision locale={locale} />}
    </div>
  );
}
