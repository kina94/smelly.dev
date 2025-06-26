import { List, HomeIcon, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NavigationTab {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  href: string;
}

export const NAVIGATION_TABS: NavigationTab[] = [
  {
    id: "home",
    label: "홈",
    icon: HomeIcon,
    href: "/",
  },
  {
    id: "antipatterns",
    label: "안티패턴",
    icon: List,
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
