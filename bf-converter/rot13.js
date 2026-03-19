
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

  const memory = new Array(30000).fill(0);
  let pointer = 0;

  (async () => {
memory[pointer]--;memory[pointer] = await getChar();memory[pointer]++;while (memory[pointer] !== 0) {memory[pointer]--;while (memory[pointer] !== 0) {pointer++;pointer++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;while (memory[pointer] !== 0) {pointer++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;pointer--;memory[pointer]--;}pointer--;memory[pointer]++;pointer--;memory[pointer]--;while (memory[pointer] !== 0) {pointer++;memory[pointer]++;pointer++;memory[pointer]++;pointer++;memory[pointer]--;while (memory[pointer] !== 0) {pointer++;pointer++;pointer++;}pointer--;while (memory[pointer] !== 0) {while (memory[pointer] !== 0) {pointer++;memory[pointer]++;pointer--;memory[pointer]--;}pointer++;pointer++;memory[pointer]++;pointer++;}pointer--;pointer--;pointer--;pointer--;pointer--;memory[pointer]--;}}pointer++;pointer++;pointer++;while (memory[pointer] !== 0) {memory[pointer]--;}memory[pointer]++;pointer++;memory[pointer]--;memory[pointer]--;while (memory[pointer] !== 0) {memory[pointer]--;while (memory[pointer] !== 0) {pointer--;memory[pointer]--;pointer++;memory[pointer]++;memory[pointer]++;memory[pointer]++;while (memory[pointer] !== 0) {memory[pointer]--;}}}pointer--;while (memory[pointer] !== 0) {memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;memory[pointer]++;pointer--;while (memory[pointer] !== 0) {pointer++;memory[pointer]--;while (memory[pointer] !== 0) {pointer++;memory[pointer]++;pointer++;pointer++;}pointer++;while (memory[pointer] !== 0) {memory[pointer]++;while (memory[pointer] !== 0) {pointer--;memory[pointer]++;pointer++;memory[pointer]--;}pointer++;memory[pointer]++;pointer++;pointer++;}pointer--;pointer--;pointer--;pointer--;pointer--;memory[pointer]--;}pointer++;pointer++;while (memory[pointer] !== 0) {pointer--;memory[pointer]++;pointer++;memory[pointer]--;}pointer++;while (memory[pointer] !== 0) {memory[pointer]--;while (memory[pointer] !== 0) {memory[pointer]--;pointer--;pointer--;while (memory[pointer] !== 0) {memory[pointer]--;}pointer++;pointer++;}pointer--;pointer--;while (memory[pointer] !== 0) {pointer--;pointer--;memory[pointer]--;pointer++;pointer++;memory[pointer]--;}pointer++;pointer++;}pointer--;pointer--;while (memory[pointer] !== 0) {pointer--;pointer--;memory[pointer]++;pointer++;pointer++;memory[pointer]--;}}pointer--;while (memory[pointer] !== 0) {memory[pointer]--;}pointer--;process.stdout.write(String.fromCharCode(memory[pointer]));while (memory[pointer] !== 0) {memory[pointer]--;}pointer--;memory[pointer]--;memory[pointer] = await getChar();memory[pointer]++;}
  })();
