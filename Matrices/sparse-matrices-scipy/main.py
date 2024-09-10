import numpy as np
import scipy.sparse as sparse

print('-- DIA --')

data_dia = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
offsets_dia = np.array([0, -2, 1])
matrix_dia = sparse.dia_matrix((data_dia, offsets_dia), shape=(4, 4))
print(matrix_dia.todense())
# [[ 1 10  0  0]
#  [ 0  2 11  0]
#  [ 5  0  3 12]
#  [ 0  6  0  4]]

print('-- LIL --')

matrix_lil = sparse.lil_matrix((4, 4))
matrix_lil[0, 1] = 1
matrix_lil[1, 1] = 2
matrix_lil[3, 0] = 3
matrix_lil[3, 1] = 4
print(matrix_lil.todense())
# [[0. 1. 0. 0.]
#  [0. 2. 0. 0.]
#  [0. 0. 0. 0.]
#  [3. 4. 0. 0.]]
print(matrix_lil.data)
# [list([np.float64(1.0)]) list([np.float64(2.0)]) list([])
#  list([np.float64(3.0), np.float64(4.0)])]
print(matrix_lil.rows)
# [list([1]) list([1]) list([]) list([0, 1])]

print('-- DOK --')

matrix_dok = sparse.dok_matrix((4, 4))
matrix_dok[0, 1] = 1
matrix_dok[1, 1] = 2
matrix_dok[3, 0] = 3
matrix_dok[3, 1] = 4
print(matrix_dok.todense())
# [[0. 1. 0. 0.]
#  [0. 2. 0. 0.]
#  [0. 0. 0. 0.]
#  [3. 4. 0. 0.]]
print(matrix_dok._dict)
# {
#     (0, 1): np.float64(1.0),
#     (1, 1): np.float64(2.0),
#     (3, 0): np.float64(3.0),
#     (3, 1): np.float64(4.0)
# }

print('-- COO --')

data_coo = np.array([1, 2, 3, 4])
row_coo = np.array([0, 1, 3, 3])
col_coo = np.array([1, 1, 0, 1])
matrix_coo = sparse.coo_matrix((data_coo, (row_coo, col_coo)), (4, 4))
print(matrix_coo.todense())
# [[0 1 0 0]
#  [0 2 0 0]
#  [0 0 0 0]
#  [3 4 0 0]]

print('-- CSR --')

matrix_csr_from_dia = matrix_dia.tocsr()
print(matrix_csr_from_dia.todense())
# [[ 1 10  0  0]
#  [ 0  2 11  0]
#  [ 5  0  3 12]
#  [ 0  6  0  4]]
matrix_csr_from_coo = sparse.csr_matrix((data_coo, (row_coo, col_coo)), (4, 4))
print(matrix_csr_from_coo.todense())
# [[0 1 0 0]
#  [0 2 0 0]
#  [0 0 0 0]
#  [3 4 0 0]]
data_csr = np.array([1, 2, 3, 4])
indices_csr = np.array([1, 1, 0, 1])
indptr_csr = np.array([0, 1, 2, 2, 4])
matrix_csr = sparse.csr_matrix((data_csr, indices_csr, indptr_csr), (4, 4))
print(matrix_csr.todense())
# [[0 1 0 0]
#  [0 2 0 0]
#  [0 0 0 0]
#  [3 4 0 0]]

print('-- CSC --')

data_csc = np.array([3, 1, 2, 4])
indices_csc = np.array([3, 0, 1, 3])
indptr_csc = np.array([0, 1, 4, 4, 4])
matrix_csc = sparse.csc_matrix((data_csc, indices_csc, indptr_csc), (4, 4))
print(matrix_csc.todense())
# [[0 1 0 0]
#  [0 2 0 0]
#  [0 0 0 0]
#  [3 4 0 0]]

print('-- BSR --')

data_bsr = np.array([[[1, 1], [1, 1]], [[2, 2], [2, 2]], [[3, 3], [3, 3]],
                     [[4, 4], [4, 4]]])
indices_bsr = np.array([1, 1, 0, 1])
indptr_bsr = np.array([0, 1, 2, 2, 4])
matrix_bsr = sparse.bsr_matrix((data_bsr, indices_bsr, indptr_bsr), (8, 8))
print(matrix_bsr.todense())
# [[0 0 1 1 0 0 0 0]
#  [0 0 1 1 0 0 0 0]
#  [0 0 2 2 0 0 0 0]
#  [0 0 2 2 0 0 0 0]
#  [0 0 0 0 0 0 0 0]
#  [0 0 0 0 0 0 0 0]
#  [3 3 4 4 0 0 0 0]
#  [3 3 4 4 0 0 0 0]]
