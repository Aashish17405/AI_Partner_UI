"use client";

// Stagger delays that create a symmetric wave: bar 1 → 2 → 3 → 4 → 3 → 2 → 1
const BAR_DELAYS = ["0s", "0.15s", "0.3s", "0.15s"];
const DOT_DELAYS = ["0s", "0.2s", "0.4s"];

/* ──────────────────────────────────────────
   Equalizer bar cluster (lime) — page/section loaders
   ────────────────────────────────────────── */
function EqualizerBars() {
  return (
    <div className="flex items-end gap-[4px]">
      {BAR_DELAYS.map((delay, i) => (
        <span
          key={i}
          className="loader-bar"
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────
   Equalizer bar cluster (muted) — inline loaders
   ────────────────────────────────────────── */
function EqualizerBarsMuted() {
  return (
    <div className="flex items-end gap-[3px]">
      {BAR_DELAYS.map((delay, i) => (
        <span
          key={i}
          className="loader-bar-muted"
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────
   Full-screen page loader
   Used when navigating to a new page or loading initial data
   ────────────────────────────────────────── */
export function PageLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <EqualizerBars />
      <p
        className="text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────
   Inline section loader (e.g. partner grid loading)
   ────────────────────────────────────────── */
export function InlineLoader({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 py-20">
      <EqualizerBarsMuted />
      {label && (
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────
   Three pulsing dots for send-button / form submit
   Inherits the button's current text color
   ────────────────────────────────────────── */
export function ButtonDots() {
  return (
    <span className="flex items-center gap-[4px]">
      {DOT_DELAYS.map((delay, i) => (
        <span
          key={i}
          className="loader-dot-sm"
          style={{ animationDelay: delay }}
        />
      ))}
    </span>
  );
}

/* ──────────────────────────────────────────
   AI "typing…" bubble — drop into the message list
   when the AI is generating a response
   ────────────────────────────────────────── */
export function TypingBubble({
  partnerType = "bestfriend",
}: {
  partnerType?: string;
}) {
  const avatar =
    partnerType === "girlfriend"
      ? "👩‍🦰"
      : partnerType === "boyfriend"
        ? "👨‍🦱"
        : "🤝";

  return (
    <div className="flex gap-3 py-2 justify-start animate-fade-in">
      {/* avatar */}
      <div
        className="shrink-0 w-8 h-8 flex items-center justify-center border text-sm self-end"
        style={{
          borderColor: "var(--border-loud)",
          backgroundColor: "var(--surface-2)",
        }}
      >
        {avatar}
      </div>

      {/* bubble */}
      <div
        className="flex items-center px-4 py-3"
        style={{
          backgroundColor: "var(--surface-2)",
          borderLeft: "2px solid var(--border-loud)",
          color: "var(--text-muted)",
        }}
      >
        <span className="flex items-center gap-[5px]">
          {DOT_DELAYS.map((delay, i) => (
            <span
              key={i}
              className="loader-dot"
              style={{ animationDelay: delay }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
