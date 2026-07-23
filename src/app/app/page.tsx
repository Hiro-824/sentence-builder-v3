import MainLesson from "@/components/main-lesson/main-lesson";

export const metadata = {
  alternates: { canonical: "/app" },
  title: "Syntablo｜ブロック操作で英文の作り方を直感的に学べる英文構築アプリ",
  description:
    "Syntabloは、英単語ブロックを組み合わせて英文を構築する体験を通して、英文を作る力を直感的に習得できる英語学習アプリです。ブロックベースのインターフェースにより、言葉による説明に頼らず自然な方法で英文法を身につけられます。",
};

export default function AppHome() {
  return <MainLesson />;
}
