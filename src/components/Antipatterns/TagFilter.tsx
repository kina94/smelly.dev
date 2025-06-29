"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";

export default function TagFilter({
  availableTags,
  selectedTags,
}: {
  availableTags: string[];
  selectedTags: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAccordionOpen, setIsAccordionOpen] = useState<string | undefined>(undefined);

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (selectedTags.includes(tag)) {
      // 이미 선택된 태그면 제거
      const newTags = selectedTags.filter((t) => t !== tag);
      if (newTags.length > 0) {
        params.set("tags", newTags.join(","));
      } else {
        params.delete("tags");
      }
    } else {
      // 선택되지 않은 태그면 추가
      const newTags = [...selectedTags, tag];
      params.set("tags", newTags.join(","));
    }

    // 커서를 제거하여 첫 페이지로 리셋
    params.delete("cursor");

    const url = `/antipatterns?${params.toString()}`;
    router.push(url);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("tags");
    params.delete("cursor");

    const url = `/antipatterns?${params.toString()}`;
    router.push(url);
  };

  return (
    <div>
      <Accordion type="single" className="w-full" value={isAccordionOpen} onValueChange={setIsAccordionOpen}>
        <AccordionItem value="tag-filter">
          <AccordionTrigger className="!text-label-primary !text-subheadSemibold">태그 필터</AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="flex mb-4 justify-between items-center">
                <span className="text-captionRegular text-label-tertiary">{selectedTags.length}개 선택됨</span>
                {selectedTags.length > 0 && (
                  <button
                    onClick={handleClearFilter}
                    className="text-captionRegular text-systemPink hover:text-systemPink/80 transition-colors"
                  >
                    모두 해제
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-systemPink text-white"
                        : "bg-white text-captionSmall text-zinc-600 hover:bg-gray-100 outline outline-1 outline-systemGray-4"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
