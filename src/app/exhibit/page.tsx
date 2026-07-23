import type { Metadata } from "next";
import ExhibitPage from "./exhibit-page";

export const metadata: Metadata = {
  title: "英文法学習アプリ Syntablo｜展示資料",
  description:
    "見えない文法制約を操作可能な図形として外在化する試みについて紹介する展示資料です。",
  alternates: { canonical: "/exhibit" },
};

export default function Page() {
  return <ExhibitPage />;
}
