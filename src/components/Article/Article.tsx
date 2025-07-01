import { Antipattern } from "@/shared/types";
import { unescapeNewlines, formatDate } from "@/utils/etc";

import React from "react";
import { Badge } from "@/shared/ui";
import { MarkdownRenderer } from "@/widgets";
import { Code2, Link as LinkIcon } from "lucide-react";
import { CodeRenderer } from "@/widgets";

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
      url: "https://smelly-dev.vercel.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://smelly-dev.vercel.app/antipatterns/${antipattern.id}`,
    },
    articleSection: "프론트엔드 안티패턴",
    keywords: antipattern.tags?.join(", ") || "",
    inLanguage: "ko-KR",
    isAccessibleForFree: true,
    programmingLanguage: "JavaScript",
    datePublished: new Date(antipattern.updatedAt),
    dateModified: new Date(antipattern.updatedAt),
  };

  // Breadcrumb 구조화 데이터
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://smelly-dev.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "안티패턴 목록",
        item: "https://smelly-dev.vercel.app/antipatterns",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: antipattern.title,
        item: `https://smelly-dev.vercel.app/antipatterns/${antipattern.id}`,
      },
    ],
  };

  return (
    <div>
      {/* JSON-LD 구조화 데이터 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="flex flex-col mb-8 pb-3 border-b border-gray-200 gap-3">
        <span className="text-muted-foreground dark:text-[#EEEEEE] text-captionSmall">{date}</span>

        <h1 className="text-foreground dark:text-[#EEEEEE] text-hero break-words">
          {antipattern.title || "제목 없음"}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {antipattern.tags && antipattern.tags.length > 0 && (
            <>
              {antipattern.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {summary && (
          <div className="flex flex-col space-y-2 px-6 py-4 bg-background-accent dark:bg-gray-800/50 border border-systemBlue dark:border-gray-600 rounded-lg">
            <div className="flex items-center gap-2">
              <h2 className="text-systemBlue dark:text-gray-200 text-subheadSemibold">Summary</h2>
            </div>
            <div className="text-systemBlue dark:text-gray-200 text-bodyRegular">
              <MarkdownRenderer content={summary} />
            </div>
          </div>
        )}

        <div className="flex flex-col mb-8">
          <h2 className="text-foreground dark:text-[#EEEEEE] text-primary mb-4">Why Wrong?</h2>
          <div className="text-foreground dark:text-[#EEEEEE] text-bodyRegular">
            <MarkdownRenderer content={whyWrong} />
          </div>
        </div>

        <div className="flex flex-col mb-8">
          <h2 className="text-foreground dark:text-[#EEEEEE] text-primary mb-4">How to Fix?</h2>
          <div className="text-foreground dark:text-[#EEEEEE] text-bodyRegular">
            <MarkdownRenderer content={fix} />
          </div>
        </div>

        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-systemRed" />
            <h2 className="text-foreground dark:text-[#EEEEEE] text-primary pb-1">Before Code (Bad)</h2>
          </div>
          <CodeRenderer code={antipattern.beforeCode} />
        </div>

        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-systemGreen" />
            <h2 className="text-foreground dark:text-[#EEEEEE] text-primary pb-1">After Code (Good)</h2>
          </div>
          <CodeRenderer code={antipattern.afterCode} />
        </div>

        {/* Links Section */}
        {antipattern.links && antipattern.links.length > 0 && (
          <div className="flex flex-col mb-8">
            <h2 className="text-foreground dark:text-[#EEEEEE] text-primary mb-4">You Might Also Like</h2>
            <div className="space-y-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {antipattern.links.map((linkItem, index) => (
                <a
                  key={index}
                  href={linkItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-muted-foreground text-captionMedium mb-1">{linkItem.relatedTo}</div>
                      <div className="text-systemPink group-hover:text-systemPink/80 transition-colors duration-200 text-bodyRegular truncate">
                        {linkItem.link}
                      </div>
                    </div>
                    <LinkIcon className="w-4 h-4 text-muted-foreground group-hover:text-systemPink transition-colors duration-200 flex-shrink-0 ml-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
