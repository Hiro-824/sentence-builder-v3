import SentenceBuilder from "@/components/sentence-builder";
import { Suspense } from 'react';

export default function Home() {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <SentenceBuilder />
      </Suspense>
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