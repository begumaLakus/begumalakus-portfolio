import { dict, type Locale } from "@/content/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const { site, ui } = dict[locale];
  return (
    <footer className="site">
      <div className="wrap">
        <span>© {new Date().getFullYear()} {site.name} · {ui.footer.designedBy}</span>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}
