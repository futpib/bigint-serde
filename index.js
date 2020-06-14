
const {
	toJSON: bigUintToJSON,
	fromJSON: bigUintFromJSON,
} = require('./unsigned');

const toJSON = n => {
	if (n === 0n) {
		return [ 0, [] ];
	}

	if (n < 0n) {
		return [ -1, bigUintToJSON(-n) ];
	}

	return [ 1, bigUintToJSON(n) ];
};

const fromJSON = ([ sign, unsignedJSON ]) => {
	return BigInt(sign) * bigUintFromJSON(unsignedJSON);
};

module.exports = {
	toJSON,
	fromJSON,
};
