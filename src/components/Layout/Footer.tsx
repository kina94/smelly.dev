import React from "react";
import { Logo } from "@/widgets";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="w-32">
              <Logo />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed break-words">
              안티패턴을 통해 더 나은 코드를 작성하는 방법을 배워보세요. 개발자들이 실수하는 패턴들을 분석하고
              개선방안을 제시합니다.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-200">연결하기</h3>
            <div className="flex space-x-3">
              <a
                href="https://github.com/kina94/smelly.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="GitHub"
              >
                <Github size={16} className="text-gray-600 dark:text-gray-300" />
              </a>
              <a
                href="mailto:chase245@naver.com"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="이메일"
              >
                <Mail size={16} className="text-gray-600 dark:text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 ">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-gray-400 dark:text-gray-400">© {currentYear} Smelly.dev All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
