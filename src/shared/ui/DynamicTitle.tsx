"use client";

import { usePathname } from "next/navigation";
import Title from "./Title";
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
    <div>
      {pathname && pathname.startsWith("/antipatterns/") && <BackButton url={"/antipatterns"} />}
      <Title title={title} />
    </div>
  );
}
