"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { AVAILABLE_TAGS } from "@/shared/constants/tags";

export default function TagFilter({ selectedTags }: { selectedTags: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <Accordion type="single" className="w-full" collapsible>
      <AccordionItem value="tag-filter">
        <AccordionTrigger className="!text-label-primary !text-subheadSemibold">
          <div className="flex items-center">
            태그 필터
            {selectedTags.length > 0 && (
              <span className="text-captionSmall text-systemPink bg-systemPink/10 px-2 py-1 rounded-full ml-2">
                {selectedTags.length}개
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            <div className="flex mb-4 justify-end items-center">
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
              {AVAILABLE_TAGS.map((tag) => (
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
  );
}
