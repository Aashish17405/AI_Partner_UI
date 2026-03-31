export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function createSessionKey(sessionId: string): string {
  return `session_${sessionId}`;
}

export function createMessageCacheKey(sessionId: string): string {
  return `messages_${sessionId}`;
}

export function saveSessionToLocalStorage(sessionId: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("current_session_id", sessionId);
    addSessionToHistory(sessionId);
  }
}

export function getSessionFromLocalStorage(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("current_session_id");
  }
  return null;
}

export function clearSessionFromLocalStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("current_session_id");
  }
}

export function getSessionHistoryFromLocalStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("session_history_ids");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id) => typeof id === "string" && id.trim().length > 0,
    );
  } catch {
    return [];
  }
}

export function setSessionHistoryToLocalStorage(sessionIds: string[]): void {
  if (typeof window === "undefined") return;
  const unique = Array.from(
    new Set(sessionIds.filter((id) => id && id.trim().length > 0)),
  );
  localStorage.setItem(
    "session_history_ids",
    JSON.stringify(unique.slice(0, 50)),
  );
}

export function addSessionToHistory(sessionId: string): void {
  if (typeof window === "undefined" || !sessionId) return;
  const existing = getSessionHistoryFromLocalStorage().filter(
    (id) => id !== sessionId,
  );
  setSessionHistoryToLocalStorage([sessionId, ...existing]);
}

export function removeSessionFromHistory(sessionId: string): void {
  if (typeof window === "undefined") return;
  const existing = getSessionHistoryFromLocalStorage().filter(
    (id) => id !== sessionId,
  );
  setSessionHistoryToLocalStorage(existing);
  if (getSessionFromLocalStorage() === sessionId) {
    clearSessionFromLocalStorage();
  }
}

export function createScrollInDelay(index: number): string {
  return `${index * 100}ms`;
}
