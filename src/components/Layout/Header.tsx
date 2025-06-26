"use client";

import React from "react";
import { Logo } from "@/widgets";
import { useRouter, usePathname } from "next/navigation";
import { getActiveTab, NAVIGATION_TABS } from "@/utils/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (href: string) => {
    router.push(href);
  };

  const activeTab = getActiveTab(pathname || "");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-systemBackground-border">
      <div className="flex justify-between items-center py-4 px-6">
        <button className="w-52 overflow-hidden" onClick={() => router.push("/")}>
          <Logo />
        </button>

        <nav className="flex gap-1">
          {NAVIGATION_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.href)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "text-systemPink" : "text-systemGray-1 hover:text-systemGray-2"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
