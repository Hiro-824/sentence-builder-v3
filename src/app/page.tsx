import SentenceBuilder from "@/components/sentence-builder";
import { getSortedLessonsData } from "@/utils/lessons";
import Script from "next/script";
import { Suspense } from "react";

export const metadata = {
  alternates: { canonical: "/" },
  title: "Syntablo｜ブロック操作で英文の作り方を直感的に学べる英文構築アプリ",
  description: "Syntabloは、英単語ブロックを組み合わせて英文を構築する体験を通して、英文を作る力を直感的に習得できる英語学習アプリです。ブロックベースのインターフェースにより、言葉による説明に頼らず自然な方法で英文法を身につけられます。",
};

export default function Home() {
  const lessons = getSortedLessonsData();
  const ldSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Syntablo",
    url: "https://sentence-builder.hirodevs.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sentence-builder.hirodevs.com/search?q={query}",
      "query-input": "required name=query",
    },
  };

  return (
    <>
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldSite) }}
      />
      <main>
        <Suspense fallback={<Loading />}>
          <SentenceBuilder lessons={lessons} />
        </Suspense>
      </main>
    </>
  );
}

function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      fontSize: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      読み込み中...
    </div>
  );
}
