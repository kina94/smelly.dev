import { Antipattern } from "@/shared/types";
import { unescapeNewlines, stripMarkdownCodeBlock, formatDate } from "@/utils/etc";

import React from "react";
import { Badge } from "@/shared/ui";
import { MarkdownRenderer } from "@/widgets";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code2, Link as LinkIcon } from "lucide-react";

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

  return (
    <div>
      {/* JSON-LD 구조화 데이터 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="flex flex-col mb-8 pb-3 border-b border-gray-200 gap-3">
        <span className="text-label-secondary text-captionSmall">{date}</span>

        <h1 className="text-label-primary text-hero break-words">{antipattern.title || "제목 없음"}</h1>

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
          <div className="flex flex-col space-y-2 px-6 py-4 bg-background-accent border border-systemBlue rounded-lg">
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
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-systemRed" />
            <h2 className="text-label-primary text-primary pb-1">Before Code (Bad)</h2>
          </div>
          <SyntaxHighlighter
            language="javascript"
            style={prism}
            customStyle={{
              borderRadius: 14,
              fontSize: 12,
              padding: 12,
              margin: 0,
            }}
          >
            {stripMarkdownCodeBlock(antipattern.beforeCode || "")}
          </SyntaxHighlighter>
        </div>

        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-systemGreen" />
            <h2 className="text-label-primary text-primary pb-1">After Code (Good)</h2>
          </div>
          <SyntaxHighlighter
            language="javascript"
            style={prism}
            customStyle={{ borderRadius: 14, fontSize: 12, padding: 12, margin: 0 }}
            wrapLongLines={true}
          >
            {stripMarkdownCodeBlock(antipattern.afterCode || "")}
          </SyntaxHighlighter>
        </div>

        {/* Links Section */}
        {antipattern.links && antipattern.links.length > 0 && (
          <div className="flex flex-col mb-8">
            <h2 className="text-label-primary text-primary mb-4">You Might Also Like</h2>
            <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
              {antipattern.links.map((linkItem, index) => (
                <a
                  key={index}
                  href={linkItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block hover:bg-background-hover transition-colors duration-200 border-b border-systemBackground-border last:border-b-0"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-label-secondary text-captionMedium mb-1">{linkItem.relatedTo}</div>
                      <div className="text-systemPink group-hover:text-systemPink/80 transition-colors duration-200 text-bodyRegular truncate">
                        {linkItem.link}
                      </div>
                    </div>
                    <LinkIcon className="w-4 h-4 text-label-secondary group-hover:text-systemPink transition-colors duration-200 flex-shrink-0 ml-3" />
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
