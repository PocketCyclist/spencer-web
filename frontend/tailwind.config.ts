import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const toRem = (px: number) => `${px / 16}rem`

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
        DEFAULT: toRem(16),
        sm: toRem(32),
        xl: toRem(66),
      },
    },
    fontSize: {
      'footer-title': [
        toRem(24),
        {
          lineHeight: toRem(29.66),
        },
      ],
      'footer-copy': [
        toRem(16),
        {
          lineHeight: toRem(20.08),
        },
      ],
    },
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        yellow: 'rgb(var(--yellow) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        'input-border': 'rgb(var(--input-border) / <alpha-value>)',
        'input-placeholder': 'rgb(var(--input-placeholder) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-mulish)', ...defaultTheme.fontFamily.sans],
        serif: [
          'var(--font-old-standard-tt)',
          ...defaultTheme.fontFamily.serif,
        ],
      },
      spacing: {
        header: toRem(160),
        'mobile-header': toRem(94),
      },
    },
  },
  plugins: [],
}

export default config
