"use client";

import { useRouter, usePathname } from "next/navigation";
import { footerTabs, getActiveTab } from "@/utils/navigation";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (href: string) => {
    router.push(href);
  };

  const activeTab = getActiveTab(pathname || "");

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 px-4 bg-systemBackground-surface1 border-t border-systemBackground-border">
      {footerTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.href)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive ? "text-systemBlue" : "text-systemGray-1"
            }`}
          >
            <Icon size={20} className={`mb-1 ${isActive ? "text-systemBlue" : "text-systemGray-1"}`} />
            <span className={`text-xs font-medium ${isActive ? "text-systemBlue" : "text-systemGray-1"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
}
