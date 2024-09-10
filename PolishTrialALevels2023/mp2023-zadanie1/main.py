from task1 import task1
from task2 import task2
from task3 import task3


# funkcja wczytująca dane z podanego pliku
def load_data(filename):
  # zmienna, która przechowa nam wynik
  # będzie to tablica plansz
  result = []
  # zmienna, która przechowa nam aktualną planszę (tablica stringów)
  board = []
  # otwieramy plik
  # konstrukcja `with` zadba o to, żebyśmy nie musieli pamiętać o zamknięciu pliku
  with open(filename, "r") as f:
    # iterujemy po kolejnych liniach pliku
    for line in f:
      # usuwamy znaki białe
      line = line.strip()
      # sprawdzamy czy linia nie jest pusta
      if line:
        # dodajemy linię do planszy
        board.append(line)
      else:
        # jeśli linia jest pusta, to dodajemy planszę do wyniku
        result.append(board)
        # samą planszę zerujemy
        board = []
  # dodajemy ostatnią planszę do wyniku, jeśli jest niepusta
  if len(board) > 0:
    result.append(board)
  # zwracamy wynik
  return result


# funkcja zapisująca wynik zadania
def save_result(result, name):
  # otwieramy plik do zapisu
  # parametr 'w' spowoduje nadpisanie istniejącego pliku
  with open(f"{name}.txt", "w") as f:
    # zapisujemy wynik
    f.write(result)
  # dodatkowo wypiszmy go też w konsoli
  print(result)


sample_data = load_data('szachy_przyklad.txt')
real_data = load_data('szachy.txt')

print('Zadanie 1.1, przykładowe dane')
print(task1(sample_data))
print('Zadanie 1.1, prawdziwe dane')
save_result(task1(real_data), 'zadanie1_1')

print('Zadanie 1.2, przykładowe dane')
print(task2(sample_data))
print('Zadanie 1.2, prawdziwe dane')
save_result(task2(real_data), 'zadanie1_2')

print('Zadanie 1.3, przykładowe dane')
print(task3(sample_data))
print('Zadanie 1.3, prawdziwe dane')
save_result(task3(real_data), 'zadanie1_3')
