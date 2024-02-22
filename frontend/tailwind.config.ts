import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const toRem = (px: number) => `${px / 16}rem`

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: toRem(16),
        sm: toRem(32),
        xl: toRem(66),
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
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
        red: 'rgb(var(--red) / <alpha-value>)',
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
      minHeight: {
        'screen-minus-header': `calc(100vh - ${toRem(160)})`,
        'screen-minus-mobile-header': `calc(100vh - ${toRem(94)})`,
      },
      spacing: {
        header: toRem(160),
        'mobile-header': toRem(94),
      },
    },
  },
  plugins: [
    require('tailwindcss-convert-px-to-rem'),
    require('tailwindcss-animate'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            width: '0',
            height: '0',
            display: 'none',
          },
        },
        '.text-balance': {
          textWrap: 'balance',
        },
      })
    }),
  ],
}

export default config
