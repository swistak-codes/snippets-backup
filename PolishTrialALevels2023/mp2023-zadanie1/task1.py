# zadanie 1.1
def task1(data):
  # zmienna przechowująca liczbę plansz z pustymi kolumnami
  count = 0
  # zmienna z max liczbą pustych kolumn
  max_cols = 0
  # iterujemy po kolei po planszach
  for board in data:
    # zmienna przechowująca liczbę pustych kolumn
    empty = 0
    # iterujemy po kolei po 8 kolumnach
    for col_index in range(8):
      # zmienna przechowująca, czy kolumna jest pusta
      is_empty = True
      # iterujemy po kolei po 8 wierszach kolumny
      for row_index in range(8):
        # sprawdzamy, czy w danej pozycji jest inny znak niż '.'
        if board[row_index][col_index] != ".":
          # jeśli tak, to zmieniamy zmienną na False
          is_empty = False
          # i przerywamy pętlę
          break
      # jeśli kolumna była pusta
      if is_empty:
        # zwiększamy liczbę pustych kolumn
        empty += 1
    # jeśli była przynajmniej jedna pusta kolumna
    if empty > 0:
      # zwiększamy liczbę plansz z pustymi kolumnami
      count += 1
      # jeśli liczba pustych kolumn jest większa od poprzedniej
      # to przypisujemy ją do max_cols
      max_cols = max(max_cols, empty)
  # zwracamy rezultat zadania
  return f"{count} {max_cols}"
