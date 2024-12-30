import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Roboto',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      colors: {
        backgroundColor: 'var(--background-color)',
        primaryColor: 'var(--primary-color)',
        secondaryColor: 'var(--secondary-color)',
        tertiaryColor: 'var(--tertiary-color)',
        buttonTextColor: 'var(--button-text-color)',
        textColor: 'var(--text-color)',
        inputBackgroundColor: 'var(--input-background-color)',
        inputPlaceholderColor: 'var(--input-placeholder-color)',
        focusInputBackgroundColor: 'var(--focus-input-background-color)',
        errorIconColor: 'var(--error-icon-color)',

        darkBackgroundColor: 'var(--dark-background-color)',
        darkPrimaryColor: 'var(--dark-primary-color)',
        darkSecondaryColor: 'var(--dark-secondary-color)',
        darkTertiaryColor: 'var(--dark-tertiary-color)',
        darkButtonTextColor: 'var(--dark-button-text-color)',
        darkTextColor: 'var(--dark-text-color)',
        darkInputBackgroundColor: 'var(--dark-input-background-color)',
        darkInputPlaceholderColor: 'var(--dark-input-placeholder-color)',
        darkErrorIconColor: 'var(--dark-error-icon-color)',
      },
    },
  },
  plugins: [],
} satisfies Config;
