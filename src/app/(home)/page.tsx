import { Article } from "@/components/Article";
import { ErrorMessage } from "@/widgets";
import { getLatestAntipattern } from "@/lib/antipattern";
import type { Metadata } from "next";
import { AVAILABLE_TAGS } from "@/shared/constants/tags";

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
    ...AVAILABLE_TAGS,
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

  // 홈페이지용 JSON-LD 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Smelly.dev",
    description: "프론트엔드 안티패턴을 매일 하나씩 소개하는 사이트",
    url: "https://smelly-dev.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://smelly-dev.vercel.app/antipatterns?tags={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Smelly.dev",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Article antipattern={latestAntipattern} />
    </>
  );
}
