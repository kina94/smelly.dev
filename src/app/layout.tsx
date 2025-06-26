import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DynamicTitle } from "@/widgets";
import { Header } from "@/components/Layout";
import GoogleAnalytics from "@/widgets/GoogleAnalytics";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Smelly.dev",
  description: "자주 발생하는 프론트엔드 안티패턴을 매일 하나씩 소개합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} antialiased`}>
      <body className={pretendard.className}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""} />
        <Header />
        <main className="pt-24 overflow-hidden">
          <div className="w-full px-4 py-8 h-full flex flex-col">
            <div className="w-full">
              <DynamicTitle />
            </div>
            <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col">
              <div className="max-w-4xl mx-auto w-full">{children}</div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
