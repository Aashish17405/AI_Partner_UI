"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { consumeSessionFromUrl } from "@/lib/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawNextPath = params.get("next") || "/chats";
    const nextPath =
      rawNextPath.startsWith("/") && !rawNextPath.startsWith("//")
        ? rawNextPath
        : "/chats";
    const ok = consumeSessionFromUrl();
    if (ok) {
      router.replace(nextPath);
      return;
    }
    setError("Authentication callback did not contain a valid session.");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-xl font-bold mb-2">Completing sign in...</h1>
        {error ? (
          <p className="text-sm" style={{ color: "var(--pink)" }}>
            {error}
          </p>
        ) : (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Please wait while we redirect you.
          </p>
        )}
      </div>
    </div>
  );
}
