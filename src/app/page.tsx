import { Article } from "@/components/Article";
import { ErrorMessage } from "@/widgets";
import { getLatestAntipattern } from "@/lib/antipattern";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프론트엔드 안티패턴 가이드",
  description:
    "프론트엔드 안티패턴을 매일 하나씩 소개합니다. 프론트엔드 개발에서 피해야 할 패턴들을 실무 예제와 함께 설명합니다.",
  keywords: ["프론트엔드", "안티패턴", "React", "Vue", "Angular", "JavaScript", "TypeScript", "웹개발"],
  openGraph: {
    title: "프론트엔드 안티패턴 가이드",
    description: "자주 발생하는 프론트엔드 안티패턴을 매일 하나씩 소개합니다.",
    url: "https://smelly.dev",
  },
  twitter: {
    title: "프론트엔드 안티패턴 가이드",
    description: "자주 발생하는 프론트엔드 안티패턴을 매일 하나씩 소개합니다.",
  },
};

export default async function Home() {
  const latestAntipattern = await getLatestAntipattern();

  if (!latestAntipattern) {
    return <ErrorMessage message="표시할 안티패턴이 없습니다." />;
  }

  return <Article antipattern={latestAntipattern} />;
}
