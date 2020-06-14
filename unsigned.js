
const MAX_U32 = (2n ** 32n) - 1n;

const toJSON = n => {
	const result = [];

	while (n > MAX_U32) {
		const u32 = Number(n & MAX_U32);
		result.push(u32);
		n >>= 32n;
	}

	n = Number(n);
	if (n !== 0) {
		result.push(n);
	}

	return result;
};

const fromJSON = u32s => {
	let result = 0n;

	u32s.forEach((u32, i) => {
		result |= (BigInt(u32) << BigInt(32 * i));
	});

	return result;
};

module.exports = {
	toJSON,
	fromJSON,
};
