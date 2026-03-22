// eslint.config.cjs
const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const globals = require("globals");
const tsParser = require("@typescript-eslint/parser");

const compat = new FlatCompat({
  baseDirectory: __dirname
});

module.exports = [
  // replaces ignorePatterns in eslintrc
  {
    ignores: [
      "**/*.js",
      "**/*.cjs",
      ".next/**/*",
      ".vercel/**/*",
      "@types/generated/contentful.d.ts"
    ]
  },

  // replaces "eslint:recommended" in flat config world
  js.configs.recommended, // :contentReference[oaicite:1]{index=1}

  // bring in shareable configs that are still in eslintrc format (Next + TS)
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ), // :contentReference[oaicite:2]{index=2}

  // your overrides + old env/settings
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.*.json"],
        tsconfigRootDir: __dirname
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest
      }
    },
    settings: {
      next: {
        rootDir: ["./"]
      }
    },
    rules: {
      "@next/next/no-img-element": "off",
      "react/jsx-props-no-spreading": "off",
      "no-console": "off"
    }
  }
];