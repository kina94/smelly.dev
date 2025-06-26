"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton({ url }: { url: string }) {
  const router = useRouter();

  return (
    <Link
      href={url}
      prefetch={true}
      className="flex items-center gap-2 text-captionRegular mb-4 text-gray-600 hover:text-gray-500"
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
    </Link>
  );
}
