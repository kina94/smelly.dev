import { House, List, Bookmark, User, HomeIcon } from "lucide-react";

export interface NavigationTab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
}

export const footerTabs: NavigationTab[] = [
  {
    id: "home",
    label: "홈화면",
    icon: HomeIcon,
    href: "/",
  },
  {
    id: "antipatterns",
    label: "안티패턴",
    icon: List,
    href: "/antipatterns",
  },
  {
    id: "bookmarks",
    label: "북마크",
    icon: Bookmark,
    href: "/bookmarks",
  },
  {
    id: "user",
    label: "유저",
    icon: User,
    href: "/user",
  },
];

export const getActiveTab = (pathname: string): string => {
  if (!pathname) return "home";
  if (pathname === "/") return "home";
  if (pathname.startsWith("/antipatterns")) return "antipatterns";
  if (pathname.startsWith("/bookmarks")) return "bookmarks";
  if (pathname.startsWith("/user")) return "user";
  return "home";
};
