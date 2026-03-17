let rec fibonacci n =
  match n with
  | 0 -> 0
  | 1 -> 1
  | _ -> (fibonacci (n - 1)) + (fibonacci (n - 2))

let rec factorial n =
  match n with
  | 0 -> 1
  | _ -> factorial (n - 1) * n

for i = 1 to 10 do
  printf "fibonacci(%d) = %d\n" i (fibonacci i)

for i = 1 to 10 do
  printf "factorial(%d) = %d\n" i (factorial i)