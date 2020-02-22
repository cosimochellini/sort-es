# sort-es

[![dependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate)
[![devDependencies Status](https://david-dm.org/cosimochellini/sort-es/dev-status.svg)](https://david-dm.org/cosimochellini/sort-es?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Build](https://github.com/cosimochellini/sort-es/workflows/Npm%20deploy/badge.svg)
![Version](https://img.shields.io/npm/v/sort-es.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/sort-es/badge.svg)](https://snyk.io/test/npm/sort-es)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/cosimochellini/sort-es)
![npm](https://img.shields.io/npm/dw/sort-es)

## Blazing fast, tree-shakeable, type-safe, modern utility library to sort any type of array

## Docs : https://www.npmjs.com/package/sort-es

# Getting started

## installation

The library is available as an [npm package](https://www.npmjs.com/package/sort-es).
To install the package, run:

```
npm install sort-es
# or
yarn add sort-es
```

Start using:

```
import { byString } from 'sort-es'

const unsorted = ["xxx", "bbbb", "zzz", "cccc", "aaa"];
const sorted = arrayUnsorted.sort(byString());

console.log(sorted); //(5) ["aaa", "bbbb", "cccc", "xxx", "zzz"]
```

https://cdn.jsdelivr.net/npm/sort-es/dist/index.umd.min.js
https://cdn.jsdelivr.net/npm/sort-es/dist/index.min.mjs

- **ES6/ESNext** - Write _ES6_ code and _Babel_ will transpile it to ES5 for backwards compatibility
- **Test** - _Mocha_ with _Istanbul_ coverage
- **Lint** - Preconfigured _ESlint_ with _Airbnb_ config
- **CI** - _TravisCI_ configuration setup
- **Minify** - Built code will be minified for performance

# Commands

- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

# Installation

Just clone this repo and remove `.git` folder.

# License

MIT © Cosimo chellini
