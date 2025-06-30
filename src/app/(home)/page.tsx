import { Article } from "@/components/Article";
import { ErrorMessage } from "@/widgets";
import { getLatestAntipattern } from "@/lib/antipattern";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프론트엔드 안티패턴 모음과 가이드 | Smelly.dev",
  description:
    "Smelly.dev는 프론트엔드 안티패턴을 매일 하나씩 소개하는 사이트입니다. React, Vue, Angular, JavaScript에서 자주 발생하는 문제 패턴을 예제와 함께 설명합니다.",
  keywords: [
    "프론트엔드",
    "안티패턴",
    "프론트엔드 안티패턴",
    "프론트엔드 개발",
    "React 안티패턴",
    "JavaScript 안티패턴",
    "웹 안티패턴",
    "웹 개발 실수",
    "웹개발",
    // AVAILABLE_TAGS
    "JavaScript",
    "TypeScript",
    "React",
    "CSS",
    "HTML",
    "UX",
    "성능",
    "보안",
    "상태관리",
    "테스트",
    "빌드&번들링",
    "애니메이션/UI",
    "컴포넌트",
    "네이밍",
    "Lint/Formatter",
    "비동기처리",
    "아키텍처",
    "호환성",
    "CI/CD",
    "에러처리",
    "캐싱전략",
    "렌더링전략",
    "웹표준",
    "SEO/접근성",
  ],
  openGraph: {
    title: "프론트엔드 안티패턴 가이드",
    description: "자주 발생하는 프론트엔드 안티패턴을 매일 하나씩 소개합니다.",
    url: "https://smelly-dev.vercel.app/",
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
