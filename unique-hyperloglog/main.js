// obliczamy wcześniej 2**32, aby nie powtarzać obliczeń
const POW_2_32 = Math.pow(2, 32);

class HyperLogLog {
    // w konstruktorze przyjmujemy ile bitów będzie wyznaczać koszyk
    constructor(b) {
        this.b = b;
        // obliczamy liczbę koszyków (1 << b == 2**b)
        this.m = 1 << b;
        // tworzymy koszyki i wypełniamy je zerami
        this.buckets = new Array(this.m).fill(0);
        // obliczamy współczynnik korygujący razem z m**2
        this.amm = (0.7213 / (1 + 1.079 / this.m)) * this.m ** 2;
    }

    // funkcja dodająca element typu string
    add(value) {
        // obliczamy hash
        const hash = this.#hash(value);
        // na podstawie b pierwszych bitów określamy indeks koszyka
        const bucket = hash >>> (32 - this.b);
        // "odcinamy" pozostałe bity
        const w = hash & ((1 << (32 - this.b)) - 1);
        // obliczamy liczbę wiodących zer wbudowaną funkcją clz32
        const zeros = Math.clz32(w) + 1;
        // ustalamy nową wartość koszyka
        // obliczamy ją jako max z aktualnej wartości i liczby zer dodawanego elementu
        this.buckets[bucket] = Math.max(this.buckets[bucket], zeros);
    }

    // funkcja obliczająca liczbę unikalnych elementów
    count() {
        // liczymy średnią harmoniczną
        const z = 1 / this.buckets.reduce((acc, val) => acc + 2 ** -val, 0);
        // mnożymy ją przez współczynnik korygujący i m**2 aby uzyskać estymację
        let e = this.amm * z;
        // sprawdzamy, czy estymacja jest za mała
        if (e <= (5 / 2) * this.m) {
            // liczymy ile jest pustych koszyków
            let V = this.buckets.filter((val) => val === 0).length;
            if (V > 0) {
                // jeśli jakikolwiek był, ustawiamy nową estymację
                e = this.m * Math.log(this.m / V);
            }
        } else if (e > (1 / 30) * POW_2_32) {
            // korekcja jeśli estymacja jest za duża
            // zwracamy skorygowaną estymację
            e = -(POW_2_32 * Math.log(1 - e / POW_2_32));
        }
        return e;
    }

    // funkcja haszująca, implementacja algorytmu DJB2
    #hash(value) {
        // wartość początkowa hasza
        let hash = 5381;
        // iterujemy po wszystkich znakach ciągu
        for (let i = 0; i < value.length; i++) {
            // pobieramy kod znaku
            const char = value.charCodeAt(i);
            // zwiększamy aktualny hash wg wzoru hash * 33 + char
            // (hash << 5) + hash == hash * 32 + hash === hash * 33
            hash = (hash << 5) + hash + char;
            // w poniższy sposób w JS zapewniamy,
            // że hash będzie 32-bitową liczbą całkowitą
            hash |= 0;
        }
        // zwracamy hash
        // dodatkowo też wykonujemy przesunięcie zapewniające,
        // żeby liczba była nieujemna
        return hash >>> 0;
    }
}

const counter = new HyperLogLog(16);
counter.add("ananas");
counter.add("banan");
counter.add("jablko");
counter.add("jablko");
counter.add("ananas");
console.log("Unikalnych elementów: ", counter.count());
// Unikalnych elementów: 3.004403133222472
