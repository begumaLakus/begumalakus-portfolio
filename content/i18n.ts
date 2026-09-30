// Dil seçimi için tek giriş noktası. Bir bileşen içerik/metin gerektiğinde
// `import { dict } from "@/content/i18n"` yapıp `dict[locale].site` gibi erişir.
// Tipler (Project, Service, ScreenId ...) her iki dilde de aynı şekle sahip; TypeScript
// tarafında bunları tek kaynaktan (content/tr/*) almak yeterli — tip bilgisi zaten
// çalışma zamanında yok olduğu için diller arasında ayrıca taşınmasına gerek yok.

import * as tr from "./tr";
import * as en from "./en";

export type Locale = "tr" | "en";
export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

export const dict = { tr, en } as const;
