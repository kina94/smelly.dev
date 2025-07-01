"use client";

import { useTheme } from "@/shared/contexts/ThemeContext";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { stripMarkdownCodeBlock } from "@/utils/etc";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function CodeBox({ code }: { code: string }) {
  const { theme } = useTheme();

  return (
    <SyntaxHighlighter
      language="javascript"
      style={theme === "dark" ? oneDark : prism}
      customStyle={{ borderRadius: 14, fontSize: 12, padding: 12, margin: 0 }}
      wrapLongLines={true}
    >
      {stripMarkdownCodeBlock(code || "")}
    </SyntaxHighlighter>
  );
}
