import js from "@eslint/js";
import next from "eslint-config-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  js.configs.recommended,
  ...next, // note: no parentheses, just spread the array
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];
