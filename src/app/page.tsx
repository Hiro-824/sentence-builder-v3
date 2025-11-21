import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <style>{`
        .landing-page {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #1a1a1a;
          line-height: 1.6;
          overflow-x: hidden;
        }
        .container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn-primary {
          background-color: #007AFF;
          color: white;
          border: 1px solid #007AFF;
        }
        .btn-primary:hover {
          background-color: #0056b3;
        }
        .btn-secondary {
          background-color: white;
          color: #1a1a1a;
          border: 1px solid #e0e0e0;
        }
        .btn-secondary:hover {
          background-color: #f5f5f5;
          border-color: #d0d0d0;
        }
        .section {
          padding: 80px 0;
        }
        .bg-gray {
          background-color: #f9fafb;
        }
        .text-center {
          text-align: center;
        }
        .text-blue {
          color: #007AFF;
        }
        .section-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .section-desc {
          font-size: 18px;
          color: #666;
          max-width: 700px;
          margin: 0 auto 48px auto;
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #f0f0f0;
          z-index: 100;
          display: flex;
          align-items: center;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: -0.02em;
        }

        /* Hero */
        .hero {
          padding-top: 160px;
          padding-bottom: 100px;
          display: flex;
          align-items: center;
          gap: 64px;
        }
        .hero-text {
          flex: 1;
        }
        .hero-visual {
          flex: 1;
          position: relative;
        }
        .hero-headline {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }
        .hero-sub {
          font-size: 18px;
          color: #666;
          margin-bottom: 32px;
          line-height: 1.8;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .visual-box {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
          box-shadow: 0 20px 40px -12px rgba(0,0,0,0.1);
        }

        /* Features */
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }
        .feature-card {
          background: white;
          padding: 32px;
          border-radius: 16px;
          border: 1px solid #f0f0f0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0,0,0,0.08);
        }
        .feature-icon {
          width: 48px;
          height: 48px;
          background-color: #e6f2ff;
          color: #007AFF;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .feature-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .feature-text {
          font-size: 16px;
          color: #666;
          line-height: 1.7;
        }

        /* Steps */
        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        .step-row {
          display: flex;
          align-items: center;
          gap: 48px;
        }
        .step-row.reverse {
          flex-direction: row-reverse;
        }
        .step-content {
          flex: 1;
        }
        .step-visual {
          flex: 1;
        }
        .step-number {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          color: #007AFF;
          background: #e6f2ff;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 16px;
        }
        .step-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .step-desc {
          color: #666;
          font-size: 16px;
        }

        /* CTA */
        .cta-section {
          background-color: #007AFF;
          color: white;
          text-align: center;
          border-radius: 24px;
          padding: 80px 24px;
          margin: 0 24px;
        }
        .cta-title {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 24px;
        }
        .cta-desc {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .btn-white {
          background-color: white;
          color: #007AFF;
          padding: 16px 32px;
          font-size: 18px;
        }
        .btn-white:hover {
          background-color: #f0f0f0;
        }

        /* Footer */
        .footer {
          padding: 48px 0;
          border-top: 1px solid #f0f0f0;
          color: #666;
          font-size: 14px;
          margin-top: 60px;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            padding-top: 120px;
            gap: 40px;
            text-align: center;
          }
          .hero-headline { font-size: 36px; }
          .hero-actions { justify-content: center; }
          .step-row, .step-row.reverse {
            flex-direction: column;
            text-align: center;
            gap: 24px;
          }
          .cta-section {
            margin: 0;
            border-radius: 0;
          }
          .cta-title { font-size: 28px; }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">
            <Image
              src="/android-chrome-512x512.png"
              width={28}
              height={28}
              alt="Syntablo icon"
            />
            <span>Syntablo</span>
          </Link>
          <Link href="/app" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "14px" }}>
            アプリを開く
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container hero">
        <div className="hero-text">
          <h1 className="hero-headline">
            英語の「語順」が<br />
            <span className="text-blue">見える</span>、わかる。
          </h1>
          <p className="hero-sub">
            Syntablo（シンタブロ）は、英単語ブロックを組み合わせて英文を構築しながら、
            直感的に英語の語順と文法を学べるアプリです。
            言葉の説明に頼らず、手を動かすことで英語脳を育てます。
          </p>
          <div className="hero-actions">
            <Link href="/app" className="btn btn-primary">
              登録不要で試す
            </Link>
            <a href="#features" className="btn btn-secondary">
              詳しく見る
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-box">
            <Image
              src="/screenshots/syntablo-hero.png"
              alt="Syntablo アプリの操作画面"
              width={1600}
              height={1000}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain"   // ← これが重要！
              }}
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section bg-gray">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Syntabloの特徴</h2>
            <p className="section-desc">
              教科書を読むだけでは身につかない「英語の構造」を、
              視覚的・直感的なアプローチで解決します。
            </p>
          </div>

          <div className="feature-grid">
            {/* Feature Cards (unchanged) */}
            {[
              {
                title: "視覚的な文法チェック",
                text: "単語ブロックは品詞ごとに色分けされています。正しくない構造は物理的に繋がりません。直感的に文法ルールが身につきます。",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                ),
              },
              {
                title: "AI講師との対話",
                text: "自分で組み立てた英文を使って、AI講師とチャットで会話できます。ロールプレイ形式で自然な英語力が身につきます。",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                ),
              },
              {
                title: "体系的なレッスン",
                text: "基礎文法から段階的に学べるレッスンも搭載。独学でも安心して進められるよう、丁寧なガイドがついています。",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                ),
              },
            ].map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">学習のステップ</h2>
            <p className="section-desc">
              直感的な3ステップで、誰でもすぐに使い始められます。
            </p>
          </div>

          <div className="steps-container">
            {/* Step 1 */}
            <div className="step-row">
              <div className="step-visual">
                <div className="visual-box" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src="/screenshots/syntablo-step1.png"
                    alt="Step 1 screenshot"
                    width={1600}
                    height={900}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="step-content">
                <span className="step-number">Step 1</span>
                <h3 className="step-title">ブロックを選ぶ</h3>
                <p className="step-desc">
                  サイドバーから使いたい単語ブロックを選び、キャンバスにドラッグします。
                  色分けされたブロックで品詞が一目でわかります。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-row reverse">
              <div className="step-visual">
                <div className="visual-box" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src="/screenshots/syntablo-step2.png"
                    alt="Step 2 screenshot"
                    width={1600}
                    height={900}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="step-content">
                <span className="step-number">Step 2</span>
                <h3 className="step-title">ブロックを繋ぐ</h3>
                <p className="step-desc">
                  ブロック同士を近づけると、文法的に正しい場合だけカチッと繋がります。
                  間違っている場合は繋がらないため、リアルタイムで理解が深まります。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-row">
              <div className="step-visual">
                <div className="visual-box" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src="/screenshots/syntablo-step3.png"
                    alt="Step 3 screenshot"
                    width={1600}
                    height={900}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="step-content">
                <span className="step-number">Step 3</span>
                <h3 className="step-title">会話で実践する</h3>
                <p className="step-desc">
                  完成した英文をAI講師に送信し、ロールプレイで会話練習ができます。
                  「正しく作れた！」という成功体験が次の学習につながります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container">
        <section className="cta-section">
          <h2 className="cta-title">英語の構造が、手に取るようにわかる体験を。</h2>
          <p className="cta-desc">
            まずはアカウント登録なしで、実際にブロックを触りながら英文を作ってみてください。
          </p>
          <Link href="/app" className="btn btn-white">
            今すぐブラウザで試す
          </Link>
          <div style={{ marginTop: "16px", fontSize: "14px", opacity: 0.8 }}>
            ※ アカウント登録は不要です
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <p style={{ marginBottom: "16px" }}>
            &copy; {new Date().getFullYear()} Syntablo. All rights reserved.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
            <Link href="/app" style={{ color: "#666", textDecoration: "none" }}>
              アプリ
            </Link>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>
              利用規約
            </a>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>
              プライバシーポリシー
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
