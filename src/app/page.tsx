import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Syntablo - 英語の語順と文法を直感的に学ぶ",
  description: "Syntabloは、英単語ブロックを組み合わせて英文を構築しながら、直感的に英語の語順と文法を学べるアプリです。",
};

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Internal Styles for Responsiveness and Layout */}
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
        .logo-icon {
          display: block;
          width: 28px;
          height: 28px;
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
        .visual-placeholder {
          width: 100%;
          aspect-ratio: 16/10;
          background-color: #f0f2f5;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-weight: 500;
          box-shadow: 0 20px 40px -12px rgba(0,0,0,0.1);
        }

        /* Feature Grid */
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

        /* How it works */
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
          text-transform: uppercase;
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

        /* CTA Box */
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

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            padding-top: 120px;
            gap: 40px;
            text-align: center;
          }
          .hero-headline {
            font-size: 36px;
          }
          .hero-actions {
            justify-content: center;
          }
          .step-row, .step-row.reverse {
            flex-direction: column;
            text-align: center;
            gap: 24px;
          }
          .cta-section {
            margin: 0;
            border-radius: 0;
          }
          .cta-title {
            font-size: 28px;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">
            <img
              src="/android-chrome-512x512.png"
              alt="Syntablo icon"
              className="logo-icon"
              width={28}
              height={28}
            />
            <span>Syntablo</span>
          </Link>
          <Link href="/app" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "14px" }}>
            アプリを開く
          </Link>
        </div>
      </header>

      {/* Hero Section */}
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
          <div className="visual-placeholder">
            {/* Placeholder for Hero GIF/Image */}
            <div style={{ textAlign: "center" }}>
              <p>App Demo Visual</p>
              <span style={{ fontSize: "12px", opacity: 0.6 }}>(Drag & Drop Animation)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="feature-title">視覚的な文法チェック</h3>
              <p className="feature-text">
                単語は品詞ごとに色分けされたブロックになっています。
                文法的に正しくない組み合わせは物理的に繋がらないため、
                試行錯誤しながら自然と正しいルールが身につきます。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="feature-title">AI講師との対話</h3>
              <p className="feature-text">
                自分で組み立てた英文を使って、AI講師とチャット形式で会話ができます。
                シチュエーションごとのロールプレイを通じて、
                実践的なコミュニケーション力を養えます。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="feature-title">体系的なレッスン</h3>
              <p className="feature-text">
                中学英語レベルの基礎文法から、少しずつ複雑な構文へとステップアップ。
                各レッスンには解説が含まれており、
                独学でも安心して学習を進めることができます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">学習のステップ</h2>
            <p className="section-desc">
              難しい操作は必要ありません。シンプルで直感的な3ステップです。
            </p>
          </div>

          <div className="steps-container">
            {/* Step 1 */}
            <div className="step-row">
              <div className="step-visual">
                <div className="visual-placeholder" style={{ aspectRatio: "16/9", backgroundColor: "#f9fafb" }}>
                  <p>Step 1 Screenshot</p>
                </div>
              </div>
              <div className="step-content">
                <span className="step-number">Step 1</span>
                <h3 className="step-title">ブロックを選ぶ</h3>
                <p className="step-desc">
                  サイドバーから使いたい単語ブロックを選び、キャンバスにドラッグ＆ドロップします。
                  ブロックは品詞ごとに色分けされているため、役割が一目でわかります。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-row reverse">
              <div className="step-visual">
                <div className="visual-placeholder" style={{ aspectRatio: "16/9", backgroundColor: "#f9fafb" }}>
                  <p>Step 2 Screenshot</p>
                </div>
              </div>
              <div className="step-content">
                <span className="step-number">Step 2</span>
                <h3 className="step-title">ブロックを繋ぐ</h3>
                <p className="step-desc">
                  パズルのようにブロック同士を近づけると、正しい文法であればカチッと繋がります。
                  語順が間違っていると繋がらないため、その場でミスに気づくことができます。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-row">
              <div className="step-visual">
                <div className="visual-placeholder" style={{ aspectRatio: "16/9", backgroundColor: "#f9fafb" }}>
                  <p>Step 3 Screenshot</p>
                </div>
              </div>
              <div className="step-content">
                <span className="step-number">Step 3</span>
                <h3 className="step-title">会話で実践する</h3>
                <p className="step-desc">
                  完成した英文を送信して、AI講師と会話を楽しみましょう。
                  正しい英文を作れたという成功体験が、英語学習のモチベーションを高めます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="container">
        <section className="cta-section">
          <h2 className="cta-title">英語の構造が、手に取るようにわかる体験を。</h2>
          <p className="cta-desc">
            Syntabloは、あなたのペースで自由に学べるツールです。
            まずはアカウント登録なしで、実際の操作感を試してみてください。
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
          <p style={{ marginBottom: "16px" }}>&copy; {new Date().getFullYear()} Syntablo. All rights reserved.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
            <Link href="/app" style={{ color: "#666", textDecoration: "none" }}>アプリ</Link>
            <a href="#" style={{ color: "#666", textDecoration: "none", pointerEvents: "none" }}>利用規約</a>
            <a href="#" style={{ color: "#666", textDecoration: "none", pointerEvents: "none" }}>プライバシーポリシー</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
