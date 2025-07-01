import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer, Header } from "@/components/Layout";
import GoogleAnalytics from "@/widgets/GoogleAnalytics";
import { ThemeProvider } from "next-themes";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    default: "Smelly.dev - 프론트엔드 안티패턴 가이드",
    template: "%s | Smelly.dev",
  },
  description:
    "프론트엔드 안티패턴을 매일 하나씩 소개합니다. 프론트엔드 개발에서 피해야 할 패턴들을 예제와 함께 설명합니다.",
  keywords: ["프론트엔드", "안티패턴", "React", "Vue", "Angular", "JavaScript", "TypeScript", "웹개발"],
  authors: [{ name: "Smelly.dev" }],
  metadataBase: new URL("https://smelly-dev.vercel.app/"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://smelly-dev.vercel.app/",
    title: "Smelly.dev - 프론트엔드 안티패턴 가이드",
    description: "프론트엔드 안티패턴을 매일 하나씩 소개합니다.",
    siteName: "Smelly.dev",
  },
  twitter: {
    title: "Smelly.dev - 프론트엔드 안티패턴 가이드",
    description: "프론트엔드 안티패턴을 매일 하나씩 소개합니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`} suppressHydrationWarning>
      <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
      </head>
      <body
        className={`${pretendard.className} flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-[#EEEEEE]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="smelly-theme"
          themes={["light", "dark", "system"]}
        >
          <Header />
          <main className="mt-20 flex-1">
            <div className="max-w-4xl mx-auto px-4 py-8 mb-8 h-full flex flex-col overflow-hidden">{children}</div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
