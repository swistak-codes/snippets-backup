import java.util.ArrayList;

class Main {
  public static void main(String[] args) {
    var list = new ArrayList<Integer>();
    // Tworzymy nową listę tablicową
    var size = getArrayListCapacity(list);
    // W zmiennej size będziemy trzymać aktualny rozmiar tablicy.
    // Niestety w Javie nie da się bezpośrednio dostać do pojemności listy.
    // Z tego powodu skorzystamy ze specjalnej funkcji (implementacja poniżej).
    System.out.printf("Początkowy rozmiar listy: %s\n", size);
    for (var i = 0; i < 200; i++)
    {
      // Robimy pętlę, która wykona się 200 razy
      // Zaczynamy od 0, będzie trwać tak długo aż licznik jest mniejszy od 200
      // I na koniec każdej iteracji zwiększamy licznik o 1
      // i++ to skrócony zapis dla i = i + 1
      list.add(i);
      // Dodajemy licznik na koniec listy
      var newSize = getArrayListCapacity(list);
      // Zapisujemy aktualny rozmiar listy do zmiennej
      if (newSize != size) {
        // Sprawdzamy czy wielkość tablicy się zmieniła w stosunku do ostatniej
        // Jeżeli jest różna, wtedy wchodzimy w warunek
        size = newSize;
        // Zapisujemy aktualny rozmiar tablicy
        System.out.printf("Zmiana rozmiaru na: %s przy %s elementach\n", size, list.size());
      }
    }
  }

  private static int getArrayListCapacity(ArrayList<Integer> list) {
    // Kod zapożyczony z: https://www.javacodeexamples.com/java-arraylist-capacity/1016
    try {
      var arrayField = ArrayList.class.getDeclaredField("elementData");
      // Tworzymy odniesienie do pola elementData.
      // Pod nim kryje się tablica, która przechowuje elementy listy.
      arrayField.setAccessible(true);
      // Ustawiamy, aby była dostępna do odczytu.
      // Domyślnie jest to pole prywatne, czyli ukryte przed programistą
      var array = (Object[])arrayField.get(list);
      // Wyciągamy pole elementData z konkretnej listy podanej jako argument funkcji
      return array.length;
      // Zwracamy rozmiar tablicy
    } catch(Exception e) {
      return 0;
      // W przypadku błędu zwróćmy 0, aczkolwiek w tym przypadku błąd nie powinien w ogóle wystąpić.
    }
  }
}