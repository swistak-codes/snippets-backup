program ForPascal;
var
  // deklarujemy licznik iteracji
  // przyjęło się nazywać go "i"
  i: Integer;
begin
    // definiujemy, że iterujemy od 1 do 10 włącznie(!)
    for i := 1 to 10 do begin
      // wypisujemy tekst wraz z wartością licznika
      writeln('Cześć. Iteracja nr ', i);
    end;
    // teraz iterujemy od tyłu
    for i := 10 downto 1 do begin
      // wypisujemy tekst wraz z wartością licznika
      writeln('Jeszcze raz. Iteracja nr ', i);
    end;
end.