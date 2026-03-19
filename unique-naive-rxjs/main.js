const { of, distinct, count } = require("./rxjs.umd.min");

of("ananas", "banan", "jablko", "jablko", "ananas")
  .pipe(distinct(), count())
  .subscribe((x) => console.log("Unikalnych elementów: ", x));
