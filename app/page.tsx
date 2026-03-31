"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient, Partner } from "@/lib/api";
import { InlineLoader } from "@/components/Loader";

export default function HomePage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const data = await apiClient.getPartners();
      setPartners(data);
    } catch (error) {
      console.error("Failed to fetch partners:", error);
    } finally {
      setLoading(false);
    }
  };

  const partnerEmoji = (type?: string) => {
    if (type === "girlfriend") return "👩‍🦰";
    if (type === "boyfriend") return "👨‍🦱";
    return "🤝";
  };

  return (
    <div
      className="min-h-screen dot-grid"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span
            className="font-extrabold tracking-tight text-lg"
            style={{ color: "var(--lime)" }}
          >
            AIPTNR
          </span>
          <div className="flex items-center gap-1">
            <Link href="/about">
              <button className="btn-ghost text-sm hidden sm:flex">
                About
              </button>
            </Link>
            <Link href="/faq">
              <button className="btn-ghost text-sm hidden sm:flex">FAQ</button>
            </Link>
            <Link href="/chats">
              <button className="btn-ghost text-sm hidden sm:flex">
                Previous Chats
              </button>
            </Link>
            <Link href="/chats?next=%2Fpartners">
              <button className="btn-primary text-xs py-2 px-4 ml-2">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="animate-fade-in">
          {/* kicker label */}
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="tag">New</span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              v2 — now with 3 companion types
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-none tracking-tighter mb-6 max-w-5xl">
            YOUR AI
            <br />
            <span style={{ color: "var(--lime)" }}>COMPANION</span>
            <br />
            AWAITS.
          </h1>

          <p
            className="text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Meet your ideal AI companion — girlfriend, boyfriend, or best
            friend. Real conversations, zero judgment, available 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/chats?next=%2Fpartners">
              <button className="btn-primary w-full sm:w-auto text-sm py-3 px-8">
                Start chatting →
              </button>
            </Link>
            <Link href="/chats">
              <button className="btn-outline w-full sm:w-auto text-sm py-3 px-8">
                Continue chats
              </button>
            </Link>
            <Link href="/about">
              <button className="btn-outline w-full sm:w-auto text-sm py-3 px-8">
                Learn more
              </button>
            </Link>
          </div>
        </div>

        {/* stat strip */}
        <div
          className="grid grid-cols-3 sm:grid-cols-3 border-t mt-20 pt-8"
          style={{ borderColor: "var(--border)" }}
        >
          {[
            { num: "24/7", label: "Always on" },
            { num: "3", label: "Companion types" },
            { num: "∞", label: "Conversations" },
          ].map((s, i) => (
            <div
              key={i}
              className={`pr-8 ${i > 0 ? "pl-8 border-l" : ""}`}
              style={{ borderColor: "var(--border)" }}
            >
              <p
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ color: "var(--lime)" }}
              >
                {s.num}
              </p>
              <p
                className="text-xs sm:text-sm mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <hr style={{ borderColor: "var(--border)" }} />

      {/* PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Choose your
            <br />
            <span style={{ color: "var(--lime)" }}>companion</span>
          </h2>
          <Link href="/chats?next=%2Fpartners">
            <button className="btn-ghost text-sm self-start sm:self-auto">
              View all →
            </button>
          </Link>
        </div>

        {loading ? (
          <InlineLoader label="Loading companions..." />
        ) : (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: "var(--border)" }}
          >
            {partners.map((partner, i) => (
              <div
                key={partner.id}
                className="group relative flex flex-col justify-between p-8 transition-colors duration-200 cursor-pointer"
                style={{ backgroundColor: "var(--surface)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--surface-2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--surface)")
                }
              >
                {/* number */}
                <span
                  className="text-xs font-mono mb-8"
                  style={{ color: "var(--text-muted)" }}
                >
                  0{i + 1}
                </span>

                {/* avatar */}
                <div className="text-5xl mb-6 select-none">
                  {partnerEmoji(partner.id)}
                </div>

                {/* info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{partner.name}</h3>
                  <span className="tag-outline mb-4 block w-max">
                    {partner.id?.replace("_", " ")}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {partner.description}
                  </p>
                </div>

                <Link href={`/partners?selected=${partner.id}`}>
                  <button className="btn-primary w-full mt-8 text-xs py-3">
                    Choose {partner.name}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-12">
          Why AIPTNR
          <br />
          <span style={{ color: "var(--lime)" }}>hits different</span>
        </h2>

        <div
          className="grid sm:grid-cols-3 gap-px"
          style={{ backgroundColor: "var(--border)" }}
        >
          {[
            {
              num: "01",
              icon: "💬",
              title: "Real conversations",
              desc: "Deeply personal chats tailored to your personality and interests — not generic responses.",
            },
            {
              num: "02",
              icon: "⚡",
              title: "Always available",
              desc: "No waiting, no offline. Your companion is there when you need to talk, vent, or just vibe.",
            },
            {
              num: "03",
              icon: "🎭",
              title: "Custom personalities",
              desc: "Funny, serious, caring — pick a personality that matches your energy.",
            },
          ].map((f) => (
            <div
              key={f.num}
              className="p-8 flex flex-col gap-4"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <span
                className="text-xs font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                {f.num}
              </span>
              <div className="text-3xl">{f.icon}</div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-md">
          Ready to find your
          <br />
          <span style={{ color: "var(--lime)" }}>person?</span>
        </h2>
        <Link href="/chats?next=%2Fpartners">
          <button className="btn-primary py-4 px-10 text-base">
            Start for free →
          </button>
        </Link>
      </section>

      <hr style={{ borderColor: "var(--border)" }} />

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mb-10">
          <span
            className="font-extrabold text-xl tracking-tight"
            style={{ color: "var(--lime)" }}
          >
            AIPTNR
          </span>
          <div
            className="grid grid-cols-2 sm:flex sm:gap-10 gap-4 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {(
              [
                { label: "Features", href: "/#features" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ] as { label: string; href: string }[]
            ).map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs border-t pt-6"
          style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
        >
          <p>© 2026 AIPTNR. All rights reserved.</p>
          <p>Built for the generation that keeps it real.</p>
        </div>
      </footer>
    </div>
  );
}
