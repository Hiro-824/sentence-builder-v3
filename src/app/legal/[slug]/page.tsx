import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

const legalPages = {
  terms: {
    title: "利用規約",
    filename: "terms.md",
    description: "Syntabloの利用条件や禁止事項をまとめたページです。",
  },
  "privacy-policy": {
    title: "プライバシーポリシー",
    filename: "privacy-policy.md",
    description: "Syntabloにおける個人情報の取り扱いについて説明するページです。",
  },
} as const;

type LegalSlug = keyof typeof legalPages;

async function loadMarkdown(filename: string) {
  const filePath = path.join(process.cwd(), "src", "content", "legal", filename);
  return fs.readFile(filePath, "utf-8");
}

export async function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const config = legalPages[params.slug as LegalSlug];
  if (!config) {
    return { title: "Not Found" };
  }

  return {
    title: `${config.title} | Syntablo`,
    description: config.description,
  };
}

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const config = legalPages[params.slug as LegalSlug];

  if (!config) {
    notFound();
  }

  const content = await loadMarkdown(config.filename);

  return (
    <div className="legal-page">
      <style>{`
        .legal-page {
          background: radial-gradient(circle at 20% 20%, #f7fbff 0%, #ffffff 35%), radial-gradient(circle at 80% 0%, #f5f7ff 0%, #ffffff 40%);
          min-height: 100vh;
        }
        .legal-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 120px 24px 80px;
        }
        .legal-meta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #007AFF;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }
        .back-link:hover {
          text-decoration: underline;
        }
        .legal-title {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .legal-desc {
          font-size: 16px;
          color: #555;
          margin: 0;
        }
        .legal-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 20px 40px -24px rgba(0,0,0,0.15);
        }
        .legal-content {
          font-size: 16px;
          line-height: 1.8;
          color: #1a1a1a;
        }
        .legal-content h1,
        .legal-content h2,
        .legal-content h3 {
          margin-top: 28px;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .legal-content h1 { font-size: 28px; }
        .legal-content h2 { font-size: 22px; }
        .legal-content h3 { font-size: 18px; }
        .legal-content p { margin: 12px 0; }
        .legal-content ul {
          padding-left: 20px;
          margin: 12px 0;
        }
        .legal-content li {
          margin: 6px 0;
        }
        .legal-content strong {
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .legal-container { padding: 96px 20px 64px; }
          .legal-title { font-size: 28px; }
          .legal-card { padding: 24px; }
        }
      `}</style>

      <div className="legal-container">
        <div className="legal-meta">
          <Link href="/" className="back-link">
            <span aria-hidden>←</span> トップへ戻る
          </Link>
          <h1 className="legal-title">{config.title}</h1>
          <p className="legal-desc">{config.description}</p>
        </div>

        <div className="legal-card">
          <div className="legal-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
