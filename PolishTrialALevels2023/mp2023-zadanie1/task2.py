# zadanie 1.2
def task2(data):
  # zmienna przechowująca liczbę plansz w równowadze
  count = 0
  # zmienna z min liczbą bierek
  min_stones = 9999
  # iterujemy po kolei po planszach
  for board in data:
    # zmienna ze słownikiem zliczającym bierki danego rodzaju
    # dla ułatwienia zliczajmy też liczbę pustych pól
    symbols = {
        'K': 0,
        'k': 0,
        'W': 0,
        'w': 0,
        'S': 0,
        's': 0,
        'H': 0,
        'h': 0,
        'G': 0,
        'g': 0,
        'P': 0,
        'p': 0,
        '.': 0,
    }
    # iterujemy po kolei po wierszach
    for row in board:
      # iterujemy po kolei po znakach
      for char in row:
        # zwiększamy liczbę
        symbols[char] += 1
    # sprawdźmy czy jest stan równowagi
    # zróbmy to w najprostszy możliwy sposób
    if (symbols['K'] == symbols['k'] and symbols['W'] == symbols['w']
        and symbols['S'] == symbols['s'] and symbols['H'] == symbols['h']
        and symbols['G'] == symbols['g'] and symbols['P'] == symbols['p']):
      # jeśli tak, to zwiększamy liczbę plansz w równowadze
      count += 1
      # i sprawdzamy czy liczba bierek jest mniejsza od poprzedniej
      # wykorzystajmy fakt, że plansza ma 64 pola (8*8) i znamy liczbę pustych pól
      min_stones = min(min_stones, 64 - symbols['.'])
  # zwracamy rezultat zadania
  return f"{count} {min_stones}"
