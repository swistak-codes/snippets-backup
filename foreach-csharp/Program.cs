using System;
using System.Collections.Generic;

class Program
{
    public static void Main(string[] args)
    {
        // deklarujemy listę tablicową z trzema elementami
        var list = new List<string>() { "1", "2-gi element", "3-ci" };
        // iterujemy po elementach listy
        foreach (var element in list)
        {
            // wypisujemy aktualny element
            Console.WriteLine(element);
        }
    }
}