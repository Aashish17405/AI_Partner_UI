"use client";

import { useState } from "react";
import Link from "next/link";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this actually free?",
    a: "Yes. No credit card, no trial, no hidden paywall. You create a session, pick a companion, and start chatting. That's it. We may add optional premium features in the future but the core experience stays free.",
  },
  {
    q: "Is AIPTNR an AI?",
    a: "Technically yes — it's powered by Google Gemini under the hood. But the companions are designed to feel like real people texting you, not like a chatbot you're querying. Priya will have opinions on your life choices. Arjun will notice when you sound off. Sam will roast you. That's intentional.",
  },
  {
    q: "Are my conversations private?",
    a: "Yes. Your conversations are tied to a session ID stored in your browser. We don't link them to your identity, we don't read them, and we definitely don't sell them. Sessions expire after 7 days of inactivity. Go touch grass sometimes.",
  },
  {
    q: "Can I have multiple companions?",
    a: "You can start a new session with any companion any time. Active sessions are saved in your browser so you can pick up where you left off. Want to switch from Priya to Sam? Go to Partners and start fresh.",
  },
  {
    q: "What languages does AIPTNR support?",
    a: "English, Hindi, and Telugu right now. You pick your language when you set up your session and your companion will match your vibe — Hinglish, Telugu slang, code-switching mid-sentence, all of it.",
  },
  {
    q: "Does the companion remember past conversations?",
    a: "Within a single session, yes — your companion remembers everything you've told them and will reference it naturally. Across fresh sessions, that context resets. We're not storing a permanent profile of you.",
  },
  {
    q: "What is the companion actually good for?",
    a: "Venting without consequences. Processing something difficult before talking to a real person. Having someone to talk to at 2am. Practicing a hard conversation. Or just... having someone to chat with when you don't feel like dealing with people. No judgment on any of those.",
  },
  {
    q: "Is this a replacement for therapy or real relationships?",
    a: "No, and we'd never claim that. AIPTNR is a companion, not a therapist, not a substitute for human connection. If you're going through something serious, please reach out to someone qualified. We're just here to make the in-between moments a little less lonely.",
  },
  {
    q: "Why does it sometimes get slow or return an error?",
    a: "We run on Google's Gemini API, which occasionally rate-limits requests during peak usage. If you see a 429 error, wait a moment and try again — it's not you, it's just traffic. The free tier has limits we're working within.",
  },
  {
    q: "Can I suggest a new companion type?",
    a: "Yes please. Email us at hello@aiptnr.app with your idea. We're a small team and we genuinely read those.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen dot-grid"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <span
              className="font-extrabold tracking-tight text-lg cursor-pointer"
              style={{ color: "var(--lime)" }}
            >
              AIPTNR
            </span>
          </Link>
          <Link href="/">
            <button className="btn-ghost text-sm">← Back</button>
          </Link>
        </div>
      </nav>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="animate-fade-in">
          <span className="tag mb-5 inline-block">FAQ</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none mb-4">
            Questions
            <br />
            <span style={{ color: "var(--lime)" }}>answered.</span>
          </h1>
          <p
            className="text-sm sm:text-base max-w-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Everything you were going to ask before you actually tried it.
          </p>
        </div>
      </section>

      {/* ── ACCORDION ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-px">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="border"
                style={{
                  borderColor: isOpen ? "var(--lime)" : "var(--border)",
                  backgroundColor: isOpen ? "var(--surface)" : "var(--surface)",
                  transition: "border-color 150ms",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="font-bold text-sm sm:text-base">
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 w-6 h-6 flex items-center justify-center border-2 font-bold text-sm transition-transform duration-200"
                    style={{
                      borderColor: isOpen
                        ? "var(--lime)"
                        : "var(--border-loud)",
                      color: isOpen ? "var(--lime)" : "var(--text-muted)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    className="px-6 pb-6 text-sm leading-relaxed animate-fade-in"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── STILL LOST ───────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-2">
              Still have questions?
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              We're literally just humans. Email us.
            </p>
          </div>
          <a href="mailto:hello@aiptnr.app">
            <button className="btn-primary py-3 px-8 text-sm">
              hello@aiptnr.app →
            </button>
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <hr style={{ borderColor: "var(--border)" }} />
      <footer
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        <p>© 2026 AIPTNR. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </div>
      </footer>
    </div>
  );
}
