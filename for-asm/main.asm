; kod aplikacji
section	.text
  global _start   ; określenie etykiety od której zaczynamy
_start:
  ; inicjalizacja aplikacji
  mov ecx, 10      ; ustawiamy licznik iteracji na 0
loop_start:       ; etykieta określająca początek pętli
  push ecx        ; wrzucamy z powrotem wartość licznika na stos
  ; wypisanie tekstu
  mov edx, len    ; ustawiamy w EDX długość tekstu
  mov ecx, msg    ; w ECX tekst
  mov ebx, 1      ; w EBX ustawiamy, że interesuje nas wyjście standardowe (1)
  mov eax, 4      ; w EAX ustawiamy komendę SYS_WRITE
  int 0x80        ; przerwanie wołąjące jądro systemu, aby wykonało polecenie
  ; dalsza obsługa pętli
  pop ecx         ; ponownie ściągamy licznik ze stosu
  loop loop_start ; przeskakujemy do początku pętli
  ; zakończenie aplikacji
  mov eax, 1      ; w EAX ustawiamy komendę SYS_EXIT
  int 0x80        ; ponownie wołamy jądro systemu za pomocą przerwania

; dane zapisane w pamięci
section	.data
  msg	db	'Cześć',0xa  ; tekst do wypisania
  len	equ	$ - msg      ; długość tekstu