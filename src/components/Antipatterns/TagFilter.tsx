"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  totalCount?: number;
}

export default function TagFilter({ availableTags, selectedTags, totalCount }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleTagClick = async (tag: string) => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams);
    const currentTags = params.get("tags")?.split(",").filter(Boolean) || [];

    let newTags: string[];
    if (currentTags.includes(tag)) {
      // 태그 제거
      newTags = currentTags.filter((t) => t !== tag);
    } else {
      // 태그 추가
      newTags = [...currentTags, tag];
    }

    // 페이지를 1로 리셋
    params.set("page", "1");

    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    } else {
      params.delete("tags");
    }

    router.push(`/antipatterns?${params.toString()}`);
  };

  const clearAllTags = async () => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams);
    params.delete("tags");
    params.set("page", "1");
    router.push(`/antipatterns?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">태그 필터</h3>
          {totalCount !== undefined && (
            <p className="text-sm text-gray-600 mt-1">
              총 {totalCount}개의 안티패턴
              {selectedTags.length > 0 && ` (선택된 태그: ${selectedTags.join(", ")})`}
            </p>
          )}
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={clearAllTags}
            disabled={isLoading}
            className="text-sm text-blue-600 hover:text-blue-800 underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "처리 중..." : "모든 태그 해제"}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            disabled={isLoading}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              selectedTags.includes(tag) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
