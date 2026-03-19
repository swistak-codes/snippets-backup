from task3 import task3
from task4 import task4
from task5 import task5


# funkcja wczytująca dane z podanego pliku
def load_data(filename):
  # zmienna, która przechowa nam wynik
  # będzie to tablica trójek
  result = []
  # otwieramy plik
  # konstrukcja `with` zadba o to, żebyśmy nie musieli pamiętać o zamknięciu pliku
  with open(filename, "r") as f:
    # iterujemy po kolejnych liniach pliku
    for line in f:
      # usuwamy znaki białe
      line = line.strip()
      # sprawdzamy czy linia nie jest pusta
      if line:
        # rozdzielamy linię na trzy elementy po spacji
        [M, a, b] = line.split(' ')
        # zapisujemy wynik w tablicy po konwersji na liczby
        result.append((int(M), int(a), int(b)))
  # zwracamy wynik
  return result


# funkcja zapisująca wynik zadań
def save_result(result):
  # otwieramy plik do zapisu
  # parametr 'w' spowoduje nadpisanie istniejącego pliku
  with open("wyniki3.txt", "w") as f:
    # zapisujemy wynik
    f.write(result)


sample_data = load_data('liczby_przyklad.txt')
real_data = load_data('liczby.txt')

print('Zadanie 3.3, przykładowe dane')
print(task3(sample_data))
print('Zadanie 3.3, prawdziwe dane')
task3_result = task3(real_data)
print(task3_result)

print('Zadanie 3.4, przykładowe dane')
print(task4(sample_data))
print('Zadanie 3.4, prawdziwe dane')
task4_result = task4(real_data)
print(task4_result)

print('Zadanie 3.5, przykładowe dane')
print(task5(sample_data))
print('Zadanie 3.5, prawdziwe dane')
task5_result = task5(real_data)
print(task5_result)

save_result(f'3.3. {task3_result}\n3.4. {task4_result}\n3.5. {task5_result}')
