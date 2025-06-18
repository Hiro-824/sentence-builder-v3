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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Sentence Builder｜ブロック操作で英文の作り方を直感的に学べる英文構築アプリ",
  description: "Sentence Builderは、英単語ブロックを組み合わせて英文を構築する体験を通して、英文を作る力を直感的に習得できる英語学習アプリです。ブロックベースのインターフェースにより、言葉による説明に頼らず自然な方法で英文法を身につけられます。",
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
