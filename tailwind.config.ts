import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          100: "#A5B4FB",
          200: "#A8A6FF",
          300: "#918efa",
          400: "#807dfa",
        },
        pink: {
          100: "#FFA6F6",
          300: "#fa8cef",
          400: "#fa7fee",
        },
        red: {
          100: "#FF9F9F",
          300: "#fa7a7a",
          400: "#f76363",
        },
        orange: {
          100: "#FFC29F",
          300: "#FF965B",
          400: "#fa8543",
        },
        yellow: {
          100: "#FFF59F",
          300: "#FFF066",
          400: "#FFE500",
        },
        lime: {
          100: "#c6fab4",
          200: "#B8FF9F",
          300: "#9dfc7c",
          400: "#7df752",
        },
        cyan: {
          100: "#A6FAFF",
          300: "#79F7FF",
          400: "#53f2fc",
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
export default config
