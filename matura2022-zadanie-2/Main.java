import java.io.*;
import java.nio.file.*;
import java.util.*;

class Main {
  private static List<int[]> readFile(String path) throws IOException {
    Path filePath = Path.of(path);
    List<String> content = Files.readAllLines(filePath);
    List<int[]> result = new ArrayList();
    for (String line : content) {
      String[] pair = line.split(" ");
      result.add(new int[] { Integer.parseInt(pair[0]), Integer.parseInt(pair[1]) });
    }
    return result;
  }

  private static void writeResults(Iterable<String> results) throws IOException {
    Path filePath = Path.of("./wyniki2.txt");
    Files.write(filePath, results);
  }

  private static boolean check(int x, int y, int N) {
    if (x == y) {
      return true;
    }
    boolean left = false;
    boolean right = false;
    if (2 * x <= N) {
      left = check(2 * x, y, N);
    }
    if (2 * x + 1 <= N) {
      right = check(2 * x + 1, y, N);
    }
    return left || right;
  }

  public static void main(String[] args) throws IOException {
    System.out.println("Test przykładu:");
    System.out.printf("1 -> 4: %b\n", check(1, 4, 5));
    System.out.printf("3 -> 5: %b\n", check(3, 5, 5));
    System.out.println("Rozwiązanie:");
    List<int[]> pairs = readFile("./pary.txt");
    List<String> results = new ArrayList();
    for (int[] pair : pairs) {
      boolean canTraverse = check(pair[0], pair[1], 100000);
      if (canTraverse) {
        String answer = String.format("%d %d", pair[0], pair[1]);
        System.out.println(answer);
        results.add(answer);
      }
    }
    writeResults(results);
  }
}