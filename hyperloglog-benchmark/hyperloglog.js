import mm from "murmurhash-js";

const SEED = 0x9e3779b9;
const POW_2_32 = Math.pow(2, 32);
const TOO_HI = (1 / 30) * POW_2_32;

class BaseHyperLogLog {
  constructor(b) {
    this.b = b;
    this.m = 1 << b;
    this.buckets = new Array(this.m).fill(0);
    this.amm = (0.7213 / (1 + 1.079 / this.m)) * this.m ** 2;
  }

  add(value) {
    const hash = this.hash(value);
    const bucket = hash >>> (32 - this.b);
    const w = hash & ((1 << (32 - this.b)) - 1);
    const zeros = Math.clz32(w) + 1;
    this.buckets[bucket] = Math.max(this.buckets[bucket], zeros);
  }

  count() {
    const z = 1 / this.buckets.reduce((acc, val) => acc + 2 ** -val, 0);
    let e = this.amm * z;
    if (e <= (5 / 2) * this.m) {
      let V = this.buckets.filter((val) => val === 0).length;
      if (V > 0) {
        e = this.m * Math.log(this.m / V);
      }
    } else if (e > TOO_HI) {
      e = -(POW_2_32 * Math.log(1 - e / POW_2_32));
    }
    return Math.trunc(e);
  }

  hash(value) {
    throw new Error("Uzyto BaseHyperLogLog zamiast implementacji");
  }
}

export class HyperLogLogDjb2 extends BaseHyperLogLog {
  hash(value) {
    let hash = 5381;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 33) ^ value.charCodeAt(i);
    }
    return hash >>> 0;
  }
}

export class HyperLogLogMurmurHash3 extends BaseHyperLogLog {
  hash(value) {
    return mm.murmur3(value, SEED);
  }
}
