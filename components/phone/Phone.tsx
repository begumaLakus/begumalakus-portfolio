import type { CSSProperties } from "react";
import type { ScreenId } from "@/content/tr/projects";
import type { Locale } from "@/content/i18n";
import { Screen } from "./screens";

type Props = { screen: ScreenId; scale?: number; uid: string; className?: string; locale: Locale };

/** Telefon çerçevesi. `scale` yerleşimdeki kapladığı alanı da küçültür. */
export function Phone({ screen, scale = 1, uid, className = "", locale }: Props) {
  return (
    <div className={`scaled ${className}`.trim()} style={{ "--s": scale } as CSSProperties}>
      <div className="phone"><Screen id={screen} uid={uid} locale={locale} /></div>
    </div>
  );
}
