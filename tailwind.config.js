/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#030814',
          900: '#071124',
          850: '#0B1933',
          800: '#112344',
          700: '#1B335E',
        },
        amber: {
          glow: '#F59E0B',
          warm: '#D97706',
          soft: '#FBBF24',
          gold: '#E5A93C',
        },
        cyan: {
          tech: '#0099FF',
          electric: '#00D2FF',
          glow: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        xs: ['1.02rem', { lineHeight: '1.52rem', letterSpacing: '0.01em' }],
        sm: ['1.15rem', { lineHeight: '1.72rem' }],
        base: ['1.28rem', { lineHeight: '1.88rem' }],
        lg: ['1.42rem', { lineHeight: '2.02rem' }],
        xl: ['1.6rem', { lineHeight: '2.18rem' }],
        '2xl': ['1.9rem', { lineHeight: '2.42rem' }],
        '3xl': ['2.35rem', { lineHeight: '2.82rem' }],
        '4xl': ['2.85rem', { lineHeight: '3.25rem' }],
        '5xl': ['3.5rem', { lineHeight: '1.12' }],
        '6xl': ['4.2rem', { lineHeight: '1.08' }],
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
