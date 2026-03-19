using System;
using System.Collections.Generic;

class Program
{
    // tworzymy generator zwracający trzy ciągi znaków
    static IEnumerable<string> Generator()
    {
        yield return "1";
        yield return "2-gi element";
        yield return "3-ci";
    }

    public static void Main(string[] args)
    {
        // iterujemy po elementach zwracanych przez generator
        foreach (var element in Generator())
        {
            // wypisujemy aktualny element
            Console.WriteLine(element);
        }
    }
}