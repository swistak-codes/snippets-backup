const prettier = require("prettier");
const fs = require("fs/promises");

// kod pobierania znaku
const getChar = `
  const readline = require('readline');

  function getChar() {
    return new Promise((resolve) => {
      readline.emitKeypressEvents(process.stdin);
      process.stdin.resume();
      process.stdin.setRawMode(true);
      process.stdin.once('keypress', (string, key) => {
        if (key.ctrl && key.name === 'c') {
          process.exit();
        }
        process.stdin.pause();
        process.stdin.setRawMode(false);
        resolve(string.charCodeAt(0));
      });
    });
  }
`;

// kod inicjalizujący
const init = `
  const memory = new Array(30000).fill(0);
  let pointer = 0;

  (async () => {
`;

// kod kończący aplikację
const end = `
  })();
`;

// mapa symbol BF -> instrukcja JS
const symbolToJs = {
  ">": "pointer++;",
  "<": "pointer--;",
  "+": "memory[pointer]++;",
  "-": "memory[pointer]--;",
  ".": "process.stdout.write(String.fromCharCode(memory[pointer]));",
  ",": "memory[pointer] = await getChar();",
  "[": "while (memory[pointer] !== 0) {",
  "]": "}",
};

async function bfToJs(bfCode) {
  // zmienna przechowująca kod w JavaScript
  let result = "";
  if (bfCode.includes(",")) {
    // kod pobierania znaku dodajemy tylko, jeśli jest potrzebny
    result += getChar;
  }
  // dodajemy kod inicjalizujący aplikację
  result += init;
  // iterujemy po kolejnych znakach aby je przekonwertować
  for (let i = 0; i < bfCode.length; i++) {
    // pobieramy instrukcję dla aktualnego znaku
    const instruction = symbolToJs[bfCode[i]];
    // jeśli symbol był prawidłowy, dodajemy instrukcję kodu
    if (instruction) {
      result += instruction;
    }
  }
  // dodajemy kod zakańczający aplikację
  result += end;
  // formatujemy kod Prettierem
  result = await prettier.format(result, { parser: "babel" });
  // zwracamy kod
  return result;
}

async function generateBfFile(bfCode, filename) {
  // generujemy kod w JavaScript
  const jsCode = await bfToJs(bfCode);
  // zapisujemy kod w pliku
  await fs.writeFile(filename, jsCode);
  console.log(`Plik ${filename} zapisano pomyślnie!`);
}

(async () => {
  // prosty Hello World
  await generateBfFile(
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
  `,
    "hello1.js"
  );
  // zaawansowany Hello World, https://en.wikipedia.org/wiki/Brainfuck#Hello_World!
  await generateBfFile(
    "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
    "hello2.js"
  );
  // ROT13, https://en.wikipedia.org/wiki/Brainfuck#ROT13
  await generateBfFile(
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
    `,
    "rot13.js"
  );
})();
