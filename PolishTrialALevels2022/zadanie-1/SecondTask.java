class SecondTask implements Task {
  private static final String resultFormat = "%s %d:%d";

  public String getTaskName() {
    return "1.2.";
  }

  public String doTask(String entry) {
    int a = 0;
    int b = 0;
    int i = 0;
    while (i < entry.length() && !hasWon(a, b) && !hasWon(b, a)) {
      Character whoWon = entry.charAt(i);
      if (whoWon == 'A') {
        a++;
      } else if (whoWon == 'B') {
        b++;
      }
      i++;
    }
    String result = "Brak zwycięzcy";
    if (hasWon(a, b)) {
      result = String.format(resultFormat, "A", a, b);
    } else if (hasWon(b, a)) {
      result = String.format(resultFormat, "B", a, b);
    }
    return result;
  }

  // wersja z for i przerwaniem
  // public String doTask(String entry) {
  // int a = 0;
  // int b = 0;
  // for (int i = 0; i < entry.length(); i++) {
  // Character whoWon = entry.charAt(i);
  // if (whoWon == 'A') {
  // a++;
  // } else if (whoWon == 'B') {
  // b++;
  // }
  // if (hasWon(a, b)) {
  // return String.format(resultFormat, "A", a, b);
  // } else if (hasWon(b, a)) {
  // return String.format(resultFormat, "B", a, b);
  // }
  // }
  // return "Brak zwycięzcy";
  // }

  private boolean hasWon(int score, int opponentScore) {
    return score >= 1000 && score - opponentScore >= 3;
  }
}