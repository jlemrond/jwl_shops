/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourcetype: "module",
    ecmafeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorepatterns: ["!**/.server", "!**/.client"],

  // base config
  extends: ["eslint:recommended", "prettier"],

  overrides: [
    // react
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formcomponents: ["form"],
        linkcomponents: [
          { name: "link", linkattribute: "to" },
          { name: "navlink", linkattribute: "to" },
        ],
        "import/resolver": {
          alias: {
            map: [["/", "./public"]],
          },
          typescript: {},
        },
      },
    },

    // typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaystrytypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
    },

    // node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
