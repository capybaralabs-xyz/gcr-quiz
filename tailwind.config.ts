import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/JSON/Questions.json",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        'old-english': ['var(--font-old-english)', 'serif'],
        'diatype-mono': ['var(--font-diatype-mono-regular)', 'serif'],
        'diatype-mono-bold': ['var(--font-diatype-mono-bold)', 'serif'],
        'offBit-trial': ['var(--font-offbit-trial-bold)', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom-inset': 'inset 2px 2px 0px 0px #DFDFDF, inset -2px -2px 0px 0px #7F7F7F, inset 1px 1px 0px 0px #FFFFFF, inset -1px -1px 0px 0px #000000',
        'custom-inset-selected': 'inset -1px -1px 0px #A0A0A0, inset 1px 1px 0px #FFFFFF, inset -2px -2px 0px #C8C8C8, inset 2px 2px 0px #DFDFDF',
        'img-grid-inset-selected': 'inset -1px -1px 0px #000000, inset 1px 1px 0px #FFFFFF, inset -2px -2px 0px #7F7F7F, inset 2px 2px 0px #DFDFDF;',
      },
      screens: {
        'tablet': '768px',
        // => @media (min-width: 768px) { ... }
  
        'laptop': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        'desktop': '1920px',
        // => @media (min-width: 1920px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;
