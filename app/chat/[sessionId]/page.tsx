"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { apiClient, Message, Partner } from "@/lib/api";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { clearSessionFromLocalStorage } from "@/lib/utils";

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId || sessionId === "undefined") {
      router.push("/partners");
      return;
    }
    loadChatData();
  }, [sessionId, router]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getErrorMessage = (err: unknown, fallback: string) => {
    if (!(err instanceof Error)) return fallback;
    if (err.message.includes("429")) {
      return "AI is rate-limited right now. Please wait a moment and retry.";
    }
    return err.message || fallback;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatData = async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await apiClient.getSession(sessionId);
      const partners = await apiClient.getPartners();
      const selectedPartner = partners.find((p) => p.id === session.partner_id);
      if (selectedPartner) setPartner(selectedPartner);
      const history = await apiClient.getHistory(sessionId);
      setMessages(history);
    } catch (err) {
      console.error("Failed to load chat:", err);
      setError(getErrorMessage(err, "Failed to load chat history. Redirecting..."));
      setTimeout(() => {
        router.push("/partners");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setSending(true);
    setError(null);
    try {
      const response = await apiClient.sendMessage(sessionId, content);
      const assistantMessage: Message = {
        role: "assistant",
        content: response.reply,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(getErrorMessage(err, "Message failed. Try again."));
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  const handleEndChat = async () => {
    if (!confirm("End this chat session?")) return;
    try {
      await apiClient.deleteSession(sessionId);
      clearSessionFromLocalStorage();
      router.push("/partners");
    } catch (err) {
      console.error("Failed to end chat:", err);
      setError("Failed to end chat. Try again.");
    }
  };

  const partnerEmoji = (type?: string) => {
    if (type === "girlfriend") return "👩‍🦰";
    if (type === "boyfriend") return "👨‍🦱";
    return "🤝";
  };

  if (loading) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div
          className="flex items-center gap-3"
          style={{ color: "var(--text-muted)" }}
        >
          <div className="w-5 h-5 border-2 border-current border-t-transparent animate-spin-slow" />
          <span className="text-sm">Loading your chat…</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div
        className="shrink-0 border-b z-20"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: partner info */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0 border text-lg"
              style={{
                borderColor: "var(--border-loud)",
                backgroundColor: "var(--surface-2)",
              }}
            >
              {partner ? partnerEmoji(partner.id) : "?"}
            </div>
            {partner && (
              <div className="min-w-0">
                <p className="font-bold text-sm leading-none truncate">
                  {partner.name}
                </p>
                <p
                  className="text-xs leading-tight mt-0.5 capitalize truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  {partner.id?.replace("_", " ")}
                  &nbsp;•&nbsp;
                  <span style={{ color: "var(--lime)" }}>online</span>
                </p>
              </div>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1 shrink-0">
            <span
              className="text-xs mr-2 hidden sm:block"
              style={{ color: "var(--text-muted)" }}
            >
              {messages.length} msgs
            </span>
            <button onClick={handleEndChat} className="btn-ghost text-xs">
              End
            </button>
            <Link href="/partners">
              <button className="btn-outline text-xs py-1.5 px-3">
                New chat
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── MESSAGES ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div
                className="w-16 h-16 flex items-center justify-center border-2 text-4xl mb-6"
                style={{
                  borderColor: "var(--border-loud)",
                  backgroundColor: "var(--surface)",
                }}
              >
                {partner?.id === "girlfriend" && "💕"}
                {partner?.id === "boyfriend" && "💪"}
                {partner?.id === "bestfriend" && "🎉"}
              </div>
              <h2 className="text-xl font-bold mb-2">No messages yet</h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Say hi to{" "}
                <strong style={{ color: "var(--lime)" }}>
                  {partner?.name}
                </strong>{" "}
                to start vibing
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {messages.map((msg, idx) => (
                <ChatMessage
                  key={idx}
                  message={msg}
                  partnerType={partner?.id}
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── ERROR BANNER ────────────────────────────────────────── */}
      {error && (
        <div
          className="shrink-0 px-4 py-3 text-sm font-medium border-t animate-slide-in-left"
          style={{
            borderColor: "var(--pink)",
            color: "var(--pink)",
            backgroundColor: "rgba(255,45,107,0.05)",
          }}
        >
          {error}
        </div>
      )}

      {/* ── INPUT ───────────────────────────────────────────────── */}
      <div
        className="shrink-0 border-t"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ChatInput
            onSend={handleSendMessage}
            disabled={false}
            loading={sending}
          />
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

