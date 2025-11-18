import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      "lib/**",
      "coverage/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  // Base config for all files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        // Node globals
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        Buffer: "readonly",
        global: "readonly",
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...eslint.configs.recommended.rules,
    },
  },
  // TypeScript-specific config
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts"],
  })),
  // Custom rules
  {
    files: ["**/*.ts"],
    rules: {
      // Add your custom rules here
    },
  },
];
