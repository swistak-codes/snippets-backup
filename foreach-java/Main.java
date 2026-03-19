import java.util.*;

class Main {
  public static void main(String[] args) {
    // deklarujemy listę tablicową z trzema elementami
    var list = new ArrayList<String>(List.of("1", "2-gi element", "3-ci"));
    // iterujemy po elementach listy
    for (var element : list) {
      // wypisujemy aktualny element
      System.out.println(element);
    }
  }
}