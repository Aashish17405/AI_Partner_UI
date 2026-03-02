"use client";

import { useState, useRef, useEffect } from "react";
import { ButtonDots } from "@/components/Loader";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

export function ChatInput({
  onSend,
  disabled = false,
  loading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current && !loading) inputRef.current.focus();
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !loading) {
      onSend(message);
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      {/* textarea wrapper */}
      <div
        className="flex-1 flex items-end border-b-2 pb-1 transition-colors"
        style={{ borderColor: "var(--border-loud)" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--lime)")}
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-loud)")
        }
      >
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            // auto-resize
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
          }}
          onKeyDown={handleKeyDown}
          placeholder="Message…"
          disabled={disabled || loading}
          rows={1}
          className="w-full bg-transparent outline-none resize-none text-sm leading-relaxed disabled:opacity-40"
          style={{
            color: "var(--text)",
            fontFamily: "inherit",
            minHeight: "24px",
            maxHeight: "128px",
          }}
        />
      </div>

      {/* send button */}
      <button
        type="submit"
        disabled={!message.trim() || disabled || loading}
        aria-label="Send"
        className="shrink-0 w-10 h-10 flex items-center justify-center font-bold text-base transition-colors duration-100 disabled:cursor-not-allowed"
        style={
          loading
            ? {
                backgroundColor: "var(--surface-2)",
                color: "var(--text-muted)",
                border: "2px solid",
                borderColor: "var(--border-loud)",
                opacity: 1,
              }
            : {
                backgroundColor: message.trim()
                  ? "var(--lime)"
                  : "var(--surface-2)",
                color: message.trim() ? "#000" : "var(--text-muted)",
                border: "2px solid",
                borderColor: message.trim()
                  ? "var(--lime)"
                  : "var(--border-loud)",
                opacity: message.trim() ? 1 : 0.3,
              }
        }
      >
        {loading ? <ButtonDots /> : "↑"}
      </button>
    </form>
  );
}
