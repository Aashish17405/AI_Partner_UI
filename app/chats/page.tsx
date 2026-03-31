"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import {
  clearSession,
  getStoredSession,
  signInWithPassword,
  signOut,
  signUpWithPassword,
  startOAuthSignIn,
} from "@/lib/auth";
import {
  clearSessionFromLocalStorage,
  formatDate,
  getSessionFromLocalStorage,
  removeSessionFromHistory,
  saveSessionToLocalStorage,
} from "@/lib/utils";

type SessionCard = {
  id: string;
  partnerId: string;
  partnerName: string;
  userName: string;
  createdAt: string;
  lastActive?: string;
  messageCount?: number;
};

export default function ChatsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [nextPath, setNextPath] = useState("");

  const currentSessionId = useMemo(() => getSessionFromLocalStorage(), []);
  const shouldJumpAfterAuth =
    nextPath.startsWith("/") && nextPath !== "/chats" && nextPath.length > 1;

  const totalMessages = useMemo(
    () =>
      sessions.reduce((sum, session) => sum + (session.messageCount || 0), 0),
    [sessions],
  );

  const recentSessions = useMemo(
    () =>
      [...sessions]
        .sort((a, b) => {
          const aTime = new Date(a.lastActive || a.createdAt).getTime();
          const bTime = new Date(b.lastActive || b.createdAt).getTime();
          return bTime - aTime;
        })
        .slice(0, 4),
    [sessions],
  );

  const loadSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await apiClient.listSessions();
      const mapped: SessionCard[] = rows.map((row) => ({
        id: row.id,
        partnerId: row.partner_id,
        partnerName: row.partner_name,
        userName: row.user_name,
        createdAt: row.created_at,
        lastActive: row.last_active,
        messageCount: row.message_count,
      }));
      setSessions(mapped);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load chats.";
      if (message.includes("401")) {
        clearSession();
        setIsAuthed(false);
        setError(null);
      } else {
        setError("Some chats could not be loaded. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawNextPath = params.get("next") || "";
    const safeNextPath =
      rawNextPath.startsWith("/") && !rawNextPath.startsWith("//")
        ? rawNextPath
        : "";
    setNextPath(safeNextPath);

    const session = getStoredSession();
    setIsAuthed(Boolean(session?.access_token));
    if (
      session?.access_token &&
      safeNextPath.startsWith("/") &&
      safeNextPath !== "/chats"
    ) {
      router.replace(safeNextPath);
      return;
    }
    if (session?.access_token) {
      loadSessions();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const partnerEmoji = (type?: string) => {
    if (type === "girlfriend") return "👩";
    if (type === "boyfriend") return "👨";
    return "🤝";
  };

  const handleResume = (id: string) => {
    saveSessionToLocalStorage(id);
    router.push(`/chat/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this chat session permanently?")) return;
    setBusyId(id);
    try {
      await apiClient.deleteSession(id);
    } catch {
      // Continue local cleanup even if backend session is already gone.
    } finally {
      removeSessionFromHistory(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      setBusyId(null);
    }
  };

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    try {
      if (authMode === "signin") {
        await signInWithPassword(email.trim(), password);
      } else {
        const session = await signUpWithPassword(email.trim(), password);
        if (!session) {
          setAuthError(
            "Check your email to verify your account, then sign in.",
          );
          setAuthBusy(false);
          return;
        }
      }
      setIsAuthed(true);
      if (shouldJumpAfterAuth) {
        router.replace(nextPath);
        return;
      }
      await loadSessions();
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Authentication failed.",
      );
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    clearSessionFromLocalStorage();
    setSessions([]);
    setIsAuthed(false);
  };

  return (
    <div
      className="min-h-screen dot-grid"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <span
              className="font-extrabold tracking-tight text-lg"
              style={{ color: "var(--lime)" }}
            >
              AIPTNR
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {isAuthed && (
              <button onClick={handleSignOut} className="btn-ghost text-sm">
                Logout
              </button>
            )}
            <Link href="/partners">
              <button className="btn-primary text-xs py-2 px-4">
                New Chat
              </button>
            </Link>
            <Link href="/">
              <button className="btn-ghost text-sm">Home</button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px] gap-6 lg:gap-6 items-start">
          <section>
            <div className="mb-10">
              <span className="tag mb-4 inline-block">Continue</span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none mb-4">
                Previous
                <br />
                <span style={{ color: "var(--lime)" }}>chats</span>
              </h1>
              <p
                className="text-sm sm:text-base"
                style={{ color: "var(--text-muted)" }}
              >
                {shouldJumpAfterAuth
                  ? "Sign in to continue your setup."
                  : "Sign in to access your saved conversations across devices."}
              </p>
            </div>

            {!isAuthed ? (
              <div className="card-loud max-w-xl">
                <h2 className="text-xl font-extrabold mb-2">Login required</h2>
                <p
                  className="text-sm mb-5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Use Google, or email and password.
                </p>

                <div className=" mb-4">
                  <button
                    onClick={() =>
                      startOAuthSignIn("google", nextPath || "/chats")
                    }
                    className="btn-outline text-sm py-3 w-full flex items-center justify-center gap-2"
                  >
                    {shouldJumpAfterAuth
                      ? "Continue setup with Google"
                      : "Continue with Google"}
                  </button>
                </div>

                <div
                  className="flex items-center gap-2 text-xs mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span
                    className="h-px flex-1"
                    style={{ backgroundColor: "var(--border)" }}
                  />
                  <span>or</span>
                  <span
                    className="h-px flex-1"
                    style={{ backgroundColor: "var(--border)" }}
                  />
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="Password"
                    minLength={6}
                    required
                  />
                  {authError && (
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--pink)" }}
                    >
                      {authError}
                    </p>
                  )}
                  <button
                    disabled={authBusy}
                    className="btn-primary text-sm py-3 w-full"
                    type="submit"
                  >
                    {authBusy
                      ? "Please wait..."
                      : authMode === "signin"
                        ? "Sign in"
                        : "Create account"}
                  </button>
                </form>

                <button
                  type="button"
                  className="btn-ghost text-sm mt-2"
                  onClick={() => {
                    setAuthMode((prev) =>
                      prev === "signin" ? "signup" : "signin",
                    );
                    setAuthError(null);
                  }}
                >
                  {authMode === "signin"
                    ? "Need an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            ) : (
              <>
                {error && (
                  <div
                    className="mb-6 px-4 py-3 text-sm font-medium border"
                    style={{
                      borderColor: "var(--pink)",
                      color: "var(--pink)",
                      backgroundColor: "rgba(255,45,107,0.05)",
                    }}
                  >
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="card">
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Loading your saved chats...
                    </p>
                  </div>
                ) : sessions.length === 0 ? (
                  <div className="card-loud">
                    <h2 className="text-xl font-extrabold mb-2">
                      No previous chats found
                    </h2>
                    <p
                      className="text-sm mb-5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Start a new conversation and it will appear here.
                    </p>
                    <Link href="/partners">
                      <button className="btn-primary text-sm">
                        Start New Chat
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl" aria-hidden="true">
                              {partnerEmoji(session.partnerId)}
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold truncate">
                                {session.partnerName}
                              </p>
                              <p
                                className="text-xs uppercase tracking-wider"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {session.partnerId.replace("_", " ")}
                              </p>
                            </div>
                            {session.id === currentSessionId && (
                              <span className="tag-outline">Current</span>
                            )}
                          </div>

                          <p
                            className="text-sm"
                            style={{ color: "var(--text-muted)" }}
                          >
                            With {session.userName}
                            {session.messageCount !== undefined
                              ? ` • ${session.messageCount} messages`
                              : ""}
                          </p>
                          <p
                            className="text-xs mt-1"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Last active{" "}
                            {formatDate(
                              session.lastActive || session.createdAt,
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleResume(session.id)}
                            className="btn-primary text-xs py-2 px-4"
                            disabled={busyId === session.id}
                          >
                            Continue
                          </button>
                          <button
                            onClick={() => handleDelete(session.id)}
                            className="btn-outline text-xs py-2 px-4"
                            disabled={busyId === session.id}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>

          <aside className="lg:sticky lg:top-20 space-y-4">
            <div className="card-loud">
              <p
                className="text-xs uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Workspace
              </p>
              <div
                className="grid grid-cols-2 gap-px"
                style={{ backgroundColor: "var(--border)" }}
              >
                <div
                  className="p-3"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  <p
                    className="text-lg font-extrabold"
                    style={{ color: "var(--lime)" }}
                  >
                    {isAuthed && !loading ? sessions.length : "--"}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Sessions
                  </p>
                </div>
                <div
                  className="p-3"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  <p
                    className="text-lg font-extrabold"
                    style={{ color: "var(--lime)" }}
                  >
                    {isAuthed && !loading ? totalMessages : "--"}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Messages
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <p
                className="text-xs uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Chat Flow
              </p>
              <div className="space-y-2">
                {[
                  {
                    id: "01",
                    title: "Choose a companion",
                    desc: "Pick a vibe that matches your mood and style.",
                  },
                  {
                    id: "02",
                    title: "Start talking",
                    desc: "The conversation adapts to you in real time.",
                  },
                  {
                    id: "03",
                    title: "Pick up anytime",
                    desc: "Your sessions stay available across devices.",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="px-3 py-2 border"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--surface)",
                    }}
                  >
                    <p
                      className="text-xs font-mono mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.id}
                    </p>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {isAuthed && !loading && recentSessions.length > 0 && (
              <div className="card">
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Session Preview
                </p>
                <div className="space-y-2">
                  {recentSessions.map((session) => (
                    <div
                      key={`recent-${session.id}`}
                      className="w-full text-left px-3 py-2 border"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor:
                          session.id === currentSessionId
                            ? "var(--surface-2)"
                            : "var(--surface)",
                      }}
                    >
                      <p className="text-sm font-bold truncate">
                        {partnerEmoji(session.partnerId)} {session.partnerName}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {formatDate(session.lastActive || session.createdAt)}
                        {session.messageCount !== undefined
                          ? ` • ${session.messageCount} msgs`
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="card">
              <p
                className="text-xs uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Companion Modes
              </p>
              <div
                className="grid grid-cols-3 gap-px"
                style={{ backgroundColor: "var(--border)" }}
              >
                {[
                  { emoji: "👩", label: "Girlfriend" },
                  { emoji: "👨", label: "Boyfriend" },
                  { emoji: "🤝", label: "Best friend" },
                ].map((mode) => (
                  <div
                    key={mode.label}
                    className="p-3 text-center"
                    style={{ backgroundColor: "var(--surface)" }}
                  >
                    <p className="text-2xl mb-1" aria-hidden="true">
                      {mode.emoji}
                    </p>
                    <p
                      className="text-[11px] uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {mode.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
