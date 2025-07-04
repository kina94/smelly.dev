import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/etc";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-systemBlue text-white",
        secondary: "border-transparent bg-systemPink text-white",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "text-foreground border-border bg-background dark:text-[#EEEEEE] dark:border-gray-700 dark:bg-gray-800/80",
        yellow: "border-transparent bg-systemYellow text-black",
        green: "border-transparent bg-systemGreen text-white",
        pink: "border-transparent bg-systemPink text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
