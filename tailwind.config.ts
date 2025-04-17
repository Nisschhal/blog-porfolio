import type { Config } from "tailwindcss"

const config: Config = {
  content: [],
  darkMode: "class", // For next-themes compatibility
  theme: {
    container: {
      center: true, // Centers the container with margin: auto
      padding: {
        DEFAULT: "1rem", // Default padding for all breakpoints
        // sm: "1.5rem", // Padding at sm breakpoint
        // md: "2rem", // Padding at md breakpoint
      },
      screens: {
        sm: "640px", // Max-width for sm breakpoint
        md: "768px", // Max-width for md breakpoint
        // lg: "1024px", // Max-width for lg breakpoint
        // xl: "1280px", // Max-width for xl breakpoint
        // "2xl": "1536px", // Max-width for 2xl breakpoint
      },
    },
    extend: {},
  },
  plugins: [],
}

export default config
