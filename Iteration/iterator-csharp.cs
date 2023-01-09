using System;
using System.Collections.Generic;

class Program
{
    public static void Main(string[] args)
    {
        // deklarujemy listę tablicową z trzema elementami
        var list = new List<string>() { "1", "2-gi element", "3-ci" };
        // wyciągamy iterator
        var it = list.GetEnumerator();
        // iterujemy tak długo, jak możemy przesunąć następny element
        while (it.MoveNext())
        {
            // wypisujemy aktualną wartość
            Console.WriteLine(it.Current);
        }
    }
}