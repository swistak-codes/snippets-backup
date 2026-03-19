using System;
using System.Numerics;
using System.Globalization;

class Program
{
    static void Main()
    {
        var z1 = new Complex(3.0, 4.0);   // 3.0 + 4.0i
        var z2 = new Complex(1.0, -2.0);  // 1.0 - 2.0i
        var z3 = z1 + z2;

        double re = z3.Real;
        double im = z3.Imaginary;

        Console.Write(z3.ToString());  // wypisane zostanie: <4; 2>
    }
}