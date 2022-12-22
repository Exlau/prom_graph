module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'react/jsx-filename-extension': [2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'linebreak-style': 0,
    semi: ['error', 'never'],
  },
}
