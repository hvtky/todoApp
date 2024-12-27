const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    "50": "#eff6ff",
                    "100": "#dbeafe",
                    "200": "#bfdbfe",
                    "300": "#93c5fd",
                    "400": "#60a5fa",
                    "500": "#3b82f6",
                    "600": "#2563eb",
                    "700": "#1d4ed8",
                    "800": "#1e40af",
                    "900": "#1e3a8a",
                    "950": "#172554"
                }
            },
            animation: {
                'custom-spin-up': 'spinUp 0.3s linear',
                'custom-spin-down': 'spinDown 0.3s linear',
            },
            keyframes: {
                spinUp: {
                    '0%': {transform: 'rotate(-180deg)'},
                    '100%': {transform: 'rotate(-360deg)'},
                },
                spinDown: {
                    '0%': {transform: 'rotate(-180deg)'},
                    '100%': {transform: 'rotate(0deg)'},
                },
            }
        },
    },
    plugins: [
        flowbite.plugin(),
    ],
}
