program DoWhilePascal;
// w Pascalu zmienne deklarujemy przed właściwym kodem aplikacji
var
  counter: Integer;
begin
  // ustawiamy licznik iteracji na 0
  counter := 0;
  repeat
    // wypisujemy tekst na wyjściu standardowym
    writeln('Cześć');
    // zwiększaym wartość licznika o 1
    inc(counter);
    // ustawiamy, że pętla przestanie się wykonywać
    // gdy licznik osiągnie wartość 10
  until counter = 10;
  // zakończenie aplikacji
end.