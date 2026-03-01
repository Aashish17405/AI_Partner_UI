const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export interface Partner {
  id: string;
  name: string;
  tagline: string;
  description: string;
  avatar_hint: string;
  languages_supported: string[];
}

export interface Session {
  id: string;
  partner_id: string;
  partner_name: string;
  user_name: string;
  user_nickname?: string;
  language: string;
  created_at: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  session_id: string;
  reply: string;
  message_count: number;
}

// Internal backend response shapes (not exported)
interface BackendSession {
  session_id: string;
  partner_id: string;
  partner_name: string;
  user_name: string;
  nickname?: string;
  language: string;
  created_at?: string;
  last_active?: string;
  message_count?: number;
  [key: string]: unknown;
}

interface BackendHistoryMessage {
  role: string;
  text: string;
}

interface BackendHistoryResponse {
  session_id: string;
  history: BackendHistoryMessage[];
}

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error("[API] Error:", error);
      throw error;
    }
  }

  // Partners endpoint
  async getPartners(): Promise<Partner[]> {
    return this.request<Partner[]>("/partners");
  }

  // Sessions endpoints
  async createSession(
    partnerId: string,
    userName: string,
    userAge: number,
    userLanguage: string,
    userInterests: string[],
    userNickname?: string,
    personalityPreference?: string,
  ): Promise<Session> {
    const raw = await this.request<BackendSession>("/sessions", {
      method: "POST",
      body: JSON.stringify({
        partner_id: partnerId,
        user_name: userName,
        nickname: userNickname,
        user_age: userAge,
        language: userLanguage,
        interests: userInterests,
        personality_pref: personalityPreference,
      }),
    });
    return {
      id: raw.session_id,
      partner_id: raw.partner_id,
      partner_name: raw.partner_name,
      user_name: raw.user_name,
      user_nickname: raw.nickname,
      language: raw.language,
      created_at: raw.created_at ?? new Date().toISOString(),
    };
  }

  async getSession(sessionId: string): Promise<Session> {
    const raw = await this.request<BackendSession>(`/sessions/${sessionId}`);
    return {
      id: raw.session_id,
      partner_id: raw.partner_id,
      partner_name: raw.partner_name,
      user_name: raw.user_name,
      user_nickname: raw.nickname,
      language: raw.language,
      created_at: raw.created_at ?? new Date().toISOString(),
    };
  }

  // Chat endpoints
  async sendMessage(sessionId: string, message: string): Promise<ChatResponse> {
    return this.request<ChatResponse>(`/sessions/${sessionId}/chat`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  async getHistory(sessionId: string): Promise<Message[]> {
    const raw = await this.request<BackendHistoryResponse>(
      `/sessions/${sessionId}/history`,
    );
    return (raw.history ?? []).map((m) => ({
      role: m.role === "model" ? "assistant" : (m.role as "user" | "assistant"),
      content: m.text,
    }));
  }

  // Delete session
  async deleteSession(sessionId: string): Promise<void> {
    return this.request<void>(`/sessions/${sessionId}`, {
      method: "DELETE",
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>("/");
  }
}

export const apiClient = new APIClient();
