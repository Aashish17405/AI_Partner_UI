export type AuthUser = {
  id: string;
  email?: string;
};

export type AuthSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  token_type?: string;
  user?: AuthUser;
};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://cxzcjsnlisxrvwcviksg.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SESSION_STORAGE_KEY = "aiptnr_auth_session";

function hasWindow() {
  return typeof window !== "undefined";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
  };
}

function withExpiry(session: AuthSession): AuthSession {
  const now = Math.floor(Date.now() / 1000);
  if (session.expires_at) return session;
  if (session.expires_in) {
    return { ...session, expires_at: now + session.expires_in };
  }
  return session;
}

export function getStoredSession(): AuthSession | null {
  if (!hasWindow()) return null;
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.access_token) return null;
    if (parsed.expires_at && parsed.expires_at <= Math.floor(Date.now() / 1000)) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  return getStoredSession()?.access_token || null;
}

export function saveSession(session: AuthSession): void {
  if (!hasWindow()) return;
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(withExpiry(session)));
}

export function clearSession(): void {
  if (!hasWindow()) return;
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const json = (await response.json()) as { msg?: string; error_description?: string; error?: string };
    return json.error_description || json.msg || json.error || response.statusText;
  } catch {
    return response.statusText || "Request failed";
  }
}

export async function signInWithPassword(email: string, password: string): Promise<AuthSession> {
  const url = `${SUPABASE_URL}/auth/v1/token?grant_type=password`;
  const response = await fetch(url, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
  const session = (await response.json()) as AuthSession;
  saveSession(session);
  return session;
}

export async function signUpWithPassword(email: string, password: string): Promise<AuthSession | null> {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }
  const payload = (await response.json()) as AuthSession;
  if (payload.access_token) {
    saveSession(payload);
    return payload;
  }
  return null;
}

export function startOAuthSignIn(
  provider: "google",
  nextPath: string = "/chats",
): void {
  if (!hasWindow()) return;
  const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
  const url = new URL(`${SUPABASE_URL}/auth/v1/authorize`);
  url.searchParams.set("provider", provider);
  url.searchParams.set("redirect_to", redirectTo);
  window.location.assign(url.toString());
}

export function consumeSessionFromUrl(): boolean {
  if (!hasWindow()) return false;

  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : "";
  const hashParams = new URLSearchParams(hash);
  const accessToken = hashParams.get("access_token");
  if (!accessToken) return false;

  const expiresInRaw = hashParams.get("expires_in");
  const expiresIn = expiresInRaw ? Number(expiresInRaw) : undefined;
  const session: AuthSession = {
    access_token: accessToken,
    refresh_token: hashParams.get("refresh_token") || undefined,
    token_type: hashParams.get("token_type") || undefined,
    expires_in: Number.isFinite(expiresIn) ? expiresIn : undefined,
  };
  saveSession(session);
  return true;
}

export async function signOut(): Promise<void> {
  const token = getAccessToken();
  if (!token) {
    clearSession();
    return;
  }
  try {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: {
        ...authHeaders(),
        Authorization: `Bearer ${token}`,
      },
    });
  } finally {
    clearSession();
  }
}
