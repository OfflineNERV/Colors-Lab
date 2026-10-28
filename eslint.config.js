const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  { ignores: ["public/js/md5.js"] },
  js.configs.recommended,
  {
    files: ["public/js/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: { ...globals.browser, md5: "readonly" }
    }
  }
];