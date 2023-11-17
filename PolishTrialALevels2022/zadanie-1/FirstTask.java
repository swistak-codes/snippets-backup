class FirstTask implements Task {
  public String getTaskName() {
    return "1.1.";
  }

  public String doTask(String entry) {
    int result = 0;
    for (int i = 1; i < entry.length(); i++) {
      Character previous = entry.charAt(i - 1);
      Character current = entry.charAt(i);
      if (previous != current) {
        result++;
      }
    }
    return Integer.toString(result);
  }
}