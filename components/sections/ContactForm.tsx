"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { TOPIC_KEYS, validateContact, type FieldErrors, type TopicKey } from "@/lib/contact";
import { dict, type Locale } from "@/content/i18n";

type Status = { kind: "idle" | "sending" | "ok" | "error"; text?: string };

export function ContactForm({ locale }: { locale: Locale }) {
  const { ui } = dict[locale];
  const [topic, setTopic] = useState<TopicKey>("job");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k: "name" | "email" | "message") => () => {
    if (!form[k]) return;
    setErrors((prev) => ({ ...prev, [k]: validateContact(form, ui.validation)[k] }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateContact(form, ui.validation);
    setErrors(errs);
    const first = (["name", "email", "message"] as const).find((k) => errs[k]);
    if (first) { document.getElementById(`f-${first}`)?.focus(); return; }
    if (form.website) return; // bot tuzağı

    setStatus({ kind: "sending", text: ui.form.sending });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, topic, locale }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? ui.api.sendFailed);
      setStatus({ kind: "ok", text: ui.form.success });
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus({ kind: "error", text: `${(err as Error).message} ${ui.form.failSuffix}` });
    }
  };

  return (
    <form className="form" noValidate onSubmit={submit}>
      <fieldset className="topics">
        <legend>{ui.form.topicsLegend}</legend>
        {TOPIC_KEYS.map((t) => (
          <label key={t}><input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} /><span>{ui.form.topics[t]}</span></label>
        ))}
      </fieldset>
      <div className="two">
        <div className="field">
          <label htmlFor="f-name">{ui.form.nameLabel}</label>
          <input id="f-name" name="name" type="text" autoComplete="name" placeholder={ui.form.namePlaceholder} maxLength={80} value={form.name} onChange={set("name")} onBlur={blur("name")} aria-invalid={!!errors.name} aria-describedby="e-name" />
          <span className="err" id="e-name">{errors.name}</span>
        </div>
        <div className="field">
          <label htmlFor="f-email">{ui.form.emailLabel}</label>
          <input id="f-email" name="email" type="email" autoComplete="email" placeholder={ui.form.emailPlaceholder} maxLength={120} value={form.email} onChange={set("email")} onBlur={blur("email")} aria-invalid={!!errors.email} aria-describedby="e-email" />
          <span className="err" id="e-email">{errors.email}</span>
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-message">{ui.form.messageLabel}</label>
        <textarea id="f-message" name="message" placeholder={ui.form.messagePlaceholder} maxLength={2000} value={form.message} onChange={set("message")} onBlur={blur("message")} aria-invalid={!!errors.message} aria-describedby="e-message" />
        <span className="err" id="e-message">{errors.message}</span>
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">{ui.form.websiteLabel}</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </div>
      <button className="submit" type="submit" disabled={status.kind === "sending"}>{ui.form.submit} <Icon name="arrowRight" size={14} stroke={2.2} /></button>
      {status.kind !== "idle" && <div className="status" role="status">{status.text}</div>}
    </form>
  );
}
