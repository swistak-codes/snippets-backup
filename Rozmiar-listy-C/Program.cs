using System;
using System.Collections.Generic;

class MainClass 
{
  public static void Main (string[] args) 
  {
    var list = new List<int>();
    // Tworzymy nową listę tablicową
    var size = list.Capacity;
    // W zmiennej size będziemy trzymać aktualny rozmiar tablicy
    // W List w C# kryje się on pod zmienną Capacity 
    Console.WriteLine($"Początkowy rozmiar listy: {size}");
    for (var i = 0; i < 200; i++)
    {
      // Robimy pętlę, która wykona się 200 razy
      // Zaczynamy od 0, będzie trwać tak długo aż licznik jest mniejszy od 200
      // I na koniec każdej iteracji zwiększamy licznik o 1
      // i++ to skrócony zapis dla i = i + 1
      list.Add(i);
      // Dodajemy licznik na koniec listy
      if (list.Capacity != size)
      {
        // Sprawdzamy czy wielkość tablicy się zmieniła w stosunku do ostatniej
        // Jeżeli jest różna, wtedy wchodzimy w warunek
        size = list.Capacity;
        // Zapisujemy aktualny rozmiar tablicy
        Console.WriteLine($"Zmiana rozmiaru na: {size} przy {list.Count} elementach");
      }
    }
  }
}