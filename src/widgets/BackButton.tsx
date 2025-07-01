"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-captionRegular mb-4 text-gray-500 hover:text-gray-400 dark:text-[#EEEEEE] dark:hover:text-[#EEEEEE]/80"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      뒤로가기
    </button>
  );
}
