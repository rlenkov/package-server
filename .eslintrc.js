module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['airbnb', 'airbnb/hooks'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        // Indent with 4 spaces
        indent: [2, 4],

        // Indent JSX with 4 spaces
        'react/jsx-indent': [2, 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': [2, 4],
        // Allow js as filename extension
        'react/jsx-filename-extension': [0],
        'import/extensions': 'off',
        semi: [2, 'never'],
        quotes: ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-fragments': ['error', 'element'],
        'arrow-parens': ['error', 'as-needed'],
        // 'comma-dangle': ['error', 'never'],
        'react/destructuring-assignment': ['error', 'never'],
        // 'operator-linebreak': ['error', 'after'],
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        'jsx-a11y/label-has-for': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        'react/jsx-one-expression-per-line': [
            'error',
            { allow: 'single-child' },
        ],
    },
}
