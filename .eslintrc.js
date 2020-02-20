module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["tslint:latest", "tslint-config-prettier"],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    "nuxt/no-cjs-in-config": "off"
  }
};
