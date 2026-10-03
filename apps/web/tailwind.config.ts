import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Unified premium color system based on logo
        background: "var(--background)",
        foreground: "var(--foreground)",
<<<<<<< C:/Users/Dell/AppData/Local/Temp/tmp.pX4QgAtF9q/ours
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main orange from logo
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Orange - aligned with CSS vars
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef', // Purple/Pink accent
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
=======
        // Modern EdTech: WHITE + BLUE + ORANGE
        primary: {
          50: '#E8F2FF',
          100: '#D0E5FF',
          200: '#A3CCFF',
          300: '#75B3FF',
          400: '#4799FF',
          500: '#1A80FF', // Main saturated blue
          600: '#0066E6',
          700: '#004DB3',
          800: '#003380',
          900: '#001A4D',
        },
        accent: {
          50: '#FFF4E6',
          100: '#FFE9CC',
          200: '#FFD399',
          300: '#FFBD66',
          400: '#FFA733',
          500: '#FF9100', // Main vibrant orange
          600: '#E68200',
          700: '#B36500',
          800: '#804800',
          900: '#4D2B00',
        },
        dark: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68', // Dark blue for text
          800: '#243B53',
          900: '#102A43',
>>>>>>> C:/Users/Dell/AppData/Local/Temp/tmp.pX4QgAtF9q/theirs
        },
        // Premium neutrals
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
<<<<<<< C:/Users/Dell/AppData/Local/Temp/tmp.pX4QgAtF9q/ours
        sans: ['var(--font-open-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Open Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'premium': '0 4px 6px rgba(249, 115, 22, 0.08), 0 1px 3px rgba(217, 70, 239, 0.06)',
        'premium-lg': '0 20px 25px rgba(249, 115, 22, 0.12), 0 10px 10px rgba(217, 70, 239, 0.08)',
        'glow': '0 0 30px rgba(249, 115, 22, 0.3), 0 0 60px rgba(217, 70, 239, 0.2)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 8px rgba(0, 0, 0, 0.05)',
=======
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(26, 128, 255, 0.08)',
        'soft-lg': '0 10px 40px rgba(26, 128, 255, 0.12)',
        'orange': '0 4px 20px rgba(255, 145, 0, 0.15)',
>>>>>>> C:/Users/Dell/AppData/Local/Temp/tmp.pX4QgAtF9q/theirs
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 2s infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
