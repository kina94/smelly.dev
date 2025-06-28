"use client";

import React from "react";
import { Logo } from "@/widgets";
import { usePathname } from "next/navigation";
import { getActiveTab, NAVIGATION_TABS } from "@/utils/navigation";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const activeTab = getActiveTab(pathname || "");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-systemBackground-border">
      <div className="flex justify-between items-center py-3 md:py-4 px-4 md:px-6">
        <Link className="w-40 md:w-52 overflow-hidden" href="/" prefetch={true}>
          <Logo />
        </Link>

        <nav className="flex gap-1">
          {NAVIGATION_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Link
                key={tab.id}
                prefetch={true}
                href={tab.href}
                className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg transition-colors ${
                  isActive ? "text-systemPink" : "text-systemGray-1 hover:text-systemGray-2"
                }`}
              >
                <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                <span className="text-xs md:text-sm font-medium">{tab.label}</span>
              </Link>
            );
          })}

          <a
            href="https://github.com/kina94/smelly.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-systemGray-6 hover:bg-systemGray-5 transition-colors"
            title="GitHub"
          >
            <Github size={16} className="md:w-[18px] md:h-[18px] text-systemGray-1" />
          </a>
        </nav>
      </div>
    </header>
  );
}
