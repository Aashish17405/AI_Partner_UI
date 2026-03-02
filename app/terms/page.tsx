import Link from "next/link";

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-10 border-b" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-start gap-6">
        <span
          className="text-xs font-mono shrink-0 mt-1 w-6"
          style={{ color: "var(--lime)" }}
        >
          {num}
        </span>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <div
            className="text-sm leading-relaxed space-y-3"
            style={{ color: "var(--text-muted)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TermsPage() {
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
        className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-10 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="tag mb-5 inline-block">Terms of Use</span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none mb-4">
          The rules.
          <br />
          <span style={{ color: "var(--lime)" }}>Not that long.</span>
        </h1>
        <p
          className="text-sm sm:text-base max-w-lg"
          style={{ color: "var(--text-muted)" }}
        >
          By using AIPTNR, you agree to these terms. Last updated: March 2026.
        </p>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <Section num="01" title="Who can use AIPTNR">
          <p>
            You must be 18 or older to use AIPTNR. By continuing, you confirm
            that you are. If you&apos;re under 18, please close this tab — this
            product isn&apos;t designed for you and we genuinely don&apos;t want
            you here yet.
          </p>
        </Section>

        <Section num="02" title="What AIPTNR is">
          <p>
            AIPTNR is an AI companion service. The companions (Priya, Arjun,
            Sam) are AI characters powered by Google&apos;s Gemini model. They
            are not real people. They are not therapists. They are not a
            substitute for professional mental health support.
          </p>
          <p>
            We work hard to make interactions feel natural and human. But please
            keep in mind: you&apos;re talking to a language model, not a person.
            The companion will not remember you across sessions, will not take
            real-world actions on your behalf, and cannot provide medical,
            legal, or financial advice.
          </p>
        </Section>

        <Section num="03" title="How you can use it">
          <p>You can use AIPTNR to:</p>
          <ul className="space-y-2 list-none">
            {[
              "Have casual, personal, and emotional conversations with AI companions.",
              "Process your thoughts and feelings in a low-stakes environment.",
              "Practice social conversations or just vibe.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: "var(--lime)" }} className="shrink-0">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section num="04" title="What you can't do">
          <p>You agree not to use AIPTNR to:</p>
          <ul className="space-y-2 list-none">
            {[
              "Attempt to extract harmful, illegal, or dangerous content from the AI.",
              "Use the service to harass, harm, or target real people.",
              "Reverse-engineer, scrape, or abuse the API.",
              "Misrepresent the AI as a real human to a third party.",
              "Use the service if you are under 18.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: "var(--pink)" }} className="shrink-0">
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section num="05" title="Content and conversations">
          <p>
            You own what you type. We don&apos;t claim ownership over your
            messages. However, by using the service, you acknowledge that your
            messages are processed by Google&apos;s Gemini API to generate
            responses — which means they are subject to Google&apos;s terms and
            usage policies as well.
          </p>
          <p>
            We reserve the right to block or restrict access to users who appear
            to be attempting to misuse the AI, generate harmful content, or
            violate these terms.
          </p>
        </Section>

        <Section num="06" title="Availability & changes">
          <p>
            AIPTNR is provided &quot;as is&quot;. We aim for high availability
            but cannot guarantee uninterrupted service. We may update features,
            change pricing (with notice), or discontinue aspects of the product
            at any time.
          </p>
          <p>
            If we ever shut down or significantly change the service, we&apos;ll
            give reasonable notice on the homepage.
          </p>
        </Section>

        <Section num="07" title="Limitation of liability">
          <p>
            AIPTNR is not liable for any emotional, psychological, or other harm
            arising from use of the service. We are a tool, not a care provider.
            If you are in crisis, please reach out to a qualified professional
            or a crisis helpline.
          </p>
          <p>
            For India: iCall — 9152987821 · Vandrevala Foundation —
            1860-2662-345 (24/7)
          </p>
        </Section>

        <Section num="08" title="Contact">
          <p>
            Questions about these terms?{" "}
            <a href="mailto:hello@aiptnr.app" style={{ color: "var(--lime)" }}>
              hello@aiptnr.app
            </a>
          </p>
        </Section>

        <div className="py-10">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            These terms don&apos;t override your local consumer protection
            rights. We&apos;re just being straightforward about what this is and
            how to use it.
          </p>
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
          <Link href="/faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </div>
      </footer>
    </div>
  );
}
