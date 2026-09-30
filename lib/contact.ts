// İletişim formunun istemci ve sunucuda ortak kullandığı doğrulama.
// Konu anahtarları (TopicKey) dilden bağımsız sabit kodlardır; görünen etiketler
// content/tr/ui.ts ve content/en/ui.ts içindeki `form.topics` sözlüğünden gelir.

export const TOPIC_KEYS = ["job", "website", "mobile", "other"] as const;
export type TopicKey = (typeof TOPIC_KEYS)[number];

export type ContactInput = { topic: TopicKey; name: string; email: string; message: string; website?: string };
export type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export type ValidationMessages = {
  nameRequired: string;
  nameTooLong: string;
  emailInvalid: string;
  messageTooShort: string;
  messageTooLong: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(d: Partial<ContactInput>, m: ValidationMessages): FieldErrors {
  const e: FieldErrors = {};
  if (!d.name || d.name.trim().length < 2) e.name = m.nameRequired;
  else if (d.name.length > 80) e.name = m.nameTooLong;
  if (!d.email || !EMAIL_RE.test(d.email.trim())) e.email = m.emailInvalid;
  if (!d.message || d.message.trim().length < 10) e.message = m.messageTooShort;
  else if (d.message.length > 2000) e.message = m.messageTooLong;
  return e;
}
