"use client";

import { Antipattern } from "@/shared/types";
import { formatDate } from "@/utils/etc";
import React from "react";
import { BadgeGroup } from "@/shared/ui";
import Link from "next/link";

export default function ArticlePreview({ antipattern, index }: { antipattern: Antipattern; index: number }) {
  const date = formatDate(antipattern.updatedAt);

  return (
    <Link
      className="block cursor-pointer transition-all duration-300 ease-in-out rounded-lg hover:translate-x-2 first:pt-0 py-10"
      href={`/antipatterns/${antipattern.id || ""}`}
      prefetch={true}
    >
      <div className="flex justify-between items-center">
        <span className="text-label-secondary text-captionSmall">{date}</span>
        <div className="flex gap-2"></div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-label-primary text-primary break-words">
          #{index}. {antipattern.title || "제목 없음"}
        </h3>
        <span className="text-label-secondary text-bodyRegular line-clamp-2">{antipattern.summary || "요약 없음"}</span>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3 justify-between">
        {antipattern.tags && antipattern.tags.length > 0 && <BadgeGroup badges={antipattern.tags} variant="outline" />}
      </div>
    </Link>
  );
}
