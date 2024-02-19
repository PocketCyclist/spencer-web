import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        xl: '4.125rem',
      },
    },
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        yellow: 'rgb(var(--yellow) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-mulish)', ...defaultTheme.fontFamily.sans],
        serif: [
          'var(--font-old-standard-tt)',
          ...defaultTheme.fontFamily.serif,
        ],
      },
      spacing: {
        header: '10rem',
        'mobile-header': '5.875rem',
      }
    },
  },
  plugins: [],
}

export default config;
