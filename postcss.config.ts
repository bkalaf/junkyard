module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss'), 
        require('postcss-custom-properties'),
        require('autoprefixer'),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('postcss-preset-env')({ stage: 1 })
    ]
}