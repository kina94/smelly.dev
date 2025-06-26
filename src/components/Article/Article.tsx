import { Antipattern } from "@/shared/types";
import { unescapeNewlines, stripMarkdownCodeBlock, getDifficultyVariant, formatDate } from "@/utils/etc";

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

  return (
    <div>
      <div className="sticky top-0 bg-white z-10 pb-3 md:pb-4 border-b border-systemBackground-border">
        <div className="flex justify-between items-center">
          <span className="text-label-secondary text-captionSmall text-xs md:text-sm">{date}</span>
          <div className="flex gap-1 md:gap-2">
            <Badge variant="default" className="text-xs">
              {antipattern.type || "기타"}
            </Badge>
            <Badge variant={getDifficultyVariant(antipattern.difficulty || "중급")} className="text-xs">
              {antipattern.difficulty || "중급"}
            </Badge>
          </div>
        </div>
        <h3 className="text-label-primary text-base md:text-large break-words mt-1 md:mt-2">
          {antipattern.title || "제목 없음"}
        </h3>

        {/* Tags */}
        {antipattern.tags && antipattern.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-3">
            {antipattern.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 md:pt-6 space-y-6 md:space-y-8">
        {summary && (
          <div className="flex flex-col gap-2 md:gap-3 px-6 py-4 bg-[#f0f8ff] border border-systemBlue rounded-lg">
            <div className="flex items-center gap-2">
              <h4 className="text-systemBlue font-semibold text-sm md:text-base">Summary</h4>
            </div>
            <div className="text-systemBlue text-sm md:text-bodyRegular leading-relaxed">
              <MarkdownRenderer content={summary} />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 md:gap-2">
          <h4 className="text-label-primary text-primary pb-1 text-sm md:text-base">Why Wrong?</h4>
          <div className="text-label-primary text-sm md:text-bodyRegular">
            <MarkdownRenderer content={whyWrong} />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-2">
          <h4 className="text-label-primary text-primary pb-1 text-sm md:text-base">How to Fix?</h4>
          <div className="text-label-primary text-sm md:text-bodyRegular">
            <MarkdownRenderer content={fix} />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-2">
          <h4 className="text-label-primary text-primary pb-1 text-sm md:text-base">Before Code</h4>
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

        <div className="flex flex-col gap-1 md:gap-2">
          <h4 className="text-label-primary text-primary pb-1 text-sm md:text-base">After Code</h4>
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
