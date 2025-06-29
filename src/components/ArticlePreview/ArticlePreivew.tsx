import { Antipattern } from "@/shared/types";
import { formatDate } from "@/utils/etc";
import React from "react";
import { BadgeGroup } from "@/shared/ui";
import Link from "next/link";

export default function ArticlePreview({ antipattern }: { antipattern: Antipattern }) {
  const date = formatDate(antipattern.updatedAt);

  return (
    <Link
      className="block cursor-pointer transition-all duration-300 ease-in-out rounded-lg hover:translate-x-2 py-8"
      href={`/antipatterns/${antipattern.id || ""}`}
      prefetch={true}
    >
      <span className="text-label-secondary text-captionSmall">{date}</span>
      <div className="flex flex-col gap-2">
        <h3 className="text-label-primary text-primary break-words">{antipattern.title || "제목 없음"}</h3>
        <span className="text-label-secondary text-bodyRegular line-clamp-2">{antipattern.summary || "요약 없음"}</span>
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3 justify-between">
        {antipattern.tags && antipattern.tags.length > 0 && <BadgeGroup badges={antipattern.tags} variant="outline" />}
      </div>
    </Link>
  );
}
