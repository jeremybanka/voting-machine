/**
 * A lossless number.
 */
export class Rational {
	protected fractionalValues = new Map<bigint, bigint>();

	protected toFloat(): number {
		let total = 0;
		for (const [denominator, numerator] of this.fractionalValues) {
			total += Number(numerator) / Number(denominator);
		}
		return total;
	}

	public constructor(numerator?: bigint, denominator = 1n) {
		if (numerator && denominator) {
			this.incorporate(numerator, denominator);
		}
	}

	public incorporate(numerator: bigint, denominator: bigint): void {
		let newNumerator = numerator;
		const oldNumerator = this.fractionalValues.get(denominator);
		if (oldNumerator) {
			newNumerator = oldNumerator + numerator;
		}
		this.fractionalValues.set(denominator, newNumerator);
	}

	public entries(): IterableIterator<[bigint, bigint]> {
		return this.fractionalValues.entries();
	}

	public static isGreater(a: Rational) {
		return {
			than: (b: Rational) => a.toFloat() > b.toFloat(),
		};
	}
}
