import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;

class Main {
  private static String readFile(String path) throws IOException {
    Path filePath = Path.of(path);
    String content = Files.readString(filePath);
    return content.trim();
  }

  private static void writeResults(Iterable<String> results) throws IOException {
    Path filePath = Path.of("./wyniki1.txt");
    Files.write(filePath, results);
  }

  public static void main(String[] args) throws IOException {
    Task[] tasks = new Task[] { new FirstTask(), new SecondTask(), new ThirdTask() };
    String sampleData = readFile("./mecz_przyklad.txt");
    String realData = readFile("./mecz.txt");
    ArrayList<String> results = new ArrayList<String>();
    for (Task task : tasks) {
      String name = task.getTaskName();
      String sampleSolution = task.doTask(sampleData);
      String realSolution = task.doTask(realData);
      System.out.println(name);
      System.out.println(sampleSolution);
      System.out.println(realSolution);
      results.add(String.format("%s: %s", name, realSolution));
    }
    writeResults(results);
  }
}