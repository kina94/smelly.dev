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
        // System color
        systemRed: "#FF3830",
        systemOrange: "#FF9500",
        systemYellow: "#FFC000",
        systemGreen: "#34C759",
        systemTeal: "#5AC8FA",
        systemBlue: "#07a",
        systemIndigo: "#5856D6",
        systemPurple: "#AF52DE",
        systemPink: "#DD4A68",

        // System grayscale
        systemGray: {
          1: "#8E8E93",
          2: "#AEAEB2",
          3: "#C7C7CC",
          4: "#D1D1D6",
          5: "#E5E5EA",
          6: "#F2F2F7",
        },

        // Label
        label: {
          primary: "#000000",
          secondary: "#3C3C43",
          tertiary: "#3C3C43",
          quaternary: "#3C3C43",
        },

        // Background
        systemBackground: {
          main: "#FFFFFF",
          surface1: "#FAFAFA",
          surface2: "#F5F5F5",
          surface3: "#161616",
          stroke: "#D1D1D6",
        },
      },
      fontSize: {
        hero: ["32px", { lineHeight: "40px", fontWeight: "700" }], // Bold
        large: ["24px", { lineHeight: "32px", fontWeight: "700" }], // Bold
        primary: ["20px", { lineHeight: "28px", fontWeight: "700" }], // Bold
        subheadSemibold: ["18px", { lineHeight: "24px", fontWeight: "600" }], // Semibold
        subheadMedium: ["18px", { lineHeight: "24px", fontWeight: "500" }], // Medium
        bodySemibold: ["16px", { lineHeight: "27px", fontWeight: "600" }], // Semibold
        bodyRegular: ["16px", { lineHeight: "27px", fontWeight: "400" }], // Regular
        captionMedium: ["14px", { lineHeight: "20px", fontWeight: "500" }], // Medium
        captionRegular: ["14px", { lineHeight: "20px", fontWeight: "400" }], // Regular
        captionSmall: ["12px", { lineHeight: "16px", fontWeight: "400" }], // Regular
        label: ["10px", { lineHeight: "12px", fontWeight: "500", letterSpacing: "0.08em" }], // Medium, CAPS
        tabbar: ["10px", { lineHeight: "12px", fontWeight: "500" }], // Medium
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [animate],
};

export default config;
