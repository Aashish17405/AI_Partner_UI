"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient, Partner } from "@/lib/api";
import { InlineLoader } from "@/components/Loader";

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selected = params.get("selected");
    if (selected) setSelectedId(selected);
    fetchPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleSelectPartner = (partnerId: string) => {
    router.push(`/onboard?partner=${partnerId}`);
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
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <span
              className="font-extrabold tracking-tight text-lg"
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

      {/* ── HEADER ──────────────────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="tag mb-4 inline-block">Step 1 of 3</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none mb-4">
          Pick your
          <br />
          <span style={{ color: "var(--lime)" }}>companion</span>
        </h1>
        <p
          className="text-sm sm:text-base max-w-lg"
          style={{ color: "var(--text-muted)" }}
        >
          Choose who you want to vibe with. You can always switch later.
        </p>
      </div>

      {/* ── PARTNER GRID ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <InlineLoader label="Loading companions…" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner, i) => {
              const isSelected = selectedId === partner.id;
              return (
                <button
                  key={partner.id}
                  onClick={() => setSelectedId(partner.id)}
                  className="group text-left flex flex-col p-6 border-2 transition-all duration-150 w-full"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--lime)"
                      : "var(--surface)",
                    borderColor: isSelected
                      ? "var(--lime)"
                      : "var(--border-loud)",
                    color: isSelected ? "#000" : "var(--text)",
                  }}
                >
                  {/* top row */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-xs font-mono opacity-60">
                      0{i + 1}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-bold px-2 py-0.5 border-2 border-current">
                        SELECTED
                      </span>
                    )}
                  </div>

                  {/* avatar */}
                  <div className="text-5xl mb-5 select-none">
                    {partnerEmoji(partner.id)}
                  </div>

                  {/* info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-extrabold mb-1">
                      {partner.name}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-widest mb-3 block opacity-60">
                      {partner.id?.replace("_", " ")}
                    </span>
                    <p className="text-sm leading-relaxed opacity-70">
                      {partner.description}
                    </p>
                  </div>

                  {/* tagline */}
                  <div
                    className="mt-4 p-3 border text-xs"
                    style={{
                      borderColor: isSelected
                        ? "rgba(0,0,0,0.2)"
                        : "var(--border)",
                      backgroundColor: isSelected
                        ? "rgba(0,0,0,0.08)"
                        : "var(--surface-2)",
                    }}
                  >
                    <span className="font-bold uppercase tracking-wider text-xs opacity-50">
                      Tagline
                    </span>
                    <p className="mt-1 font-medium">{partner.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────── */}
      {selectedId && (
        <div
          className="sticky bottom-0 border-t z-40 animate-slide-in-right"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {partners.find((p) => p.id === selectedId)?.name} selected — ready
              to go?
            </p>
            <button
              onClick={() => handleSelectPartner(selectedId)}
              className="btn-primary text-sm py-3 px-8 sm:w-auto w-full"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── COMPANION TRAITS INFO ───────────────────────────── */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-10">
          What each companion
          <br />
          <span style={{ color: "var(--lime)" }}>brings to the table</span>
        </h2>
        <div
          className="grid sm:grid-cols-3 gap-px"
          style={{ backgroundColor: "var(--border)" }}
        >
          {[
            {
              title: "Girlfriend",
              emoji: "💕",
              traits: [
                "Caring & romantic",
                "Supportive listener",
                "Sweet check-ins",
              ],
            },
            {
              title: "Boyfriend",
              emoji: "💪",
              traits: [
                "Fun & adventurous",
                "Hyping you up",
                "Loyal & protective",
              ],
            },
            {
              title: "Best friend",
              emoji: "🤝",
              traits: [
                "Brutally honest",
                "Zero judgment zone",
                "Hilarious banter",
              ],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-8"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="font-bold text-lg mb-4">{item.title}</h3>
              <ul className="space-y-2">
                {item.traits.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: "var(--lime)" }}>—</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
