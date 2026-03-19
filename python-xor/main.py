# deklarujemy dwa zbiory
A = {1, 3, 5}
B = {2, 4, 5}
# wypisujemy rezultat użycia funkcji symmetric_difference()
print(A.symmetric_difference(B))  # {1, 2, 3, 4}
print(B.symmetric_difference(A))  # {1, 2, 3, 4}
# to samo uzyskamy stosując operator ^
print(A ^ B) # {1, 2, 3, 4}
print(B ^ A) # {1, 2, 3, 4}