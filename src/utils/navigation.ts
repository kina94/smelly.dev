export interface NavigationTab {
  id: string;
  label: string;
  href: string;
}

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    id: "home",
    label: "Today's Antipattern",
    href: "/",
  },
  {
    id: "antipatterns",
    label: "All Posts",
    href: "/antipatterns",
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
