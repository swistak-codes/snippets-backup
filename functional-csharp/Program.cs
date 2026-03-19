using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    public static void Main(string[] args)
    {
        var list = new List<int> { 1, 2, 3, 4, 5 };

        // aplikacja zbiorowa podnosząca liczby do kwadratu
        var squares = list.Select(value => value * value);
        Console.WriteLine(String.Join(", ", squares));

        // filtrowanie - tylko liczby parzyste
        var even = list.Where(value => value % 2 == 0);
        Console.WriteLine(String.Join(", ", even));

        // sprawdzenie, czy wszystkie są parzyste
        var allEven = list.All(value => value % 2 == 0);
        Console.WriteLine(allEven);

        // sprawdzenie, czy cokolwiek jest parzyste
        var anyEven = list.Any(value => value % 2 == 0);
        Console.WriteLine(anyEven);

        // fold zwracający iloczyn elementów listy
        var product = list.Aggregate(1, (accumulator, value) => accumulator * value);
        Console.WriteLine(String.Join(", ", product));

        // iteracja, w ramach której wypiszemy wszystkie elementy
        list.ForEach(value => Console.WriteLine(value));
    }
}