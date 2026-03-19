class NaiveUniqueCounter {
  #set = new Set();

  add(element) {
    this.#set.add(element);
  }

  count() {
    return this.#set.size;
  }
}

const counter = new NaiveUniqueCounter();
counter.add("ananas");
counter.add("banan");
counter.add("jablko");
counter.add("jablko");
counter.add("ananas");
console.log("Unikalnych elementów: ", counter.count());
// Unikalnych elementów: 3