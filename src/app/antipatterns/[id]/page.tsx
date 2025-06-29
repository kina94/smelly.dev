import Article from "@/components/Article/Article";
import { getAntipattern } from "@/lib/antipattern";
import React from "react";
import type { Metadata } from "next";
import { BackButton } from "@/widgets";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const antipattern = await getAntipattern(id);

  if (!antipattern) {
    return {
      title: "안티패턴을 찾을 수 없습니다",
      description: "요청하신 안티패턴을 찾을 수 없습니다.",
    };
  }

  return {
    title: antipattern.title,
    description: `${antipattern.title} - ${antipattern.summary}`,
    keywords: ["안티패턴", "프론트엔드", antipattern.title, ...antipattern.tags],
    openGraph: {
      title: antipattern.title,
      description: `${antipattern.title} - ${antipattern.summary}`,
      url: `https://smelly.dev/antipatterns/${id}`,
      type: "article",
      authors: ["Smelly.dev"],
    },
    twitter: {
      title: antipattern.title,
      description: `${antipattern.title} - ${antipattern.summary}`,
    },
    alternates: {
      canonical: `/antipatterns/${id}`,
    },
  };
}

const AntiPatternDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const antipattern = await getAntipattern(id);

  return (
    <>
      <BackButton />
      <Article antipattern={antipattern} />
    </>
  );
};

export default AntiPatternDetail;
