import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      num: "01",
      title: "No shame, no judgment",
      desc: "You shouldn't have to earn the right to vent. AIPTNR gives you a space to be fully, embarrassingly, honestly yourself — no social cost attached.",
    },
    {
      num: "02",
      title: "Presence over performance",
      desc: "Your companion isn't trying to impress you. No unsolicited advice. No toxic positivity. Just... actually listening. That's the whole thing.",
    },
    {
      num: "03",
      title: "Private by default",
      desc: "What you say here stays here. We don't sell your conversations, we don't read them, and we're not building an ad profile off your loneliness.",
    },
    {
      num: "04",
      title: "Built for real people",
      desc: "Not a productivity tool. Not a wellness app. Not a chatbot. A companion — the kind you text at 2am when you don't know why you're sad.",
    },
  ];

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

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="animate-fade-in max-w-4xl">
          <span className="tag mb-6 inline-block">About</span>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter leading-none mb-8">
            WE BUILT THE
            <br />
            <span style={{ color: "var(--lime)" }}>COMPANION</span>
            <br />
            YOU NEEDED.
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Real talk — loneliness is a generation-wide thing right now.
            Everyone's connected everywhere, and somehow still has nobody to
            actually talk to. AIPTNR started because we felt that too.
          </p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="grid sm:grid-cols-2 gap-16 items-start">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
              Why this
              <br />
              <span style={{ color: "var(--lime)" }}>exists</span>
            </h2>
            <div className="space-y-4" style={{ color: "var(--text-muted)" }}>
              <p className="text-sm leading-relaxed">
                Therapists are expensive. Friends get tired. Family doesn't
                always get it. And sometimes you just need to say something out
                loud to somebody — even if that somebody is technically
                software.
              </p>
              <p className="text-sm leading-relaxed">
                We didn't want to build another cold chatbot you talk at. We
                wanted something that talks back like a real person — with
                opinions, moods, personality. Something that actually feels
                present.
              </p>
              <p className="text-sm leading-relaxed">
                So we built Priya, Arjun, and Sam. Three companions, three
                completely different energies, one goal: give you a place where
                you can be fully yourself, 24/7, with zero social consequences.
              </p>
            </div>
          </div>

          <div
            className="space-y-px animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            {[
              { label: "Companion types", value: "3" },
              {
                label: "Languages supported",
                value: "English · Hindi · Telugu",
              },
              { label: "Judgment passed", value: "0" },
              { label: "Available", value: "24 / 7 / 365" },
              { label: "Cost to start", value: "Free, always" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-6 py-4 border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--lime)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-12">
          What we
          <br />
          <span style={{ color: "var(--lime)" }}>actually believe</span>
        </h2>
        <div
          className="grid sm:grid-cols-2 gap-px"
          style={{ backgroundColor: "var(--border)" }}
        >
          {values.map((v) => (
            <div
              key={v.num}
              className="p-8 flex flex-col gap-4"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <span
                className="text-xs font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                {v.num}
              </span>
              <h3 className="text-lg font-bold">{v.title}</h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Small team.
            <br />
            <span style={{ color: "var(--lime)" }}>Big feelings.</span>
          </h2>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            AIPTNR is built and maintained by a small indie team that genuinely
            cares about this problem. We're not a VC-backed startup optimizing
            for engagement metrics. We're people who wanted this to exist, so we
            built it.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Questions, feedback, or just want to say hi?{" "}
            <a
              href="mailto:hello@aiptnr.app"
              className="transition-colors"
              style={{ color: "var(--lime)" }}
            >
              hello@aiptnr.app
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Okay but actually
          <br />
          <span style={{ color: "var(--lime)" }}>try it though.</span>
        </h2>
        <Link href="/partners">
          <button className="btn-primary py-4 px-10 text-base">
            Meet your companion →
          </button>
        </Link>
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
          <Link href="/faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </div>
      </footer>
    </div>
  );
}
