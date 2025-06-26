export default function PostCardSkeleton() {
  return (
    <div>
      {/* Header Section */}
      <div className="sticky top-0 bg-white z-10 pb-4 border-b border-systemBackground-border">
        <div className="flex justify-between items-center">
          {/* Date skeleton */}
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>

          {/* Badges skeleton */}
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Title skeleton */}
        <div className="mt-2 space-y-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-6 space-y-8">
        {/* Why Wrong Section */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* How to Fix Section */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Before Code Section */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="bg-gray-100 rounded-lg p-4 h-32 animate-pulse"></div>
        </div>

        {/* After Code Section */}
        <div className="flex flex-col gap-2">
          <div className="h-5 w-22 bg-gray-200 rounded animate-pulse"></div>
          <div className="bg-gray-100 rounded-lg p-4 h-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
