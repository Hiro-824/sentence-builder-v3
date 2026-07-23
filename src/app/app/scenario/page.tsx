import { AppPageContent } from "../app-page-content";

export const metadata = {
  alternates: { canonical: "/app/scenario" },
  title: "Syntablo｜会話シナリオ",
  description: "英単語ブロックを組み立てながら、会話シナリオに沿って英語を練習できます。",
};

export default function ScenarioApp() {
  return <AppPageContent basePath="/app/scenario" />;
}
