/** @type {import("prettier").Config} */
const config = {
  bracketSpacing: true,
  bracketSameLine: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss']
}

export default config
