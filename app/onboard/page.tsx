"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient, Partner } from "@/lib/api";
import { saveSessionToLocalStorage } from "@/lib/utils";

export default function OnboardPage() {
  const router = useRouter();
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    age: "",
    language: "English",
    interests: "",
    personality: "balanced",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("partner");
    if (pid) {
      setPartnerId(pid);
      fetchPartnerDetails(pid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPartnerDetails = async (pid?: string) => {
    try {
      const partners = await apiClient.getPartners();
      const idToFind = pid ?? partnerId;
      const selected = partners.find((p) => p.id === idToFind);
      if (selected) setPartner(selected);
    } catch (error) {
      console.error("Failed to fetch partner:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || parseInt(formData.age) < 18)
      newErrors.age = "Must be 18 or older";
    if (!formData.interests.trim())
      newErrors.interests = "Please share your interests";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!partnerId) {
      setErrors({ submit: "Partner not selected" });
      return;
    }

    setLoading(true);
    try {
      const interests = formData.interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i.length > 0);
      const session = await apiClient.createSession(
        partnerId,
        formData.name,
        parseInt(formData.age),
        formData.language,
        interests,
        formData.nickname || undefined,
        formData.personality,
      );
      saveSessionToLocalStorage(session.id);
      router.push(`/chat/${session.id}`);
    } catch (error) {
      console.error("Failed to create session:", error);
      setErrors({ submit: "Failed to start chat. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const partnerEmoji = (type?: string) => {
    if (type === "girlfriend") return "👩‍🦰";
    if (type === "boyfriend") return "👨‍🦱";
    return "🤝";
  };

  const STEPS = ["You", "Preferences", "Interests"];

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
          <Link href="/partners">
            <button className="btn-ghost text-sm">← Change companion</button>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* ── STEP INDICATOR ────────────────────────────────── */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold border"
                style={{
                  borderColor:
                    step > i + 1
                      ? "var(--lime)"
                      : step === i + 1
                        ? "var(--text)"
                        : "var(--border)",
                  backgroundColor: step > i + 1 ? "var(--lime)" : "transparent",
                  color:
                    step > i + 1
                      ? "#000"
                      : step === i + 1
                        ? "var(--text)"
                        : "var(--text-muted)",
                }}
              >
                <span>{step > i + 1 ? "✓" : `0${i + 1}`}</span>
                <span className="hidden sm:inline uppercase tracking-wider">
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="w-6 h-px"
                  style={{
                    backgroundColor:
                      step > i + 1 ? "var(--lime)" : "var(--border)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── HEADER ────────────────────────────────────────── */}
        <div className="mb-10">
          {partner && (
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center border text-xl"
                style={{
                  borderColor: "var(--border-loud)",
                  backgroundColor: "var(--surface-2)",
                }}
              >
                {partnerEmoji(partner.id)}
              </div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Chatting with
                </p>
                <p className="font-bold" style={{ color: "var(--lime)" }}>
                  {partner.name}
                </p>
              </div>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {step === 1 && (
              <>
                Tell us
                <br />
                about <span style={{ color: "var(--lime)" }}>yourself</span>
              </>
            )}
            {step === 2 && (
              <>
                Set your
                <br />
                <span style={{ color: "var(--lime)" }}>preferences</span>
              </>
            )}
            {step === 3 && (
              <>
                What are your
                <br />
                <span style={{ color: "var(--lime)" }}>interests?</span>
              </>
            )}
          </h1>
        </div>

        {/* ── FORM ──────────────────────────────────────────── */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Your name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="input-field"
                />
                {errors.name && (
                  <p
                    className="text-xs mt-1.5 font-medium"
                    style={{ color: "var(--pink)" }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Nickname{" "}
                  <span className="opacity-60 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  placeholder="What should they call you?"
                  className="input-field"
                />
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Must be 18+"
                  className="input-field"
                />
                {errors.age && (
                  <p
                    className="text-xs mt-1.5 font-medium"
                    style={{ color: "var(--pink)" }}
                  >
                    {errors.age}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-primary w-full mt-4 py-4"
              >
                Next →
              </button>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="input-field appearance-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Personality vibe
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "balanced", label: "Balanced" },
                    { value: "funny", label: "Funny & playful" },
                    { value: "serious", label: "Serious & deep" },
                    { value: "caring", label: "Caring & supportive" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, personality: opt.value }))
                      }
                      className="py-3 px-4 text-sm font-semibold border-2 text-left transition-all duration-100"
                      style={{
                        borderColor:
                          formData.personality === opt.value
                            ? "var(--lime)"
                            : "var(--border-loud)",
                        backgroundColor:
                          formData.personality === opt.value
                            ? "var(--lime)"
                            : "var(--surface)",
                        color:
                          formData.personality === opt.value
                            ? "#000"
                            : "var(--text)",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline flex-1 py-4"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary flex-1 py-4"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Your interests *
                </label>
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="e.g., gaming, music, traveling, reading, fitness…"
                  rows={4}
                  className="input-field resize-none"
                />
                <p
                  className="text-xs mt-1.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Separate with commas for better personalization
                </p>
                {errors.interests && (
                  <p
                    className="text-xs mt-1 font-medium"
                    style={{ color: "var(--pink)" }}
                  >
                    {errors.interests}
                  </p>
                )}
              </div>

              {errors.submit && (
                <div
                  className="p-4 border text-sm font-medium"
                  style={{
                    borderColor: "var(--pink)",
                    color: "var(--pink)",
                    backgroundColor: "rgba(255,45,107,0.06)",
                  }}
                >
                  {errors.submit}
                </div>
              )}

              <div
                className="p-4 border text-sm"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                  color: "var(--text-muted)",
                }}
              >
                Your info is used only to personalize your chat. We never share
                it.
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-outline flex-1 py-4"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 py-4"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent animate-spin-slow" />
                      Starting…
                    </span>
                  ) : (
                    "Start chatting →"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
