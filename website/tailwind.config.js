/** @type {import('tailwindcss').Config} */

// MAIR brand palette: deep red (#990101) on a light theme.
// The 700 step is MAIR's signature red used in the logo.
const red = {
  50: '#fdf2f2',
  100: '#fbe3e3',
  200: '#f7caca',
  300: '#efa3a3',
  400: '#e26d6d',
  500: '#d04444',
  600: '#b91f1f',
  700: '#990101', // MAIR primary red
  800: '#7e0d0d',
  900: '#681212',
  950: '#3c0606',
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: red,
        accent: red,
        // Remap legacy `orange-*` utilities to MAIR red so any leftover
        // references stay on-brand without touching every template.
        orange: red,

        // MAIR brand tokens
        mair: {
          red: '#990101',
          'red-bright': '#c62828',
          dark: '#1A1C1E',   // near-black
          slate: '#292D33',
          mist: '#C3CAD4',
          cloud: '#F2F4F7',
          purple: '#AE8DF0',
          green: '#29AD86',
          gold: '#EAA902',
        },

        // Backwards-compatible aliases (the codebase references these widely).
        brand: {
          orange: '#990101',         // -> MAIR primary red
          'light-orange': '#c62828', // -> brighter red for gradients/hovers
          charcoal: '#1A1C1E',       // -> MAIR near-black

          // Category accent colors used by catalog badges (kept for contrast).
          'science-dark': '#1125A9',
          'science-light': '#5987DA',
          'science-green': '#29AD86',
          'health-dark': '#00594C',
          'business-dark': '#EAA902',
          'business-light': '#FFD040',
          'business-purple': '#D65C72',
          'humanities-dark': '#9F2842',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
