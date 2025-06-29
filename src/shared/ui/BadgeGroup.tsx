import * as React from "react";
import { Badge } from "./Badge";
import { cn } from "@/utils/etc";

interface BadgeGroupProps {
  badges: string[];
  variant?: "default" | "secondary" | "destructive" | "outline" | "yellow" | "green" | "pink";
  className?: string;
  maxVisibleOnMobile?: number;
}

export function BadgeGroup({ badges, variant = "outline", className, maxVisibleOnMobile = 3 }: BadgeGroupProps) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-1 md:gap-2", className)}>
      {/* Desktop: 모든 태그 표시 */}
      <div className="hidden md:flex flex-wrap gap-1 md:gap-2">
        {badges.map((badge, index) => (
          <Badge key={index} variant={variant} className="text-xs">
            {badge}
          </Badge>
        ))}
      </div>

      {/* Mobile: 첫 번째 태그만 표시하고 나머지는 "..." */}
      <div className="flex md:hidden flex-wrap gap-1 md:gap-2">
        {badges.slice(0, maxVisibleOnMobile).map((badge, index) => (
          <Badge key={index} variant={variant} className="text-xs">
            {badge}
          </Badge>
        ))}
        {badges.length > maxVisibleOnMobile && (
          <Badge variant={variant} className="text-xs">
            ...
          </Badge>
        )}
      </div>
    </div>
  );
}
