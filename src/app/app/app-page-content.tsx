import SentenceBuilder from "@/components/sentence-builder";
import { getSortedLessonsData } from "@/utils/lessons";
import Script from "next/script";
import { Suspense } from "react";

const SITE_BASE_URL = "https://syntablo.hirodevs.com";

interface AppPageContentProps {
  basePath: string;
}

export function AppPageContent({ basePath }: AppPageContentProps) {
  const lessons = getSortedLessonsData();
  const ldSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Syntablo",
    url: `${SITE_BASE_URL}${basePath}`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_BASE_URL}${basePath}/search?q={query}`,
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
          <SentenceBuilder lessons={lessons} basePath={basePath} />
        </Suspense>
      </main>
    </>
  );
}

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        fontSize: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      読み込み中...
    </div>
  );
}
