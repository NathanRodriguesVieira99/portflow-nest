module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        project: `${__dirname}/tsconfig.json`,
        alwaysTryTypes: true,
      },
      node: true,
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-use-before-define': 'off',
    'no-new': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-named-as-default': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        basePath: __dirname,
        zones: [
          {
            target: './src/domain',
            from: ['./src/application', './src/infra', './src/external'],
            message:
              'A camada domain não pode depender de application, infra e external',
          },
          {
            target: './src/application',
            from: ['./src/infra', './src/external'],
            message:
              'A camada application não pode depender de infra e external',
          },
          {
            target: './src/infra',
            from: ['./src/external'],
            message: 'A camada infra não pode depender de external',
          },
        ],
      },
    ],
  },
};
