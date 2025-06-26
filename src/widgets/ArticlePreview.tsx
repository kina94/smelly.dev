"use client";

import { Antipattern } from "@/shared/types";
import { toDate } from "@/lib/utils";
import dayjs from "dayjs";
import React from "react";
import { Badge } from "@/shared/ui";
import { useRouter } from "next/navigation";

export default function ArticlePreview({ antipattern }: { antipattern: Antipattern }) {
  const router = useRouter();
  const date = dayjs(toDate(antipattern.updatedAt)).format("YYYY-MM-DD");

  const handleOnClick = () => {
    router.push(`/antipatterns/${antipattern.id}`);
  };

  return (
    <div className="border-b border-systemBackground-border py-8 cursor-pointer" onClick={handleOnClick}>
      <div className="flex justify-between items-center">
        <span className="text-label-secondary text-captionSmall">{date}</span>
        <div className="flex gap-2"></div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-label-primary text-large break-words mt-2">{antipattern.title}</h3>
        <span className="text-label-secondary text-bodyRegular">{antipattern.summary}</span>
      </div>
      {/* Tags */}
      {antipattern.tags && antipattern.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {antipattern.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Badge variant="default" className="text-xs">
              {antipattern.type}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {antipattern.difficulty}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}
