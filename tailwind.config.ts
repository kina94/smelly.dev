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
  			systemRed: '#FF3830',
  			systemOrange: '#FF9500',
  			systemYellow: '#FFC000',
  			systemGreen: '#34C759',
  			systemTeal: '#5AC8FA',
  			systemBlue: '#07a',
  			systemIndigo: '#5856D6',
  			systemPurple: '#AF52DE',
  			systemPink: '#DD4A68',
  			systemGray: {
  				'1': '#8E8E93',
  				'2': '#AEAEB2',
  				'3': '#C7C7CC',
  				'4': '#D1D1D6',
  				'5': '#E5E5EA',
  				'6': '#F2F2F7'
  			},
  			label: {
  				primary: '#222222',
  				secondary: '#3C3C43',
  				tertiary: '#3C3C43',
  				quaternary: '#3C3C43'
  			},
  			systemBackground: {
  				main: '#FFFFFF',
  				surface1: '#FAFAFA',
  				surface2: '#F5F5F5',
  				surface3: '#161616',
  				stroke: '#D1D1D6'
  			}
  		},
  		fontSize: {
  			hero: [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem',
  					fontWeight: '700'
  				}
  			],
  			large: [
  				'24px',
  				{
  					lineHeight: '32px',
  					fontWeight: '700'
  				}
  			],
  			primary: [
  				'20px',
  				{
  					lineHeight: '28px',
  					fontWeight: '700'
  				}
  			],
  			subheadSemibold: [
  				'18px',
  				{
  					lineHeight: '24px',
  					fontWeight: '600'
  				}
  			],
  			subheadMedium: [
  				'18px',
  				{
  					lineHeight: '24px',
  					fontWeight: '500'
  				}
  			],
  			bodySemibold: [
  				'16px',
  				{
  					lineHeight: '27px',
  					fontWeight: '600'
  				}
  			],
  			bodyRegular: [
  				'16px',
  				{
  					lineHeight: '28px',
  					fontWeight: '400'
  				}
  			],
  			captionMedium: [
  				'14px',
  				{
  					lineHeight: '20px',
  					fontWeight: '500'
  				}
  			],
  			captionRegular: [
  				'14px',
  				{
  					lineHeight: '20px',
  					fontWeight: '400'
  				}
  			],
  			captionSmall: [
  				'12px',
  				{
  					lineHeight: '16px',
  					fontWeight: '400'
  				}
  			],
  			label: [
  				'10px',
  				{
  					lineHeight: '12px',
  					fontWeight: '500',
  					letterSpacing: '0.08em'
  				}
  			],
  			tabbar: [
  				'10px',
  				{
  					lineHeight: '12px',
  					fontWeight: '500'
  				}
  			]
  		},
  		fontWeight: {
  			regular: '400',
  			medium: '500',
  			semibold: '600',
  			bold: '700'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [animate],
};

export default config;
