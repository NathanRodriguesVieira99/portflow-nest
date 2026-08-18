module.exports = {
  extends: [
    "@rocketseat/eslint-config/node",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["simple-import-sort", "import"],
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
        alwaysTryTypes: true,
      },
      node: true,
    },
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-namespace": "off",
    "no-use-before-define": "off",
    "no-new": "off",
  },
};
