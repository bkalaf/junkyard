/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,ts,tsx,jsx,css,html,txt}'],
    mode: 'jit',
    darkMode: 'media',
    theme: {
        extend: {
            textTransform: {
                'small-caps': 'font-small-caps',
                'petite-caps': 'font-petite-caps'
            },
            backgroundImage: (theme) => ({
                'forest-image': "url('/home/bobby/Desktop/code/jitt-ts/src/assets/images/photo-1577495508048-b635879837f1.webp')"
            })
        },
        fontFamily: {
            sans: ['Montserrat', 'sans-serif'],
            montserrat: ['Montserrat', 'sans-serif'],
            ['open-sans']: ['Open Sans', 'sans-serif'],
            patrickHand: ['Patrick Hand', 'cursive'],
            raleway: ['Raleway', 'sans-serif'],
            ['fira-sans']: ['Fira Sans', 'monospace']
        },
        colors: {
            amber: {
                minimal: colors.amber[100],
                'very-light': colors.amber[200],
                light: colors.amber[400],
                DEFAULT: colors.amber[500],
                dark: colors.amber[600],
                'very-dark': colors.amber[800]
            },
            black: {
                minimal: colors.black,
                'very-light': colors.black,
                light: colors.black,
                DEFAULT: colors.black,
                dark: colors.black,
                'very-dark': colors.black
            },
            blue: {
                minimal: colors.blue[100],
                'very-light': colors.blue[200],
                light: colors.blue[400],
                DEFAULT: colors.blue[500],
                dark: colors.blue[600],
                'very-dark': colors.blue[800]
            },
            slate: {
                minimal: colors.slate[100],
                'very-light': colors.slate[200],
                light: colors.slate[400],
                DEFAULT: colors.slate[500],
                dark: colors.slate[600],
                'very-dark': colors.slate[800]
            },
            current: {
                minimal: colors.current,
                'very-light': colors.current,
                light: colors.current,
                DEFAULT: colors.current,
                dark: colors.current,
                'very-dark': colors.current
            },
            cyan: {
                minimal: colors.cyan[100],
                'very-light': colors.cyan[200],
                light: colors.cyan[400],
                DEFAULT: colors.cyan[500],
                dark: colors.cyan[600],
                'very-dark': colors.cyan[800]
            },
            emerald: {
                minimal: colors.emerald[100],
                'very-light': colors.emerald[200],
                light: colors.emerald[400],
                DEFAULT: colors.emerald[500],
                dark: colors.emerald[600],
                'very-dark': colors.emerald[800]
            },
            stone: {
                minimal: colors.stone[100],
                'very-light': colors.stone[200],
                light: colors.stone[400],
                DEFAULT: colors.stone[500],
                dark: colors.stone[600],
                'very-dark': colors.stone[800]
            },
            neutral: {
                minimal: colors.neutral[100],
                'very-light': colors.neutral[200]
                , light: colors.neutral[400],
                DEFAULT: colors.neutral[500]
                , dark: colors.neutral[600],
                'very-dark': colors.neutral[800]
            },
            green: {
                minimal: colors.green[100],
                'very-light': colors.green[200]
                , light: colors.green[400],
                DEFAULT: colors.green[500]
                , dark: colors.green[600],
                'very-dark': colors.green[800]
            },
            indigo: {
                minimal: colors.indigo[100],
                'very-light': colors.indigo[200]
                , light: colors.indigo[400],
                DEFAULT: colors.indigo[500]
                , dark: colors.indigo[600],
                'very-dark': colors.indigo[800]
            },
            lime: {
                minimal: colors.lime[100],
                'very-light': colors.lime[200]
                , light: colors.lime[400],
                DEFAULT: colors.lime[500]
                , dark: colors.lime[600],
                'very-dark': colors.lime[800]
            },
            magenta: {
                minimal: colors.fuchsia[100],
                'very-light': colors.fuchsia[200]
                , light: colors.fuchsia[400],
                DEFAULT: colors.fuchsia[500]
                , dark: colors.fuchsia[600],
                'very-dark': colors.fuchsia[800]
            },
            orange: {
                minimal: colors.orange[100],
                'very-light': colors.orange[200]
                , light: colors.orange[400],
                DEFAULT: colors.orange[500]
                , dark: colors.orange[600],
                'very-dark': colors.orange[800]
            },
            pink: {
                minimal: colors.pink[100],
                'very-light': colors.pink[200]
                , light: colors.pink[400],
                DEFAULT: colors.pink[500]
                , dark: colors.pink[600],
                'very-dark': colors.pink[800]
            },
            purple: {
                minimal: colors.purple[100],
                'very-light': colors.purple[200]
                , light: colors.purple[400],
                DEFAULT: colors.purple[500]
                , dark: colors.purple[600],
                'very-dark': colors.purple[800]
            },
            red: {
                minimal: colors.red[100],
                'very-light': colors.red[200]
                , light: colors.red[400],
                DEFAULT: colors.red[500]
                , dark: colors.red[600],
                'very-dark': colors.red[800]
            },
            rose: {
                minimal: colors.rose[100],
                'very-light': colors.rose[200]
                , light: colors.rose[400],
                DEFAULT: colors.rose[500]
                , dark: colors.rose[600],
                'very-dark': colors.rose[800]
            },
            sky: {
                minimal: colors.sky[100],
                'very-light': colors.sky[200]
                , light: colors.sky[400],
                DEFAULT: colors.sky[500]
                , dark: colors.sky[600],
                'very-dark': colors.sky[800]
            },
            zinc: {
                minimal: colors.zinc[100],
                'very-light': colors.zinc[200]
                , light: colors.zinc[400],
                DEFAULT: colors.zinc[500]
                , dark: colors.zinc[600],
                'very-dark': colors.zinc[800]
            },
            teal: {
                minimal: colors.teal[100],
                'very-light': colors.teal[200]
                , light: colors.teal[400],
                DEFAULT: colors.teal[500]
                , dark: colors.teal[600],
                'very-dark': colors.teal[800]
            },
            transparent: {
                minimal: colors.transparent,
                'very-light': colors.transparent,
                light: colors.transparent,
                DEFAULT: colors.transparent,
                dark: colors.transparent,
                'very-dark': colors.transparent
            },
            violet: {
                minimal: colors.violet[100],
                'very-light': colors.violet[200]
                , light: colors.violet[400],
                DEFAULT: colors.violet[500]
                , dark: colors.violet[600],
                'very-dark': colors.violet[800]
            },
            white: {
                minimal: colors.white[100],
                'very-light': colors.white,
                light: colors.white,
                DEFAULT: colors.white,
                dark: colors.white,
                'very-dark': colors.white
            },
            yellow: {
                minimal: colors.yellow[100],
                'very-light': colors.yellow[200]
                , light: colors.yellow[400],
                DEFAULT: colors.yellow[500]
                , dark: colors.yellow[600],
                'very-dark': colors.yellow[800]
            },
        },

    },
    variants: {
        extend: {
            backgroundColor: ['active', 'open', 'peer-checked', 'invalid', 'disabled', 'focus', 'hover', 'checked', 'odd', 'even', 'group-hover', ''],
            backgroundOpacity: ['disabled'],
            borderColor: ['odd', 'even', 'hover', 'group-hover'],
            borderOpacity: ['hover'],
            boxShadow: ['disabled', 'hover'],
            cursor: ['disabled'],
            display: ['group-hover', 'disabled', 'group-active'],
            opacity: ['active', 'open', 'disabled', 'hover', 'focus', 'group-hover'],
            ringColor: ['active', 'invalid', 'open', 'disabled', 'hover', 'focus'],
            ringOpacity: ['active', 'open', 'disabled', 'hover', 'focus'],
            scale: ['active', 'open', 'disabled', 'hover', 'focus'],
            textColor: ['active', 'open', 'disabled', 'hover', 'focus', 'group-hover'],
            transitionProperty: ['active', 'group-hover', 'open', 'disabled', 'hover', 'focus'],
            transform: ['group-hover'],
            translate: ['group-hover']
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
};
    