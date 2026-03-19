using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    public static void Main(string[] args)
    {
        // tworzymy listę tablicową 
        var list = new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        var evenSquared = from value in list // wyciągamy wartości z listy
                          where value % 2 == 0 // interesują nas tylko parzyste
                          select value * value; // zwracamy podniesione do kwadratu
        Console.WriteLine(String.Join(", ", evenSquared));
        // ta sama operacja ale zapisana funkcjami iterującymi
        var evenSquared2 = list
          .Where(value => value % 2 == 0)
          .Select(value => value * value);
        Console.WriteLine(String.Join(", ", evenSquared2));
    }
}