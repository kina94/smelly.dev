"use client";

import React from "react";
import { Logo } from "@/widgets";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-6 px-6 bg-white border-b border-systemBackground-border">
      <button className="w-52 overflow-hidden" onClick={() => router.push("/")}>
        <Logo />
      </button>
    </header>
  );
}
