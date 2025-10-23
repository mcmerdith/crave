// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from "eslint/config";
import expoConfig from "eslint-config-expo/flat";
import prettierConfig from "eslint-config-prettier/flat";

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: ["dist/*"],
  },
]);
