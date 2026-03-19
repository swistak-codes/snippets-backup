import java.util.*;

class Main {
  public static void main(String[] args) {
    // deklarujemy listę tablicową z trzema elementami
    var list = new ArrayList<String>(List.of("1", "2-gi element", "3-ci"));
    // wyciągamy iterator
    var it = list.iterator();
    // iterujemy tak długo, jak istnieje następny element
    while (it.hasNext()) {
      // wypisujemy wartość następnego elementu
      System.out.println(it.next());
    }
  }
}