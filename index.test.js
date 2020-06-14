
const test = require('ava');

const execa = require('execa');

const { map } = require('bluebird');

const randomBigUintBase = require('random-bigint');

const {
	fromJSON: bigUintFromJSON,
	toJSON: bigUintToJSON,
} = require('./unsigned');

const {
	fromJSON: bigIntFromJSON,
	toJSON: bigIntToJSON,
} = require('.');

const cwd = './rust-test-helper';

const rust = (subcommand, input) => {
	return execa(
		'cargo',
		[ 'run', '--quiet', '--', subcommand ],
		{
			cwd,
			input,
		},
	);
};

const rustBigUintToJSON = async n => {
	const { stdout } = await rust('big-uint-to-json', String(n));
	return JSON.parse(stdout);
};

const rustBigUintFromJSON = async json => {
	const { stdout } = await rust('big-uint-from-json', JSON.stringify(json));
	return BigInt(stdout);
};

const rustBigIntToJSON = async n => {
	const { stdout } = await rust('big-int-to-json', String(n));
	return JSON.parse(stdout);
};

const rustBigIntFromJSON = async json => {
	const { stdout } = await rust('big-int-from-json', JSON.stringify(json));
	return BigInt(stdout);
};

const randomBigUint = () => {
	const bits = Math.floor(Math.random() * 512);
	return randomBigUintBase(bits);
};

const randomBigInt = () => {
	const sign = (Math.random() < 0.5) ? -1n : 1n;
	return sign * randomBigUint();
};

const macro = async (t, randomN, toJSON, fromJSON, rustToJSON, rustFromJSON) => {
	await map(Array.from(new Array(256)), async (_, i) => {
		const n = (() => {
			if (i === 0) {
				return 0n;
			}

			return randomN();
		})();

		const actualJSON = toJSON(n);
		const expectedJSON = await rustToJSON(n);
		t.deepEqual(actualJSON, expectedJSON, 'toJSON');

		const actualN = fromJSON(expectedJSON);
		const expectedN = await rustFromJSON(expectedJSON);
		t.is(actualN, expectedN, 'fromJSON');
		t.is(expectedN, n);
	}, {
		concurrency: 64,
	});
};

test(
	'unsigned',
	macro,
	randomBigUint,
	bigUintToJSON,
	bigUintFromJSON,
	rustBigUintToJSON,
	rustBigUintFromJSON,
);

test(
	'signed',
	macro,
	randomBigInt,
	bigIntToJSON,
	bigIntFromJSON,
	rustBigIntToJSON,
	rustBigIntFromJSON,
);
