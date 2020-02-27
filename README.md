# sort-es

[![dependencies Status](https://david-dm.org/flexdinesh/npm-module-boilerplate/status.svg)](https://david-dm.org/flexdinesh/npm-module-boilerplate)
[![devDependencies Status](https://david-dm.org/cosimochellini/sort-es/dev-status.svg)](https://david-dm.org/cosimochellini/sort-es?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Build](https://github.com/cosimochellini/sort-es/workflows/Npm%20deploy/badge.svg)
![Version](https://img.shields.io/npm/v/sort-es.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/sort-es/badge.svg)](https://snyk.io/test/npm/sort-es)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/cosimochellini/sort-es)
![npm](https://img.shields.io/npm/dw/sort-es)
[![codecov](https://codecov.io/gh/cosimochellini/sort-es/branch/master/graph/badge.svg)](https://codecov.io/gh/cosimochellini/sort-es)

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
const sorted = unsorted.sort(byString());

console.log(sorted); //(5) ["aaa", "bbbb", "cccc", "xxx", "zzz"]
```

Use directly in the browser

```
<script src='https://cdn.jsdelivr.net/npm/sort-es/dist/index.umd.min.js'></script>
<script>
    const unsorted = ["xxx", "bbbb", "zzz", "cccc", "aaa"];
    const sorted = unsorted.sort(sort.byString());

    console.log(sorted); //(5) ["aaa", "bbbb", "cccc", "xxx", "zzz"]
</script>

//or via browser modules

<script type='module'>
    import { byString } from 'https://cdn.jsdelivr.net/npm/sort-es/dist/index.min.mjs'
    
    const unsorted = ["xxx", "bbbb", "zzz", "cccc", "aaa"];
    const sorted = unsorted.sort(byString());

    console.log(sorted); //(5) ["aaa", "bbbb", "cccc", "xxx", "zzz"]
</script>
```

## See full Docs : https://www.npmjs.com/package/sort-es

# License

MIT © Cosimo chellini
