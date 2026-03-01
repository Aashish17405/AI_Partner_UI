"use client";

import { Message } from "@/lib/api";
import { formatDate } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  partnerType?: string;
}

export function ChatMessage({
  message,
  partnerType = "best_friend",
}: ChatMessageProps) {
  const isUser = message.role === "user";

  const getPartnerAvatar = () => {
    if (partnerType === "girlfriend") return "👩‍🦰";
    if (partnerType === "boyfriend") return "👨‍🦱";
    return "🤝";
  };

  return (
    <div
      className={`flex gap-3 py-2 animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div
          className="shrink-0 w-8 h-8 flex items-center justify-center border text-sm self-end"
          style={{
            borderColor: "var(--border-loud)",
            backgroundColor: "var(--surface-2)",
          }}
        >
          {getPartnerAvatar()}
        </div>
      )}

      <div
        className={`flex flex-col gap-1 max-w-[75%] ${isUser ? "items-end" : "items-start"}`}
      >
        {/* bubble */}
        <div
          className="px-4 py-3 text-sm sm:text-base leading-relaxed break-words"
          style={
            isUser
              ? {
                  backgroundColor: "var(--lime)",
                  color: "#000",
                  fontWeight: 500,
                }
              : {
                  backgroundColor: "var(--surface-2)",
                  color: "var(--text)",
                  borderLeft: "2px solid var(--border-loud)",
                }
          }
        >
          {message.content}
        </div>

        {/* timestamp */}
        {message.timestamp && (
          <span className="text-xs px-1" style={{ color: "var(--text-muted)" }}>
            {formatDate(message.timestamp)}
          </span>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div
          className="shrink-0 w-8 h-8 flex items-center justify-center border text-xs font-bold self-end"
          style={{
            borderColor: "var(--lime)",
            backgroundColor: "var(--surface)",
            color: "var(--lime)",
          }}
        >
          you
        </div>
      )}
    </div>
  );
}
