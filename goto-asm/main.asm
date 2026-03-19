; kod aplikacji
section	.text
  global _start   ; określenie etykiety od której zaczynamy
_start:
  ; inicjalizacja aplikacji
  mov ecx, 0      ; ustawiamy licznik iteracji na 0
loop_start:       ; etykieta określająca początek pętli
  ; sprawdzenie warunku pętli
  cmp ecx, 10     ; sprawdzamy czy licznik osiągnął wartosć 10
  je loop_end     ; jeśli tak, przeskakujemy do loop_end
  push ecx        ; wrzucamy z powrotem wartość licznika na stos
  ; wypisanie tekstu
  mov edx, len    ; ustawiamy w EDX długość tekstu
  mov ecx, msg    ; w ECX tekst
  mov ebx, 1      ; w EBX ustawiamy, że interesuje nas wyjście standardowe (1)
  mov eax, 4      ; w EAX ustawiamy komendę SYS_WRITE
  int 0x80        ; przerwanie wołąjące jądro systemu, aby wykonało polecenie
  ; dalsza obsługa pętli
  pop ecx         ; ponownie ściągamy licznik ze stosu
  add ecx, 1      ; zwiększamy wartość licznika o 1
  jmp loop_start  ; przeskakujemy do początku pętli
loop_end:
  ; zakończenie aplikacji
  mov eax, 1      ; w EAX ustawiamy komendę SYS_EXIT
  int 0x80        ; ponownie wołamy jądro systemu za pomocą przerwania

; dane zapisane w pamięci
section	.data
  msg	db	'Cześć',0xa  ; tekst do wypisania
  len	equ	$ - msg      ; długość tekstu