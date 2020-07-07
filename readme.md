# bigint-serde

> JS implementation of JSON serialization of BigInt and BigUint types from Rust [num-bigint crate](https://crates.io/crates/num-bigint)

[![Build Status](https://travis-ci.org/futpib/bigint-serde.svg?branch=master)](https://travis-ci.org/futpib/bigint-serde) [![Coverage Status](https://coveralls.io/repos/github/futpib/bigint-serde/badge.svg?branch=master)](https://coveralls.io/github/futpib/bigint-serde?branch=master)

## Example

### BigInt

```js
const {
	toJSON,
	fromJSON,
} = require('bigint-serde');

console.log(toJSON(-123456789123456789n)); // → [-1,[2899336981,28744523]]
console.log(fromJSON([-1,[2899336981,28744523]])); // → -123456789123456789n
```

### BigUint

```js
const {
	toJSON,
	fromJSON,
} = require('bigint-serde/unsigned');

console.log(toJSON(123456789123456789n)); // → [2899336981,28744523]
console.log(fromJSON([2899336981,28744523])); // → 123456789123456789n
```

## Install

```
yarn add bigint-serde
```
