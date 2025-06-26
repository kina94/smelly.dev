"use client";

import { Antipattern } from "@/shared/types";
import { getDifficultyVariant, toDate } from "@/utils/etc";
import dayjs from "dayjs";
import React from "react";
import { Badge, BadgeGroup } from "@/shared/ui";
import Link from "next/link";

export default function ArticlePreview({ antipattern, index }: { antipattern: Antipattern; index: number }) {
  const date = dayjs(toDate(antipattern.updatedAt)).format("YYYY-MM-DD");

  return (
    <Link
      className="block border-b border-systemBackground-border cursor-pointer transition-all duration-300 ease-in-out rounded-lg hover:translate-x-2 first:pt-0 py-6 md:py-10"
      href={`/antipatterns/${antipattern.id || ""}`}
      prefetch={true}
    >
      <div className="flex justify-between items-center">
        <span className="text-label-secondary text-captionSmall text-xs md:text-sm">{date}</span>
        <div className="flex gap-2"></div>
      </div>
      <div className="flex flex-col gap-1 md:gap-2">
        <h3 className="text-label-primary text-base md:text-large break-words mt-1 md:mt-2">
          #{index}. {antipattern.title || "제목 없음"}
        </h3>
        <span className="text-label-secondary text-sm md:text-bodyRegular line-clamp-2">
          {antipattern.summary || "요약 없음"}
        </span>
      </div>
      {/* Tags */}
      {antipattern.tags && antipattern.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-3 justify-between">
          <BadgeGroup badges={antipattern.tags} variant="outline" />
          <div className="flex gap-1 md:gap-2">
            <Badge variant="default" className="text-xs">
              {antipattern.type || "기타"}
            </Badge>
            <Badge variant={getDifficultyVariant(antipattern.difficulty || "중급")} className="text-xs">
              {antipattern.difficulty || "중급"}
            </Badge>
          </div>
        </div>
      )}
    </Link>
  );
}
