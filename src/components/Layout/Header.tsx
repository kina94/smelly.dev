"use client";

import React, { useState } from "react";
import { Logo } from "@/widgets";
import { usePathname } from "next/navigation";
import { getActiveTab, NAVIGATION_TABS } from "@/utils/navigation";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex justify-between items-center py-8 px-4">
        <Link className="w-40 overflow-hidden" href="/" prefetch={true}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {NAVIGATION_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <Link
                key={tab.id}
                prefetch={true}
                href={tab.href}
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg transition-colors ${
                  isActive ? "text-systemPink" : "text-systemGray-1 hover:text-systemGray-2"
                }`}
              >
                <span className="text-sm font-medium">{tab.label}</span>
              </Link>
            );
          })}
          <a
            href="https://github.com/kina94/smelly.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-systemGray-6 hover:bg-systemGray-5 transition-colors"
            title="GitHub"
          >
            <Github size={16} className="text-systemGray-1" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-systemGray-6 hover:bg-systemGray-5 transition-colors"
          aria-label="메뉴 열기"
        >
          {isMenuOpen ? (
            <X size={16} className="text-systemGray-1" />
          ) : (
            <Menu size={16} className="text-systemGray-1" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full right-0 w-64 h-screen bg-white border-l border-systemGray-6 shadow-lg transform transition-all duration-300 ease-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col py-4">
          <a
            href="https://github.com/kina94/smelly.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 text-systemGray-1 hover:bg-systemGray-6 transition-colors"
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
                  isActive ? "text-systemPink bg-systemPink/5" : "text-systemGray-1 hover:bg-systemGray-6"
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
