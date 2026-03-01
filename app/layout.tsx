import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "AIPTNR — Your AI Companion",
  description:
    "Chat with your ideal AI companion — girlfriend, boyfriend, or best friend. Real conversations, powered by AI.",
  keywords:
    "AI companion, chatbot, girlfriend, boyfriend, best friend, AI chat",
  authors: [{ name: "AIPTNR" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aipartner.app",
    siteName: "AIPTNR",
    title: "AIPTNR — Your AI Companion",
    description:
      "Chat with your ideal AI companion — girlfriend, boyfriend, or best friend.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
