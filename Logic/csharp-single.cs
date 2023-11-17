using System;
using System.Linq;

class Program {
  public static void Main (string[] args)
  {
    // tablica z liczbami podzielnymi przez 15
    int[] numbers = { 15, 30, 45, 60 };
    // sprawdzamy, czy tylko jedna jest podzielna przez 2
    try 
    {
      Console.WriteLine(numbers.Single(x => x % 2 == 0));
    } 
    catch (Exception e)
    {
      Console.WriteLine(e.Message); // spełnia więcej niż jeden element
    }
    // sprawdzamy, czy jest tylko jedna mniejsza od 0
    try 
    {
      Console.WriteLine(numbers.Single(x => x < 0));
    } 
    catch (Exception e)
    {
      Console.WriteLine(e.Message); // żaden element nie spełnia
    }
    // sprawdzamy, czy jest tylko jedna podzielna przez 9
    Console.WriteLine(numbers.Single(x => x % 9 == 0)); // 45
  }
}