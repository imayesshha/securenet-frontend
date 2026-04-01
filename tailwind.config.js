/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#0a0a0f",
          dark: "#0f0f1a",
          card: "#13131f",
          border: "#1e1e2e",
          accent: "#00f5ff",
          purple: "#7c3aed",
          green: "#00ff88",
          red: "#ff3366",
          muted: "#4a4a6a",
          text: "#e2e2f0",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        cyber: ['Rajdhani', 'Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00f5ff33' },
          '100%': { boxShadow: '0 0 20px #00f5ff88, 0 0 40px #00f5ff33' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse at top, #1a0533 0%, #0a0a0f 60%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      }
    },
  },
  plugins: [],
}
