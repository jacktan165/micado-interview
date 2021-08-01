module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  rules: {
    "no-console": "off",
    camelcase: "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "max-len": ["error", { code: 125 }],
    "no-restricted-globals": [
      "error",
      {
        name: "event",
        message: "Use local parameter instead.",
      },
      {
        name: "fdescribe",
        message: "Do not commit fdescribe. Use describe instead.",
      },
    ],
    semi: "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/ban-types": "off",
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "object-curly-newline": "off",
  },
};
