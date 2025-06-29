import React from "react";

export default function ArticlePreviewSkeleton() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="py-9 mx-auto">
          {/* Date and badges row */}
          <div className="flex justify-between items-center">
            {/* Date skeleton */}
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Title and summary */}
          <div className="flex flex-col gap-2 mt-2">
            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Summary skeleton */}
            <div className="space-y-1">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Tags section */}
          <div className="flex flex-wrap gap-2 mt-3 justify-between">
            {/* Left side tags */}
            <div className="flex flex-wrap gap-2">
              <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
