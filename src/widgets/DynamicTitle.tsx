"use client";

import { usePathname } from "next/navigation";
import BackButton from "./BackButton";

function getTitleByPathname(pathname: string): string {
  switch (pathname) {
    case "/":
      return "Today's Antipattern";
    case "/antipatterns":
      return "All Antipatterns";
    case "/bookmarks":
      return "Bookmarks";
    case "/user":
      return "User";
    default:
      if (pathname.startsWith("/antipatterns/")) {
        return "Details";
      }
      return "Smelly.dev";
  }
}

export default function DynamicTitle() {
  const pathname = usePathname();
  const title = getTitleByPathname(pathname || "/");

  return (
    <div className="max-w-4xl mx-auto">
      {pathname && pathname.startsWith("/antipatterns/") && <BackButton />}
      <h1 className="text-left mb-12 text-hero">{title}</h1>
    </div>
  );
}
