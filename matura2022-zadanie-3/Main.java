import java.io.*;
import java.nio.file.*;
import java.util.*;

class Main {
  private static List<Integer> readFile(String path) throws IOException {
    Path filePath = Path.of(path);
    List<String> content = Files.readAllLines(filePath);
    List<Integer> result = new ArrayList();
    for (String line : content) {
      result.add(Integer.parseInt(line));
    }
    return result;
  }

  private static void writeResults(Iterable<String> results) throws IOException {
    Path filePath = Path.of("./wyniki3.txt");
    Files.write(filePath, results);
  }

  public static void main(String[] args) throws IOException {
    Task[] tasks = new Task[] { new FirstTask(), new SecondTask(), new ThirdTask() };
    List<Integer> sampleData = readFile("./liczby_przyklad.txt");
    List<Integer> realData = readFile("./liczby.txt");
    ArrayList<String> results = new ArrayList<String>();
    for (Task task : tasks) {
      String name = task.getTaskName();
      List<String> sampleSolution = task.doTask(sampleData);
      List<String> realSolution = task.doTask(realData);
      System.out.println(name);
      System.out.println("Przykład:");
      System.out.println(String.join("\n", sampleSolution));
      System.out.println("Prawdziwe dane:");
      System.out.println(String.join("\n", realSolution));
      results.add(name);
      results.addAll(realSolution);
    }
    writeResults(results);
  }
}