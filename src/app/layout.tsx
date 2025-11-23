import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://syntablo.hirodevs.com"
  ),
  title: "Syntablo｜ブロック操作で英文の作り方を直感的に学べる英文構築アプリ",
  description:
    "Syntabloは、英単語ブロックを組み合わせて英文を構築する体験を通して、英文を作る力を直感的に習得できる英語学習アプリです。ブロックベースのインターフェースにより、言葉による説明に頼らず自然な方法で英文法を身につけられます。",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Syntablo",
    url: "https://syntablo.hirodevs.com",
    type: "website",
    title:
      "Syntablo｜ブロック操作で英文の作り方を直感的に学べる英文構築アプリ",
    description:
      "英単語ブロックを組み合わせて英文を構築することで、英文法を自然に理解できる英語学習アプリ。Next.js製のインタラクティブなツールです。",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syntablo｜ブロック操作で英文の作り方を直感的に学べる英文構築アプリ",
    description:
      "英単語ブロックを組み合わせて英文を構築し、英文法を直感的に学べる英語学習アプリ。",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  // Keep legacy tags for reference or analytics tools
  other: {
    "sentence-builder:legacy-title":
      "Syntablo｜ブロック操作で英文の作り方を直感的に学べる英文構築アプリ",
    "sentence-builder:legacy-description":
      "Syntabloは、英単語ブロックを組み合わせて英文を構築する体験を通して、英文を作る力を直感的に習得できる英語学習アプリです。ブロックベースのインターフェースにより、言葉による説明に頼らず自然な方法で英文法を身につけられます。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="screen-orientation" content="landscape" />
        <meta name="orientation" content="landscape" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
