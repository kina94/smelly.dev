import { Antipattern } from "@/shared/types";
import { unescapeNewlines, stripMarkdownCodeBlock, formatDate, toDate } from "@/utils/etc";

import React from "react";
import { Badge } from "@/shared/ui";
import { MarkdownRenderer } from "@/widgets";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Article({ antipattern }: { antipattern: Antipattern }) {
  const date = formatDate(antipattern.updatedAt);
  const fix = unescapeNewlines(antipattern.howToFix || "");
  const whyWrong = unescapeNewlines(antipattern.whyWrong || "");
  const summary = unescapeNewlines(antipattern.summary || "");

  // JSON-LD 구조화 데이터 (서버 사이드에서 생성)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: antipattern.title,
    description: summary,
    author: {
      "@type": "Organization",
      name: "Smelly.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "Smelly.dev",
      url: "https://smelly.dev",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://smelly.dev/antipatterns/${antipattern.id}`,
    },
    articleSection: "프론트엔드 안티패턴",
    keywords: antipattern.tags?.join(", ") || "",
    inLanguage: "ko-KR",
    isAccessibleForFree: true,
    programmingLanguage: "JavaScript",
    datePublished: toDate(antipattern.updatedAt),
    dateModified: toDate(antipattern.updatedAt),
  };

  return (
    <div>
      {/* JSON-LD 구조화 데이터 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-col mb-8 pb-3 border-b border-systemBackground-border gap-3">
        <span className="text-label-secondary text-captionSmall text-sm">{date}</span>

        <h1 className="text-label-primary text-hero text-3xl break-words">{antipattern.title || "제목 없음"}</h1>

        {/* Tags */}
        {antipattern.tags && antipattern.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {antipattern.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {summary && (
          <div className="flex flex-col space-y-2 px-6 py-4 bg-[#f0f8ff] border border-systemBlue rounded-lg">
            <div className="flex items-center gap-2">
              <h2 className="text-systemBlue text-subheadSemibold">Summary</h2>
            </div>
            <div className="text-systemBlue text-bodyRegular">
              <MarkdownRenderer content={summary} />
            </div>
          </div>
        )}

        <div className="flex flex-col mb-8">
          <h2 className="text-label-primary text-primary mb-4">Why Wrong?</h2>
          <div className="text-label-primary text-bodyRegular">
            <MarkdownRenderer content={whyWrong} />
          </div>
        </div>

        <div className="flex flex-col mb-8">
          <h2 className="text-label-primary text-primary mb-4">How to Fix?</h2>
          <div className="text-label-primary text-bodyRegular">
            <MarkdownRenderer content={fix} />
          </div>
        </div>

        <div className="flex flex-col mb-8">
          <h2 className="text-label-primary text-primary mb-4">Before Code</h2>
          <SyntaxHighlighter
            language="javascript"
            style={prism}
            customStyle={{
              borderRadius: 14,
              fontSize: 12,
              padding: 12,
            }}
          >
            {stripMarkdownCodeBlock(antipattern.beforeCode || "")}
          </SyntaxHighlighter>
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-label-primary text-primary pb-1">After Code</h2>
          <SyntaxHighlighter
            language="javascript"
            style={prism}
            customStyle={{ borderRadius: 14, fontSize: 12, padding: 12 }}
            wrapLongLines={true}
          >
            {stripMarkdownCodeBlock(antipattern.afterCode || "")}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
