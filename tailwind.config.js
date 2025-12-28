/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Source Sans Pro"', 'sans-serif'],
            },
            colors: {
                accent: '#47D3E5',
                'brand-blue': '#4c5c96',
            },
            screens: {
                'xs': '480px',
            }
            ,
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                imageFadeIn: {
                    '0%': { opacity: '0', transform: 'scale(0.98)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                    '100%': { transform: 'translateY(0)' },
                },
                wiggle: {
                    '0%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                    '100%': { transform: 'rotate(-3deg)' },
                }
            },
            animation: {
                'fade-in': 'fadeIn 800ms ease-out both',
                'fade-right': 'fadeInRight 800ms ease-out both',
                'image-fade-in': 'imageFadeIn 900ms ease-out both',
                'float-slow': 'float 3s ease-in-out infinite',
                'wiggle-slow': 'wiggle 1.2s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
