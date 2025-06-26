import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DynamicTitle } from "@/widgets";
import { Footer, Header } from "@/components/Layout";

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
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-1 pt-32 pb-20">
            <div className="mx-auto w-full max-w-4xl px-4 py-8">
              <DynamicTitle />
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
