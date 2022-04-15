// Config pulled from https://github.com/julian-george/dep-graph-visualization
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    quotes: ["warn", "double"],
    "arrow-body-style": "warn",
    "import/extensions": 0,
    "no-use-before-define": 0,
    "comma-dangle": 0,
    "import/prefer-default-export": 0,
    "prefer-template": 0,
    "operator-linebreak": 0,
    "nonblock-statement-body-position": 0,
    curly: ["warn", "multi-line"],

    "react/function-component-definition": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "@typescript-eslint/no-empty-function": 0,
  },
};
