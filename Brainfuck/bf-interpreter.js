const readline = require("readline");

function getChar() {
  return new Promise((resolve) => {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.resume();
    process.stdin.setRawMode(true);
    process.stdin.once("keypress", (string, key) => {
      if (key.ctrl && key.name === "c") {
        process.exit();
      }
      process.stdin.pause();
      process.stdin.setRawMode(false);
      resolve(string.charCodeAt(0));
    });
  });
}

async function bfInterpreter(bfCode) {
  // pamięć Brainfucka
  const memory = new Array(30000).fill(0);
  // stos przechowujący początki pętli
  const loopStack = [];
  // aktualna pozycja wskaźnika
  let pointer = 0;
  for (let i = 0; i < bfCode.length; i++) {
    const symbol = bfCode[i];
    switch (symbol) {
      case ">":
        pointer++;
        break;
      case "<":
        pointer--;
        break;
      case "+":
        memory[pointer]++;
        break;
      case "-":
        memory[pointer]--;
        break;
      case ".":
        process.stdout.write(String.fromCharCode(memory[pointer]));
        break;
      case ",":
        memory[pointer] = await getChar();
        break;
      case "[":
        // jeśli nie chcemy wykonać pętli, musimy znaleźć jej zakończenie
        if (memory[pointer] === 0) {
          // tą zmienną będziemy odmierzać ile początków pętli napotkaliśmy
          // żeby wiedzieć ile razy musimy zignorować symbol `]`
          let loop = 1;
          // będziemy iterować tak długo, aż trafimy na zakończenie aktualnej pętli
          while (loop > 0) {
            // zwiększamy indeks o 1, aby przejść do następnego symbolu
            i++;
            if (bfCode[i] === "[") {
              // jeśli napotkaliśmy na start pętli, zwiększamy licznik pętli
              loop++;
            } else if (bfCode[i] === "]") {
              // w przeciwnym wypadku zmniejszamy
              // gdy dobijemy do 0 oznacza to, że trafiliśmy na szukany `]`
              loop--;
            }
          }
        } else {
          // wykonujemy pętlę, dlatego zapisujemy adres jej początku na stosie
          loopStack.push(i);
        }
        break;
      case "]":
        if (memory[pointer] !== 0) {
          // cofamy się do początku pętli
          // odejmujemy 1, bo pętla for zawsze zwiększa licznik na końcu
          i = loopStack.pop() - 1;
        } else {
          // jeśli w pamięci aktualna komórka jest równa 0
          // to nie ma sensu się cofać, usuwamy zapamiętany adres
          loopStack.pop();
        }
        break;
    }
  }
}

(async () => {
  // prosty Hello World
  await bfInterpreter(
    `
    H: ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.
    e: +++++++++++++++++++++++++++++.
    l: +++++++.
    l: .
    o: +++.
    spacja: -------------------------------------------------------------------------------.
    W: +++++++++++++++++++++++++++++++++++++++++++++++++++++++.
    o: ++++++++++++++++++++++++.
    r: +++.
    l: ------.
    d: --------.
  `
  );
  console.log("");
  // zaawansowany Hello World, https://en.wikipedia.org/wiki/Brainfuck#Hello_World!
  await bfInterpreter(
    "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++."
  );
  console.log("");
  // ROT13, https://en.wikipedia.org/wiki/Brainfuck#ROT13
  await bfInterpreter(
    `
    -,+[                         Read first character and start outer character reading loop
        -[                       Skip forward if character is 0
            >>++++[>++++++++<-]  Set up divisor (32) for division loop
                                   (MEMORY LAYOUT: dividend copy remainder divisor quotient zero zero)
            <+<-[                Set up dividend (x minus 1) and enter division loop
                >+>+>-[>>>]      Increase copy and remainder / reduce divisor / Normal case: skip forward
                <[[>+<-]>>+>]    Special case: move remainder back to divisor and increase quotient
                <<<<<-           Decrement dividend
            ]                    End division loop
        ]>>>[-]+                 End skip loop; zero former divisor and reuse space for a flag
        >--[-[<->+++[-]]]<[         Zero that flag unless quotient was 2 or 3; zero quotient; check flag
            ++++++++++++<[       If flag then set up divisor (13) for second division loop
                                   (MEMORY LAYOUT: zero copy dividend divisor remainder quotient zero zero)
                >-[>+>>]         Reduce divisor; Normal case: increase remainder
                >[+[<+>-]>+>>]   Special case: increase remainder / move it back to divisor / increase quotient
                <<<<<-           Decrease dividend
            ]                    End division loop
            >>[<+>-]             Add remainder back to divisor to get a useful 13
            >[                   Skip forward if quotient was 0
                -[               Decrement quotient and skip forward if quotient was 1
                    -<<[-]>>     Zero quotient and divisor if quotient was 2
                ]<<[<<->>-]>>    Zero divisor and subtract 13 from copy if quotient was 1
            ]<<[<<+>>-]          Zero divisor and add 13 to copy if quotient was 0
        ]                        End outer skip loop (jump to here if ((character minus 1)/32) was not 2 or 3)
        <[-]                     Clear remainder from first division if second division was skipped
        <.[-]                    Output ROT13ed character from copy and clear it
        <-,+                     Read next character
    ]                            End character reading loop
    `
  );
})();
