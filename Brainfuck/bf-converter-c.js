const fs = require("fs/promises");
const { execSync } = require("child_process");

// kod inicjalizujący
// dopisujemy nieco kodu dodatkowego, aby terminal nie działał w trybie buforowanym
const init = `
#include <stdio.h>
#include <stdlib.h>
#include <termios.h>
#include <unistd.h>

int main()
{
  struct termios oldt, newt;
  int ch;
  tcgetattr(STDIN_FILENO, &oldt);
  newt = oldt;
  newt.c_lflag &= ~(ICANON | ECHO);
  tcsetattr(STDIN_FILENO, TCSANOW, &newt);
  
  char memory[30000] = {0};
  char *pointer = memory;
`;

// kod kończący aplikację
const end = `
  tcsetattr(STDIN_FILENO, TCSANOW, &oldt);
  return 0;
}
`;

// mapa symbol BF -> instrukcja C
const symbolToC = {
  ">": "pointer++;",
  "<": "pointer--;",
  "+": "++(*pointer);",
  "-": "--(*pointer);",
  ".": "putchar(*pointer);",
  ",": "*pointer = getchar();",
  "[": "while (*pointer) {",
  "]": "}",
};

function bfToC(bfCode) {
  // zmienna przechowująca kod w C
  let result = "";
  // dodajemy kod inicjalizujący aplikację
  result += init;
  // iterujemy po kolejnych znakach aby je przekonwertować
  for (let i = 0; i < bfCode.length; i++) {
    // pobieramy instrukcję dla aktualnego znaku
    const instruction = symbolToC[bfCode[i]];
    // jeśli symbol był prawidłowy, dodajemy instrukcję kodu
    if (instruction) {
      result += instruction;
    }
  }
  // dodajemy kod zakańczający aplikację
  result += end;
  // zwracamy kod
  return result;
}

async function generateBfFile(bfCode, filename) {
  // generujemy kod w JavaScript
  const jsCode = bfToC(bfCode);
  // zapisujemy kod w pliku
  await fs.writeFile(filename, jsCode);
  // formatujemy zapisany kod za pomocą GNU Indent
  execSync(`indent -npro -kr -i8 -ts8 -sob -l80 -ss -ncs -cp1 ${filename}`);
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
    "hello1.c"
  );
  // zaawansowany Hello World, https://en.wikipedia.org/wiki/Brainfuck#Hello_World!
  await generateBfFile(
    "++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
    "hello2.c"
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
    "rot13.c"
  );
})();
