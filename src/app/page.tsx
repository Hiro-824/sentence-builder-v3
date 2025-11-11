import SentenceBuilder from "@/components/sentence-builder";
import { getSortedLessonsData } from "@/utils/lessons";
import Script from "next/script";
import { Suspense } from "react";

export const metadata = {
  alternates: { canonical: "/" },
  title: "Sentence Builder – Build natural sentences fast",
  description: "Build natural sentences fast with an interactive Next.js tool.",
};

export default function Home() {
  const lessons = getSortedLessonsData();
  const ldSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sentence Builder",
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
