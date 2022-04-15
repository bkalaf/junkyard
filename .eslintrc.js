module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': [
            'off',
            {
                argsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-arguments': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/restrict-template-access': 0,
        'dot-notation': 'error',
        // 'function-paren-newline': ['error', {
        //     minItems: 6
        // }],
        // 'import/extensions': ['error', 'never'],
        // 'import/no-cycle': ['error', {
        //     maxDepth: 2
        // }],
        indent: ['off', 4],
        'jsx-quotes': ['warn', 'prefer-single'],
        'max-len': [
            'off',
            {
                code: 130,
                tabWidth: 4,
            },
        ],
        'multiline-ternary': ['off', 'never'],
        'no-redeclare': 'off',
        'no-trailing-spaces': 'off',
        'no-undef': 'off',
        'no-unsed-vars': 'off',
        'no-unused-expressions': [
            'error',
            {
                allowTernary: true,
            },
        ],
        'no-unused-labels': ['error'],
        'no-unused-vars': ['off'],
        'no-use-before-define': 'off',
        'react/display-name': 'off',
        // 'node/no-missing-import': ['error', {
        //     tryExtensions: ['.ts', '.tsx', '.js', '.jsx']
        // }],
        // 'node/no-unsupported-features/es-syntax': ['off', {
        //     ignores: [],
        //     version: '>=8.0.0'
        // }],
        'operator-linebreak': ['off', 'after'],
        'react/boolean-prop-naming': [
            'error',
            {
                rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
                validateNested: true,
            },
        ],
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'function-declaration',
            },
        ],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-uses-react': ['off'],
        'react/jsx-uses-vars': ['error'],
        'react/react-in-jsx-scope': ['off'],
        'react/require-default-props': 'off',
        semi: ['warn', 'always'],
        'space-before-function-paren': 'off',
    },
};
