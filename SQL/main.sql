-- tworzymy tabelę Liczby z kolumną Liczba
CREATE TABLE Liczby(
  Liczba INT PRIMARY KEY
);

-- dodajemy wartości do tabeli
INSERT INTO Liczby (Liczba)
VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10);

-- zapytanie 
SELECT Liczba*Liczba -- zwracamy liczbę podniesioną do kwadratu
FROM Liczby -- pobieramy z tabeli Liczby
WHERE (Liczba % 2) = 0; -- wybieramy jedynie parzyste

-- robimy odstęp w konsoli, aby nie mieszać wyniku zapytania i explaina
SELECT "";

-- sprawdzenie, co SQLite wykonuje podczas zapytania
EXPLAIN SELECT Liczba*Liczba FROM Liczby WHERE (Liczba % 2) = 0;