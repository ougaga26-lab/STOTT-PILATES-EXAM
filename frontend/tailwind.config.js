/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#E8E2D6',
        base: '#EFEAE0',
        raised: '#F5F1E8',
        sunken: '#DDD6C7',
        ink: {
          primary: '#3D3A32',
          secondary: '#6B6558',
          tertiary: '#9A9385',
        },
        stroke: '#D4CDBD',
        sage: {
          100: '#E5EBD9',
          300: '#B8C89E',
          500: '#9AAE7F',
          700: '#6E8456',
          ink: '#2F3E1F',
        },
        clay: {
          300: '#D9A893',
          500: '#B87860',
          700: '#8A5440',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        chip: '4px',
        btn: '8px',
        card: '12px',
        modal: '20px',
      },
      boxShadow: {
        'inner-soft': 'inset 2px 2px 6px rgba(120,110,90,0.18), inset -2px -2px 6px rgba(255,252,244,0.9)',
        'inner-deep': 'inset 3px 3px 8px rgba(120,110,90,0.28), inset -2px -2px 6px rgba(255,252,244,0.7)',
        raised: '4px 4px 10px rgba(120,110,90,0.18), -3px -3px 8px rgba(255,252,244,0.85)',
        'raised-hover': '6px 6px 14px rgba(120,110,90,0.22), -4px -4px 10px rgba(255,252,244,0.9)',
        elevated: '10px 12px 28px rgba(120,110,90,0.22), -5px -5px 16px rgba(255,252,244,0.75)',
        'clay-glow': '10px 12px 28px rgba(138,84,64,0.28), -5px -5px 16px rgba(255,252,244,0.7)',
        focus: '0 0 0 3px rgba(154,174,127,0.35)',
      },
      transitionTimingFunction: {
        tactile: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        micro: '120ms',
        fast: '200ms',
        modal: '260ms',
      },
    },
  },
  plugins: [],
};
