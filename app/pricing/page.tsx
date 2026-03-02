import Link from "next/link";

const freeFeatures = [
  "All 3 companions — Priya, Arjun, Sam",
  "Unlimited messages per session",
  "Full personality customisation",
  "English, Hindi & Telugu support",
  "Real-time Google Search grounding",
  "Conversation history per session",
  "Custom nickname & interests",
  "No account required",
  "No ads. Ever.",
];

const comingSoon = [
  "Persistent memory across sessions",
  "Voice messages",
  "Multiple active sessions",
  "More companion types",
  "Relationship timeline & milestones",
  "Custom companion personality builder",
];

export default function PricingPage() {
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
          <span className="tag mb-5 inline-block">Pricing</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none mb-4">
            It&apos;s free.
            <br />
            <span style={{ color: "var(--lime)" }}>Actually free.</span>
          </h1>
          <p
            className="text-sm sm:text-base max-w-lg"
            style={{ color: "var(--text-muted)" }}
          >
            No credit card. No trial period. No "free tier with asterisks". Just
            open it and go.
          </p>
        </div>
      </section>

      {/* ── PLANS ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
          {/* Free card */}
          <div
            className="border-2 p-8 flex flex-col animate-fade-in"
            style={{
              borderColor: "var(--lime)",
              backgroundColor: "var(--surface)",
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="tag mb-3 inline-block">Current plan</span>
                <h2 className="text-2xl font-extrabold tracking-tight">Free</h2>
              </div>
              <div className="text-right">
                <p
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ color: "var(--lime)" }}
                >
                  ₹0
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  forever
                </p>
              </div>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <span
                    className="shrink-0 font-bold mt-0.5"
                    style={{ color: "var(--lime)" }}
                  >
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/partners">
              <button className="btn-primary w-full py-4 text-sm">
                Start now, no signup →
              </button>
            </Link>
          </div>

          {/* Pro card */}
          <div
            className="border-2 p-8 flex flex-col animate-fade-in delay-100"
            style={{
              borderColor: "var(--border-loud)",
              backgroundColor: "var(--surface)",
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="tag-outline mb-3 inline-block">
                  Coming soon
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight">Pro</h2>
              </div>
              <div className="text-right">
                <p
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ color: "var(--text-muted)" }}
                >
                  ?
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  / month
                </p>
              </div>
            </div>

            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Everything in Free, plus things we&apos;re still building:
            </p>

            <ul className="space-y-3 flex-1 mb-8">
              {comingSoon.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="shrink-0 mt-0.5">○</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="btn-outline w-full py-4 text-sm opacity-40 cursor-not-allowed"
            >
              Not yet — we&apos;ll tell you when
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ NUDGE ────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-2">
              Wait, there&apos;s a catch right?
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Genuinely no. But we have an FAQ if you need convincing.
            </p>
          </div>
          <Link href="/faq">
            <button className="btn-outline py-3 px-8 text-sm">
              Read the FAQ →
            </button>
          </Link>
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
