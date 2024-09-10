using System;
using System.Diagnostics;

class Program
{
    private static int A(int m, int n)
    {
        int[] next = new int[m + 1];
        int[] goal = new int[m + 1];
        for (int i = 0; i < m + 1; i++)
        {
            next[i] = 0;
            goal[i] = 1;
        }
        goal[m] = -1;
        int value;
        do
        {
            value = next[0] + 1;
            bool transferring = true;
            int mCurrent = 0;
            while (transferring)
            {
                if (next[mCurrent] == goal[mCurrent])
                {
                    goal[mCurrent] = value;
                }
                else
                {
                    transferring = false;
                }
                next[mCurrent] = next[mCurrent] + 1;
                mCurrent++;
            }
        } while (next[m] != n + 1);
        return value;
    }

    // pierwszy argument to funkcja której czas będziemy mierzyć
    // Func<int,int,int> czyli zwraca int (ostatni argument) i przyjmuje dwa inty
    public static void Measure(Func<int, int, int> func, int m, int n)
    {
        // tworzymy nowy stoper od razu go uruchamiając
        var watch = Stopwatch.StartNew();
        // wykonujemy przekazaną funkcję
        var result = func(m, n);
        // zatrzymujemy stoper
        watch.Stop();
        // możemy z obiekty typu TimeSpan znajdującego się w Elapsed pobrać
        // ile minęło milisekund jako typ zmiennoprzecinkowy
        var timeMs = watch.Elapsed.TotalMilliseconds;
        // ewentualnie prosto ze stopera odczytać liczbę ticks (1 tick = 100 ns)
        // sam wybierz, który zapis wolisz, wyniki są te same
        var timeTicks = watch.ElapsedTicks;
        // tu możesz zrobić z czasem co chcesz, ja go wypisuję w konsoli
        Console.WriteLine($"Wynik: {result}; czas: {timeMs}ms, {timeTicks} ticks");
    }

    public static void Main(string[] args)
    {
        Measure(A, 1, 4);
        Measure(A, 2, 4);
        Measure(A, 3, 4);
        Measure(A, 4, 1);
    }
}