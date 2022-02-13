
use std::{
	io::{
		self,
		Read,
	},
	str::{
		FromStr,
	},
};

use num_bigint::{
	BigInt,
	BigUint,
};

use clap::{
	Parser,
};

#[derive(Parser)]
struct Options {
	#[clap(subcommand)]
	subcommand: Subcommand,
}

#[derive(Parser)]
enum Subcommand {
	BigIntToJSON,
	BigIntFromJSON,
	BigUintToJSON,
	BigUintFromJSON,
}

fn stdin_to_string() -> String {
	let mut buffer = String::new();
	io::stdin().read_to_string(&mut buffer).unwrap();
	buffer.trim().to_string()
}

fn main() {
	let options: Options = Options::parse();

	match options.subcommand {
		Subcommand::BigIntToJSON => {
			let n_string = stdin_to_string();
			let n = BigInt::from_str(&n_string).unwrap();
			println!("{}", serde_json::to_string(&n).unwrap());
		},
		Subcommand::BigIntFromJSON => {
			let n_json = stdin_to_string();
			let n = serde_json::from_str::<BigInt>(&n_json).unwrap();
			println!("{}", n.to_string());
		},

		Subcommand::BigUintToJSON => {
			let n_string = stdin_to_string();
			let n = BigUint::from_str(&n_string).unwrap();
			println!("{}", serde_json::to_string(&n).unwrap());
		},
		Subcommand::BigUintFromJSON => {
			let n_json = stdin_to_string();
			let n = serde_json::from_str::<BigUint>(&n_json).unwrap();
			println!("{}", n.to_string());
		},
	}
}
