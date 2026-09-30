import { TOPIC_KEYS, validateContact, type ContactInput, type TopicKey } from "@/lib/contact";
import { dict, type Locale } from "@/content/i18n";

// İletişim formu → Resend üzerinden Begüm'ün e-postasına.
// Gerekli ortam değişkenleri (.env.local): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // basit, sunucu örneği başına istek sınırı

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Body = Partial<ContactInput> & { locale?: string };

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  let body: Body;
  try { body = await req.json(); } catch { body = {}; }
  const locale: Locale = body.locale === "en" ? "en" : "tr";
  const { api, validation } = dict[locale].ui;

  if (rateLimited(ip)) return Response.json({ error: api.rateLimited }, { status: 429 });
  if (!body || typeof body !== "object") return Response.json({ error: api.invalidRequest }, { status: 400 });

  if (body.website) return Response.json({ ok: true }); // bot tuzağı: sessizce yut
  const errors = validateContact(body, validation);
  if (Object.keys(errors).length) return Response.json({ error: api.formInvalid, errors }, { status: 400 });
  const topic: TopicKey = TOPIC_KEYS.includes(body.topic as TopicKey) ? (body.topic as TopicKey) : "other";

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return Response.json({ error: api.notConfigured }, { status: 503 });
  }

  const name = body.name!.trim(), email = body.email!.trim(), message = body.message!.trim();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Portfolio · ${topic} · ${name}`,
      text: `Topic: ${topic}\nLanguage: ${locale}\nName: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><b>Topic:</b> ${esc(topic)}<br><b>Language:</b> ${locale}<br><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });

  if (!res.ok) return Response.json({ error: api.sendFailed }, { status: 502 });
  return Response.json({ ok: true });
}
