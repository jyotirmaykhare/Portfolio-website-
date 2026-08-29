import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useTilt } from "@/hooks/useTilt";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Seo } from "@/components/Seo";

interface Channel {
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  copy?: { key: string; text: string };
}

const CHANNELS: Channel[] = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
    copy: { key: "email", text: site.email },
  },
  {
    label: "WhatsApp",
    value: "+91 96850 32985",
    href: "https://wa.me/919685032985",
    icon: WhatsAppIcon,
    copy: { key: "whatsapp", text: "+91 96850 32985" },
  },
  {
    label: "Phone",
    value: site.phone ?? "+91-9685032985",
    href: `tel:${(site.phone ?? "+91-9685032985").replace(/[^+\d]/g, "")}`,
    icon: Phone,
    copy: { key: "phone", text: site.phone ?? "+91-9685032985" },
  },
  {
    label: "GitHub",
    value: "github.com/jyotirmaykhare",
    href: site.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "in/jyotirmay-khare",
    href: site.linkedin,
    icon: Linkedin,
  },
];

const TOPICS = [
  { label: "Hiring · full-time", message: "Hi Jyotirmay,\n\nI'm reaching out about a full-time opportunity…" },
  { label: "Internship", message: "Hi Jyotirmay,\n\nI'd like to discuss an internship role…" },
  { label: "Collaboration", message: "Hi Jyotirmay,\n\nI have an idea I think we could build together…" },
  { label: "Just saying hi", message: "Hi Jyotirmay!" },
];

const MAX_CHARS = 800;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ChannelCard({
  channel,
  delay,
  copiedKey,
  onCopy,
}: {
  channel: Channel;
  delay: number;
  copiedKey: string | null;
  onCopy: (key: string, text: string) => void;
}) {
  const cardRef = useTilt<HTMLDivElement>({ max: 4 });
  const Icon = channel.icon;
  const copied = copiedKey === channel.copy?.key;

  return (
    <Reveal delay={delay} className="h-full">
      <div
        ref={cardRef}
        className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 transition-colors hover:border-[var(--accent)]"
      >
        {/* soft glow that blooms on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--accent-soft)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent-fill)] group-hover:text-white">
            <Icon className="h-5 w-5" aria-hidden />
          </span>

          {channel.copy ? (
            <button
              type="button"
              onClick={() => onCopy(channel.copy!.key, channel.copy!.text)}
              aria-live="polite"
              aria-label={`Copy ${channel.label}`}
              className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[12px] font-medium transition-all ${
                copied
                  ? "border-emerald-500/50 text-emerald-400"
                  : "border-[var(--border-strong)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          ) : (
            <ArrowUpRight
              className="h-4 w-4 text-[var(--text-faint)] opacity-0 transition-all group-hover:text-[var(--accent)] group-hover:opacity-100"
              aria-hidden
            />
          )}
        </div>

        <a
          href={channel.href}
          target={channel.href.startsWith("http") ? "_blank" : undefined}
          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="relative mt-5 block"
        >
          <h3 className="link-underline inline-flex items-center gap-1 font-display text-[15px] font-semibold text-[var(--text)]">
            {channel.label}
            {channel.copy ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-faint)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]" aria-hidden />
            ) : null}
          </h3>
          <p className="mt-1 break-all font-mono-tag text-[11px] leading-relaxed text-[var(--text-muted)]">
            {channel.value}
          </p>
        </a>
      </div>
    </Reveal>
  );
}

export function ContactPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [sent, setSent] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sendRef = useMagnetic<HTMLButtonElement>({ strength: 5 });

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1800);
    } catch {
      window.location.href = `mailto:${text}`;
    }
  };

  const patch = (field: "name" | "email" | "message", value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const applyTopic = (t: (typeof TOPICS)[number]) => {
    setTopic(t.label);
    // Prefill only when the textarea is empty so a draft is never clobbered.
    setForm((f) => (f.message.trim() ? f : { ...f, message: t.message }));
    textareaRef.current?.focus();
  };

  const nameValid = form.name.trim().length > 0;
  const emailValid = EMAIL_RE.test(form.email);
  const msgValid = form.message.trim().length > 0;
  const canSubmit = nameValid && emailValid && msgValid;
  const progress = Math.min(form.message.length / MAX_CHARS, 1);
  const nearLimit = form.message.length > MAX_CHARS * 0.9;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!canSubmit) return;
    const subject = encodeURIComponent(`[${topic ?? "Portfolio"}] Message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const showNameError = touched.name && !nameValid;
  const showEmailError = touched.email && !emailValid;
  const showMsgError = touched.message && !msgValid;

  return (
    <div className="section-pad section-band relative overflow-hidden">
      <Seo
        title="Contact Jyotirmay Khare — Full Stack Developer"
        description="Get in touch with Jyotirmay Khare, full stack developer. Reach out via email, WhatsApp, phone, GitHub or LinkedIn for hiring, internships and collaborations. Based in Jalandhar, Punjab, India."
        path="/contact"
      />
      {/* Ambient aurora + accent glow behind the whole page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 right-[-8%] h-[420px] w-[420px] rounded-full bg-[var(--accent-soft)] blur-[130px]" />
        <div className="absolute bottom-[-12%] left-[-10%] h-[380px] w-[380px] rounded-full bg-[#b28cdb]/10 blur-[130px]" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[520px] -translate-x-1/2 rounded-full bg-[#6fa8e8]/8 blur-[140px]" />
      </div>

      <Container className="max-w-4xl">
        {/* Header */}
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.025em] text-[var(--text)]">
            Let's build something <span className="text-gradient">real</span>.
          </h1>
        </Reveal>

        {/* Availability pulse */}
        <Reveal delay={0.04}>
          <div className="mt-6 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-[var(--text)]">Open to work & collaborations</span>
            <span className="font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
              · replies within ~24h (IST)
            </span>
          </div>
        </Reveal>

        {/* Intro + big email row */}
        <Reveal delay={0.06}>
          <p className="mt-8 max-w-2xl text-[length:var(--font-body-lg)] leading-[1.65] text-[var(--text-muted)]">
            The fastest route is email — copy it below, or start typing and your mail
            app does the rest.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="link-underline inline-flex flex-wrap items-center gap-3 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.02em] text-[var(--accent)]"
            >
              {site.email}
              <Send className="h-[0.85em] w-[0.85em]" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => copyText("email", site.email)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-all ${
                copiedKey === "email"
                  ? "border-emerald-500/50 text-emerald-400"
                  : "border-[var(--border-strong)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
              aria-live="polite"
            >
              {copiedKey === "email" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedKey === "email" ? "Copied!" : "Copy"}
            </button>
          </div>
        </Reveal>

        {/* Channel grid */}
        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((channel, i) => (
              <ChannelCard
                key={channel.label}
                channel={channel}
                delay={i * 0.05}
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            ))}
          </div>
        </Reveal>

        {/* Interactive form */}
        <Reveal delay={0.05}>
          <form onSubmit={handleSubmit} className="mt-16 border-t border-[var(--border)] pt-11" noValidate>
            <h2 className="text-[length:var(--font-h3)] font-semibold text-[var(--text)]">Send a message</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
              Pick a topic below to prefill a starter, then make it yours. It composes a
              draft in your own mail app — nothing is stored or sent without you.
            </p>

            {/* Topic chips — one-click prefill */}
            <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Message topic">
              <span className="mr-1 font-mono-tag text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                Topic:
              </span>
              {TOPICS.map((t) => {
                const active = topic === t.label;
                return (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => applyTopic(t)}
                    aria-pressed={active}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent-fill)] text-white shadow-[var(--shadow-1)]"
                        : "border-[var(--border-strong)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {active && <Check className="mr-1 inline h-3.5 w-3.5" aria-hidden />}
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-6">
              <label className="block">
                <span className="field-label">Name</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => patch("name", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  className="field-input-rounded"
                  placeholder="Your name"
                  aria-invalid={showNameError}
                />
                {showNameError && (
                  <span className="mt-1.5 block text-[12px] font-medium text-red-400">
                    Please tell me your name.
                  </span>
                )}
              </label>

              <label className="block">
                <span className="field-label">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => patch("email", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className="field-input-rounded"
                  placeholder="you@example.com"
                  aria-invalid={showEmailError}
                />
                {showEmailError && (
                  <span className="mt-1.5 block text-[12px] font-medium text-red-400">
                    That email doesn't look right.
                  </span>
                )}
              </label>
            </div>

            <label className="mt-8 block">
              <span className="flex items-baseline justify-between">
                <span className="field-label">Message</span>
                <span
                  className={`font-mono-tag text-[11px] ${nearLimit ? "text-[var(--accent)]" : "text-[var(--text-faint)]"}`}
                  aria-live="polite"
                >
                  {form.message.length}/{MAX_CHARS}
                </span>
              </span>
              <textarea
                ref={textareaRef}
                name="message"
                required
                rows={5}
                value={form.message}
                maxLength={MAX_CHARS}
                onChange={(e) => patch("message", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                className="field-input-rounded resize-y"
                placeholder="Tell me about the project or role…"
                aria-invalid={showMsgError}
              />
              {/* Live progress bar */}
              <span className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-[var(--border)]" aria-hidden="true">
                <span
                  className="block h-full rounded-full bg-[var(--accent)] transition-[width] duration-200"
                  style={{ width: `${progress * 100}%` }}
                />
              </span>
              {showMsgError && (
                <span className="mt-1.5 block text-[12px] font-medium text-red-400">
                  Don't leave me hanging — write a quick line.
                </span>
              )}
            </label>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                ref={sendRef}
                type="submit"
                disabled={!canSubmit || sent}
                className={`inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all ${
                  canSubmit && !sent
                    ? "bg-[var(--accent-fill)] text-white shadow-[var(--shadow-2)] hover:bg-[var(--accent-fill-hover)]"
                    : "cursor-not-allowed bg-[var(--surface)] text-[var(--text-faint)]"
                }`}
              >
                {sent ? "Opening your email app…" : canSubmit ? "Send message" : "Fill the form to send"}
                <Send className="h-4 w-4" aria-hidden />
              </button>
              {sent && (
                <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
                  <Check className="h-4 w-4" /> Draft ready in your mail app
                </span>
              )}
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-[var(--text-muted)]">
              This composes a message in your own email app — nothing is stored or sent
              without you.
            </p>
          </form>
        </Reveal>

        {/* Location + direct lines strip */}
        <Reveal delay={0.08}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--border)] pt-8">
            <p className="inline-flex items-center gap-2 font-mono-tag text-[12px] uppercase tracking-wider text-[var(--text-faint)]">
              <MapPin className="h-4 w-4" aria-hidden />
              Jalandhar, Punjab, India · IST (UTC+5:30) · remote-friendly
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${(site.phone ?? "+91-9685032985").replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-4 py-2 text-[13px] font-medium text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Phone className="h-4 w-4" aria-hidden /> Call
              </a>
              <a
                href="https://wa.me/919685032985"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-4 py-2 text-[13px] font-medium text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden /> WhatsApp
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-4 py-2 text-[13px] font-medium text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}