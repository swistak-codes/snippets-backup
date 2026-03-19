// import java.util.regex.Matcher;
// import java.util.regex.Pattern;

class ThirdTask implements Task {
  private static final int minGoodRun = 10;

  public String getTaskName() {
    return "1.3.";
  }

  public String doTask(String entry) {
    int goodRuns = 0;
    int currentRun = 0;
    int bestRun = 0;
    Character currentRunChar = ' ';
    Character bestRunChar = ' ';
    for (int i = 0; i < entry.length(); i++) {
      Character current = entry.charAt(i);
      if (currentRunChar == current) {
        currentRun++;
        if (currentRun == minGoodRun) {
          goodRuns++;
        }
        if (currentRun >= minGoodRun && currentRun > bestRun) {
          bestRun = currentRun;
          bestRunChar = currentRunChar;
        }
      } else {
        currentRun = 1;
        currentRunChar = current;
      }
    }
    return String.format("%d %s %d", goodRuns, bestRunChar, bestRun);
  }

  // wersja oparta o wyrażenie regularne
  // public String doTask(String entry) {
  // Pattern pattern = Pattern.compile("(\\w)\\1{9,}");
  // Matcher matcher = pattern.matcher(entry);
  // int goodRuns = 0;
  // int bestRun = 0;
  // Character bestRunChar = ' ';
  // while (matcher.find()) {
  // goodRuns++;
  // String current = matcher.group();
  // if (current.length() > bestRun) {
  // bestRun = current.length();
  // bestRunChar = current.charAt(0);
  // }
  // }
  // return String.format("%d %s %d", goodRuns, bestRunChar, bestRun);
  // }
}