package main
import (
		"fmt"
)
func main() {
		var z1 complex128 = 3 + 4i
		var z2 complex128 = complex(1, -2)
		z3 := z1 + z2
		fmt.Println(z3)  // wypisane zostanie: (4+2i)
}