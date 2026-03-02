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

export default function PrivacyPage() {
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
        <span className="tag mb-5 inline-block">Privacy Policy</span>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none mb-4">
          We don&apos;t
          <br />
          <span style={{ color: "var(--lime)" }}>sell you out.</span>
        </h1>
        <p
          className="text-sm sm:text-base max-w-lg"
          style={{ color: "var(--text-muted)" }}
        >
          Plain language privacy policy. Last updated: March 2026.
        </p>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <Section num="01" title="What we collect">
          <p>When you use AIPTNR, we collect the minimum possible:</p>
          <ul className="space-y-2 list-none">
            {[
              "The profile info you enter (name, age, interests, language preference) — to personalise your companion.",
              "Your conversation messages — to power the AI responses within your session.",
              "Your approximate location, only if you grant browser permission — so your companion can reference it naturally.",
              "A random session ID stored in your browser's localStorage — to resume your chat.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: "var(--lime)" }} className="shrink-0">
                  –
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            We do not collect your email, phone number, or any account
            credentials. There is no account.
          </p>
        </Section>

        <Section num="02" title="What we don't collect">
          <p>To be clear about what we deliberately avoid:</p>
          <ul className="space-y-2 list-none">
            {[
              "No tracking cookies or third-party analytics.",
              "No advertising identifiers.",
              "No device fingerprinting.",
              "No selling, renting, or sharing your data with advertisers.",
              "No reading or storing your conversations for purposes other than generating AI replies.",
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

        <Section num="03" title="How your data is used">
          <p>
            Your profile data and conversation messages are sent to
            Google&apos;s Gemini API to generate your companion&apos;s
            responses. This is the only third-party service that ever sees your
            content. Google&apos;s usage policies apply to data processed
            through their API.
          </p>
          <p>
            Session data is temporarily stored (with a 7-day expiry) so you can
            resume conversations. After that, it&apos;s gone. We do not build
            long-term profiles.
          </p>
        </Section>

        <Section num="04" title="Data storage & security">
          <p>
            Sessions are stored in Upstash Redis with a 7-day TTL. The session
            ID lives in your browser&apos;s localStorage — if you clear your
            browser storage, your session is gone and cannot be recovered.
          </p>
          <p>
            We use HTTPS everywhere. We do not store payment data because there
            is no payment.
          </p>
        </Section>

        <Section num="05" title="Children's privacy">
          <p>
            AIPTNR is intended for users 18 and older. We do not knowingly
            collect data from anyone under 18. If you believe a minor has used
            the service, contact us at{" "}
            <a href="mailto:hello@aiptnr.app" style={{ color: "var(--lime)" }}>
              hello@aiptnr.app
            </a>{" "}
            and we will delete the session.
          </p>
        </Section>

        <Section num="06" title="Your rights">
          <p>
            Since we don&apos;t have accounts, almost all data control is
            already in your hands — your session data is yours and tied to your
            browser. If you want your data deleted before the 7-day expiry,
            email us with your session ID (visible in the URL when chatting) and
            we&apos;ll remove it manually.
          </p>
        </Section>

        <Section num="07" title="Changes to this policy">
          <p>
            If we ever make meaningful changes to this policy, we&apos;ll note
            the updated date at the top and, if the changes are significant, put
            a notice on the homepage. We&apos;re not in the business of sneaky
            policy updates.
          </p>
        </Section>

        <div className="py-10">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Questions?{" "}
            <a
              href="mailto:hello@aiptnr.app"
              style={{ color: "var(--lime)" }}
              className="transition-colors"
            >
              hello@aiptnr.app
            </a>
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
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
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
