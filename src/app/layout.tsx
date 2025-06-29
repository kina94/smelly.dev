import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Layout";
import GoogleAnalytics from "@/widgets/GoogleAnalytics";

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
  metadataBase: new URL("https://smelly.dev"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://smelly.dev",
    title: "Smelly.dev - 프론트엔드 안티패턴 가이드",
    description: "프론트엔드 안티패턴을 매일 하나씩 소개합니다.",
    siteName: "Smelly.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`}>
      <body className={pretendard.className}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
        <Header />
        <main className="mt-20">
          <div className="w-full px-4 py-8 h-full flex flex-col">
            <div className="h-full flex flex-col overflow-x-hidden">
              <div className="max-w-4xl mx-auto w-full">{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
