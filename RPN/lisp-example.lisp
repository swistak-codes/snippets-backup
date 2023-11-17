;;; wypisanie wartości 2+2
(write-line (write-to-string (+ 2 2)))

;;; funkcja podnosząca liczbę do kwadratu oraz jej użycie
(defun square (x)
  (* x x))
(write-line (write-to-string (square 4)))

;;; funkcja rekurencyjna licząca silnię oraz jej użycie
(defun factorial (n)
  (if (< n 2) 1 
    (* n (factorial (- n 1)))))
(write-line (write-to-string (factorial 6)))