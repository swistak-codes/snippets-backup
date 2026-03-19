import java.util.*;

class ThirdTask implements Task {
  public String getTaskName() {
    return "3.4.";
  }

  public List<String> doTask(List<Integer> entries) {
    List<Character> digits = Arrays.asList('0', '1', '2', '3',
        '4', '5', '6', '7',
        '8', '9', 'A', 'B',
        'C', 'D', 'E', 'F');
    HashMap<Character, Integer> counter = new HashMap();
    // uzupełnienie mapy wartościami
    for (Character digit : digits) {
      counter.put(digit, 0);
    }
    // algorytm wykonujący zadanie
    for (int number : entries) {
      String hex = Integer.toHexString(number).toUpperCase();
      for (int i = 0; i < hex.length(); i++) {
        Character current = hex.charAt(i);
        counter.put(current, counter.get(current) + 1);
      }
    }
    List<String> result = new ArrayList();
    // spisanie rezultatów
    for (Character digit : digits) {
      result.add(String.format("%s:%d", digit, counter.get(digit)));
    }
    return result;
  }
}