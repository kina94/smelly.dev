"use client";

import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { stripMarkdownCodeBlock } from "@/utils/etc";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function CodeRenderer({ code }: { code: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버 사이드 렌더링 시에는 기본 스타일 사용
  const currentStyle = mounted ? (theme === "dark" ? oneDark : prism) : prism;

  return (
    <SyntaxHighlighter
      language="javascript"
      style={currentStyle}
      customStyle={{ borderRadius: 14, fontSize: 12, padding: 12, margin: 0 }}
      wrapLongLines={true}
    >
      {stripMarkdownCodeBlock(code || "")}
    </SyntaxHighlighter>
  );
}
