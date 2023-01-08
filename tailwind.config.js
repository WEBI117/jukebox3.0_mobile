const { plugin } = require('twrnc');
module.exports = {
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'white': '#ffffff',
                'cpink': {
                    100: '#FF008C',
                    200: '#BF026B',
                    300: '#80054A',
                    400: '#400729',
                },
            },
        },
    },
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                // 😎 similar to `@apply`
                btn: `bg-cpink-100 flex flex-row justify-center items-center w-full h-full rounded-2xl shadow-cpink-100 shadow-radius-1`,
                'txt': `text-white`,
                //'body-text': `font-serif leading-relaxed tracking-wide text-gray-800`,
            });
        }),
    ],
}
