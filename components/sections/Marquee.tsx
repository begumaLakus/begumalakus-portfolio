import { dict, type Locale } from "@/content/i18n";

export function Marquee({ locale }: { locale: Locale }) {
  const { site } = dict[locale];
  const items = [...site.marquee, ...site.marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">{items.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  );
}
