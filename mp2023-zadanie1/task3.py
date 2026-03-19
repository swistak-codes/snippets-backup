# funkcja pomocnicza do zadania 1.3
# znajduje pozycje, na których znajduje się wskazany znak
def find_char(board, char):
  # zmienna przechowująca pozycje
  result = []
  # iterujemy po kolei po wierszach
  for row_index in range(8):
    # iterujemy po kolei po znakach
    for col_index in range(8):
      # jeśli na danej pozycji jest wskazany znak, zapisujemy go
      if board[row_index][col_index] == char:
        result.append((row_index, col_index))
  # zwracamy wynik
  return result


# funkcja pomocnicza do zadania 1.3
# sprawdza czy jest pusta ścieżka poziomo do wskazanego znaku
# wersja z przejściem w prawo
def is_horizontal_right(board, row, col, char):
  # iterujemy po kolei po wskazanym wierszu od zadanej pozycji
  for col_index in range(col + 1, 8):
    # pobieramy aktualny znak do zmiennej
    current_char = board[row][col_index]
    # jeśli trafiliśmy na szukamy znak, to zwracamy True
    if current_char == char:
      return True
    # jeśli trafiliśmy na znak inny niż pusty to zwracamy False
    elif current_char != ".":
      return False
  # jak doszliśmy do końca nie znajdując znaku, również zwracamy False
  return False


# funkcja pomocnicza do zadania 1.3
# sprawdza czy jest pusta ścieżka poziomo do wskazanego znaku
# wersja z przejściem w lewo
def is_horizontal_left(board, row, col, char):
  # iterujemy po kolei po wskazanym wierszu od zadanej pozycji
  # reversed() aby iterować od aktualnej pozycji do zera
  for col_index in reversed(range(col)):
    # pobieramy aktualny znak do zmiennej
    current_char = board[row][col_index]
    # jeśli trafiliśmy na szukamy znak, to zwracamy True
    if current_char == char:
      return True
    # jeśli trafiliśmy na znak inny niż pusty to zwracamy False
    elif current_char != ".":
      return False
  # jak doszliśmy do końca nie znajdując znaku, również zwracamy False
  return False


# funkcja pomocnicza do zadania 1.3
# sprawdza czy jest pusta ścieżka pionowo do wskazanego znaku
# wersja z przejściem w dół
def is_vertical_down(board, row, col, char):
  # iterujemy po kolei po wskazanym wierszu od zadanej pozycji
  for row_index in range(row + 1, 8):
    # pobieramy aktualny znak do zmiennej
    current_char = board[row_index][col]
    # jeśli trafiliśmy na szukamy znak, to zwracamy True
    if current_char == char:
      return True
    # jeśli trafiliśmy na znak inny niż pusty to zwracamy False
    elif current_char != ".":
      return False
  # jak doszliśmy do końca nie znajdując znaku, również zwracamy False
  return False


# funkcja pomocnicza do zadania 1.3
# sprawdza czy jest pusta ścieżka pionowo do wskazanego znaku
# wersja z przejściem w górę
def is_vertical_up(board, row, col, char):
  # iterujemy po kolei po wskazanym wierszu od zadanej pozycji
  # reversed() aby iterować od aktualnej pozycji do zera
  for row_index in reversed(range(row)):
    # pobieramy aktualny znak do zmiennej
    current_char = board[row_index][col]
    # jeśli trafiliśmy na szukamy znak, to zwracamy True
    if current_char == char:
      return True
    # jeśli trafiliśmy na znak inny niż pusty to zwracamy False
    elif current_char != ".":
      return False
  # jak doszliśmy do końca nie znajdując znaku, również zwracamy False
  return False


# zadanie 1.3
def task3(data):
  # liczba plansz z szachem białej wieży
  white = 0
  # liczba plansz z szachem czarnej wieży
  black = 0
  # iterujemy po kolei po planszach
  for board in data:
    # pobierzmy pozycje wież
    white_pos = find_char(board, 'W')
    black_pos = find_char(board, 'w')
    # sprawdźmy najpierw czy któraś biała wieża szachuje
    for (row, col) in white_pos:
      # sprawdzamy czy szachuje poziomo lub pionowo
      if (is_horizontal_right(board, row, col, 'k')
          or is_horizontal_left(board, row, col, 'k')
          or is_vertical_down(board, row, col, 'k')
          or is_vertical_up(board, row, col, 'k')):
        # jeśli tak, zwiększamy zmienną o 1
        white += 1
    # powtarzamy to samo dla czarnych wież
    for (row, col) in black_pos:
      # sprawdzamy czy szachuje poziomo lub pionowo
      if (is_horizontal_right(board, row, col, 'K')
          or is_horizontal_left(board, row, col, 'K')
          or is_vertical_down(board, row, col, 'K')
          or is_vertical_up(board, row, col, 'K')):
        # jeśli tak, zwiększamy zmienną o 1
        black += 1
  # zwracamy rezultat zadania
  return f"{white} {black}"
