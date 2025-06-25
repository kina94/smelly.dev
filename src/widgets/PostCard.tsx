"use client";

import { Antipattern } from "@/shared/types";
import { unescapeNewlines, toDate, stripMarkdownCodeBlock } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";
import { MarkdownRenderer, Badge } from "@/shared/ui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function PostCard({ antipattern }: { antipattern: Antipattern }) {
  const date = dayjs(toDate(antipattern.updatedAt)).format("YYYY-MM-DD");

  const fix = unescapeNewlines(antipattern.howToFix);
  const whyWrong = unescapeNewlines(antipattern.whyWrong);
  const summary = unescapeNewlines(antipattern.summary);

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 bg-white z-10 pb-4 border-b border-systemBackground-border">
        <div className="flex justify-between items-center">
          <span className="text-label-secondary text-captionSmall">{date}</span>
          <div className="flex gap-2">
            <Badge variant="default" className="text-xs">
              {antipattern.type}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {antipattern.difficulty}
            </Badge>
          </div>
        </div>
        <h3 className="text-label-primary text-large break-words mt-2">{antipattern.title}</h3>

        {/* Tags */}
        {antipattern.tags && antipattern.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {antipattern.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="pt-6 space-y-8">
        <div className="flex flex-col gap-2">
          <h4 className="text-label-primary text-primary pb-1">Why Wrong?</h4>
          <div className="text-label-primary text-bodyRegular">
            <MarkdownRenderer content={whyWrong} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-label-primary text-primary pb-1">How to Fix?</h4>
          <div className="text-label-primary text-bodyRegular">
            <MarkdownRenderer content={fix} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-label-primary text-primary pb-1">Summary</h4>
          <div className="text-label-primary text-bodyRegular">
            <MarkdownRenderer content={summary} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-label-primary text-primary pb-1">Before Code</h4>
          <SyntaxHighlighter
            language="javascript"
            style={prism}
            customStyle={{
              borderRadius: 14,
              fontSize: 14,
              padding: 16,
            }}
          >
            {stripMarkdownCodeBlock(antipattern.beforeCode)}
          </SyntaxHighlighter>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-label-primary text-primary pb-1">After Code</h4>
          <SyntaxHighlighter
            language="javascript"
            style={prism}
            customStyle={{ borderRadius: 14, fontSize: 14, padding: 16 }}
            wrapLongLines={true}
          >
            {stripMarkdownCodeBlock(antipattern.afterCode)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
