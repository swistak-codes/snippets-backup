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

// zakładamy, że wyrażenie jest tablicą stringów
function solveRpn(expression) {
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

// zakładamy, że wyrażenie jest tablicą stringów
function solve(expression) {
  const rpn = infixToRpn(expression);
  return solveRpn(rpn);
}

console.log(solve(['6', '+', '2'])); // 8
console.log(solve(['6', '/', '2', '*', '(', '2', '+', '1', ')'])); // 9
console.log(solve(['(', '2', '+', '3', ')', '*', '5'])); // 25