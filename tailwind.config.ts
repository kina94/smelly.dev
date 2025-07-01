import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        brand: {
          primary: "#DD4A68", // 로고 색상
          secondary: "#07a", // systemBlue
        },

        // Semantic Colors
        semantic: {
          success: "#34C759", // systemGreen
          warning: "#FFC000", // systemYellow
          error: "#FF3830", // systemRed
          info: "#5AC8FA", // systemTeal
        },

        // Gray Scale (통합된 회색 팔레트)
        gray: {
          50: "#F9F9F9", // 가장 연한 회색
          100: "#F2F2F7", // systemGray-6
          200: "#E5E5EA", // systemGray-5
          300: "#D1D1D6", // systemGray-4
          400: "#C7C7CC", // systemGray-3
          500: "#AEAEB2", // systemGray-2
          600: "#8E8E93", // systemGray-1
          700: "#636366",
          800: "#48484A",
          900: "#1C1C1E",
        },

        // Background Colors
        background: {
          accent: "#F0F8FF", // 연한 파란색 배경
          hover: "#F8F9FA", // 호버 배경색
          border: "#D1D1D6", // systemBackground-stroke
        },

        // Text Colors
        text: {
          primary: "#222222", // label-primary
          secondary: "#3C3C43", // label-secondary
          tertiary: "#8E8E93", // systemGray-1
          quaternary: "#AEAEB2", // systemGray-2
          muted: "#C7C7CC", // systemGray-3
        },

        // Legacy Support (기존 코드 호환성)
        systemRed: "#FF3830",
        systemYellow: "#FFC000",
        systemGreen: "#34C759",
        systemTeal: "#5AC8FA",
        systemBlue: "#07a",
        systemPink: "#DD4A68",

        label: {
          primary: "#222222",
          secondary: "#3C3C43",
          tertiary: "#3C3C43",
          quaternary: "#3C3C43",
        },
        systemBackground: {
          main: "#FFFFFF",
          surface1: "#FAFAFA",
          surface2: "#F5F5F5",
          surface3: "#161616",
          stroke: "#D1D1D6",
          border: "#D1D1D6", // 누락된 border 컬러 추가
        },
      },
      fontSize: {
        hero: [
          "1.875rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "700",
          },
        ],
        large: [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "700",
          },
        ],
        primary: [
          "20px",
          {
            lineHeight: "28px",
            fontWeight: "700",
          },
        ],
        subheadSemibold: [
          "18px",
          {
            lineHeight: "24px",
            fontWeight: "600",
          },
        ],
        subheadMedium: [
          "18px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        bodySemibold: [
          "16px",
          {
            lineHeight: "27px",
            fontWeight: "600",
          },
        ],
        bodyRegular: [
          "16px",
          {
            lineHeight: "28px",
            fontWeight: "400",
          },
        ],
        captionMedium: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
        captionRegular: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        captionSmall: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "400",
          },
        ],
        label: [
          "10px",
          {
            lineHeight: "12px",
            fontWeight: "500",
            letterSpacing: "0.08em",
          },
        ],
        tabbar: [
          "10px",
          {
            lineHeight: "12px",
            fontWeight: "500",
          },
        ],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
