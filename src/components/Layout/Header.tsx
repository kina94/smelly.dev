"use client";

import React, { useState } from "react";
import { Logo } from "@/widgets";
import { usePathname } from "next/navigation";
import { getActiveTab, NAVIGATION_TABS } from "@/utils/navigation";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeTab = getActiveTab(pathname || "");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center py-8 px-4">
        <Link className="w-40 overflow-hidden" href="/" prefetch={true}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-3 items-center">
          {NAVIGATION_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <Link
                key={tab.id}
                prefetch={true}
                href={tab.href}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "text-systemPink"
                    : "text-gray-600 hover:text-gray-500 dark:text-[#EEEEEE] dark:hover:text-[#EEEEEE]/80"
                }`}
              >
                <span className="text-sm font-medium">{tab.label}</span>
              </Link>
            );
          })}
          <ThemeToggle />
          <a
            href="https://github.com/kina94/smelly.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            title="GitHub"
          >
            <Github size={16} className="text-gray-600 dark:text-[#EEEEEE]" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="메뉴 열기"
        >
          {isMenuOpen ? (
            <X size={16} className="text-gray-600 dark:text-[#EEEEEE]" />
          ) : (
            <Menu size={16} className="text-gray-600 dark:text-[#EEEEEE]" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full right-0 w-64 h-screen bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-700 shadow-lg transform transition-all duration-300 ease-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col py-4">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-600 dark:text-[#EEEEEE]">테마</span>
            <ThemeToggle />
          </div>
          <a
            href="https://github.com/kina94/smelly.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 text-gray-600 dark:text-[#EEEEEE] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={closeMenu}
          >
            <Github size={16} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          {NAVIGATION_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <Link
                key={tab.id}
                prefetch={true}
                href={tab.href}
                className={`flex items-center px-4 py-3 transition-colors ${
                  isActive
                    ? "text-systemPink bg-systemPink/5 dark:bg-systemPink/10"
                    : "text-gray-600 dark:text-[#EEEEEE] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                <span className="text-sm font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
