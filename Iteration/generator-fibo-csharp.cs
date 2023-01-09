using System;
using System.Collections.Generic;
using System.Numerics;

class Program
{
    static IEnumerable<BigInteger> Fibonacci()
    {
        // BigInteger to liczby całkowite bez ograniczenia zakresu
        BigInteger a = 0;
        yield return a;
        BigInteger b = 1;
        yield return b;
        // iterujemy nieskończenie, ale dzięki "yield return" nie zawiesimy programu
        while (true)
        {
            var tmp = a;
            a = b;
            b = tmp + b;
            yield return b;
        }
    }

    public static void Main(string[] args)
    {
        var iterator = Fibonacci().GetEnumerator();
        for (int i = 0; i < 100; i++)
        {
            iterator.MoveNext();
            Console.WriteLine("{0} {1}", i, iterator.Current);
        }
    }
}