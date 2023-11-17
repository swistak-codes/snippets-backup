// mapa priorytetów operatorów
// niższy to wcześniejsza kolejność wykonywania
const OPERATOR_PRIORITY = {
  '+': 2,
  '-': 2,
  '*': 1,
  '/': 1
};

// lista operatorów
const OPERATORS = ['+', '-', '*', '/'];

// zakładamy, że wyrażenie jest tablicą stringów
function infixToRpn(expression) {
  // inicjujemy stos jako listę tablicową
  const stack = [];
  // inicjujemy wynik, dla uproszczenia niech będzie tablicą
  const result = [];
  // dla każdego symbolu w wyrażeniu...
  for (const symbol of expression) {
    // jeśli wyrażenie jest liczbą
    const symbolAsNumber = parseFloat(symbol);
    if (!Number.isNaN(symbolAsNumber)) {
      result.push(symbol);
    }
    // jeśli jest operatorem
    else if (OPERATORS.includes(symbol)) {
      // tak długo, jak na szczycie stosu jest operator
      // i ma mniejszą bądź równą kolejność wykonywania...
      // szczyt stosu to u nas ostatni element (-1)
      while (stack.length > 0
        && OPERATORS.includes(stack.at(-1))
        && OPERATOR_PRIORITY[stack.at(-1)] <= OPERATOR_PRIORITY[symbol]) {
        // ...to ściągamy go ze stosu i dodajemy do wyniku
        result.push(stack.pop());
      }
      // dodajemy operator na stos
      stack.push(symbol);
    }
    // jeśli jest lewym nawiasem
    else if (symbol === '(') {
      // dodajemy na stos
      stack.push(symbol);
    }
    // jeśli jest prawym nawiasem
    else if (symbol === ')') {
      // tak długo, jak symbol na szczycie stosu nie jest lewym nawiasem...
      while (stack.length > 0 && stack.at(-1) !== '(') {
        // ...ściągamy ze stosu i dodajemy do wyniku
        result.push(stack.pop());
      }
      // jeśli symbol na górze stosu to lewy nawias
      if (stack.at(-1) === '(') {
        // zdejmujemy go ze stosu
        stack.pop();
      }
    }
  }
  // tak długo, jak stos zawiera jeszcze operatory...
  while (stack.length > 0) {
    // ...dodajemy je do wyniku
    result.push(stack.pop());
  }
  // zwracamy wynik
  return result;
}

console.log(infixToRpn(['6', '+', '2'])); // 6 2 +
console.log(infixToRpn(['6', '/', '2', '*', '(', '2', '+', '1', ')'])); // 6 2 / 2 1 + *