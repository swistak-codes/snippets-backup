let rec fib n a b =
  match n with
  | 0 -> a
  | 1 -> b
  | _ -> fib (n - 1) b (a + b)
let fibonacci n = fib n 0 1

let rec fac n acc =
  match n with
  | 0 -> acc
  | _ -> fac (n - 1) (n * acc)
let factorial n = fac n 1 

for i = 1 to 10 do
  printf "fibonacci(%d) = %d\n" i (fibonacci i)

for i = 1 to 10 do
  printf "factorial(%d) = %d\n" i (factorial i)