"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TagFilter({
  availableTags,
  selectedTags,
}: {
  availableTags: string[];
  selectedTags: string[];
}) {
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

    // 페이지를 1로 리셋
    params.set("page", "1");

    const url = `/antipatterns?${params.toString()}`;
    router.push(url);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.delete("tags");
    params.set("page", "1");

    const url = `/antipatterns?${params.toString()}`;
    router.push(url);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">태그 필터</h3>
        {/* {selectedTags.length > 0 && <button onClick={handleClearFilter}>필터 초기화</button>} */}
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
  );
}
