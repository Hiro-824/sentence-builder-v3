import Link from "next/link";

export const metadata = {
  alternates: { canonical: "/" },
  title: "Syntablo｜英文構築アプリ",
  description:
    "Syntabloは、英単語ブロックを組み合わせて英文を構築しながら、直感的に英語の語順と文法を学べるアプリです。",
};

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(52, 199, 89, 0.1), transparent 30%), #0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 20px",
        color: "#e2e8f0",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          width: "100%",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          borderRadius: "20px",
          padding: "48px",
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.35), 0 10px 30px rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(10px)",
        }}
      >
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 12px",
            borderRadius: "999px",
            backgroundColor: "rgba(148, 163, 184, 0.12)",
            color: "#cbd5e1",
            fontSize: "13px",
            letterSpacing: "0.01em",
            marginBottom: "18px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, #3b82f6 0%, #22d3ee 40%, #34d399 100%)",
              boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.15)",
            }}
          />
          ブロック操作で学ぶ新しい英文構築体験
        </p>
        <h1
          style={{
            fontSize: "42px",
            lineHeight: 1.1,
            margin: "0 0 20px",
            color: "#f8fafc",
            letterSpacing: "-0.02em",
          }}
        >
          Syntablo
        </h1>
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.6,
            color: "#cbd5e1",
            marginBottom: "28px",
          }}
        >
          単語ブロックを並べながら語順や文法を体感的に習得できる英文構築アプリ。
          直感的なUIとリアルタイムのフィードバックで、書く力と理解力を同時に伸ばします。
        </p>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            href="/app"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 22px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #3b82f6 0%, #22d3ee 50%, #34d399 100%)",
              color: "#0f172a",
              fontWeight: 700,
              fontSize: "16px",
              textDecoration: "none",
              boxShadow:
                "0 12px 30px rgba(59, 130, 246, 0.35), 0 6px 16px rgba(34, 211, 238, 0.25)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            アプリを開く
          </Link>
          <span style={{ color: "#94a3b8", fontSize: "14px" }}>
            すぐに英文づくりを始められます。ログインで進捗も保存。
          </span>
        </div>
      </div>
    </main>
  );
}
