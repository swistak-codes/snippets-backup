// zakładamy, że wyrażenie jest tablicą stringów
function solve(expression) {
  // inicjujemy stos jako listę tablicową
  const stack = [];
  // dla każdego symbolu w wyrażeniu...
  for (const symbol of expression) {
    // jeśli symbol jest operatorem
    if (['+', '-', '*', '/'].includes(symbol)) {
      // zdejmujemy wartości ze stosu
      const a = stack.pop();
      const b = stack.pop();
      // wykonujemy odpowiednią operację
      let result;
      switch (symbol) {
        case '+': result = b + a; break;
        case '-': result = b - a; break;
        case '*': result = b * a; break;
        case '/': result = b / a; break;
      }
      // dodajemy wynik na stos
      stack.push(result);
    } else {
      // w przypadku gdy jest liczbą, dodajemy go na stos
      // od razu konwertujemy na typ liczbowy
      stack.push(parseFloat(symbol));
    }
  }
  // zwracamy wartość, która jest odłożona na szczycie stosu
  return stack.pop();
}

console.log(solve(['6', '2', '/', '2', '1', '+', '*'])); // 9
console.log(solve(['2', '3', '+', '5', '*'])); // 25
console.log(solve(['12', '2', '3', '4', '*', '10', '5', '/', '+', '*', '+'])); // 40
console.log(solve(['5', '1', '2', '+', '4', '*', '+', '3', '-'])); // 14