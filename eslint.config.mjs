import globals from "globals";
import pluginJs from "@eslint/js";
import * as tseslint from "typescript-eslint";
import prettier from "prettier";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";


/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {ignores: ["node_modules/", "dist/", "build/", "coverage/", ]},
  {files: ["**/*.{js,mjs,cjs,ts}"]},
{languageOptions: { globals: globals.browser }},
pluginJs.configs.recommended,
tseslint.configs.recommended,
prettierConfig,
{
plugins: { prettier: prettierPlugin },
rules: {
    "prettier/prettier": "error",
},
}
];