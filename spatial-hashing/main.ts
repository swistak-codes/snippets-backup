// typ reprezentujący prostokąt
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  // dodatkowa informacja, aby móc zidentyfikować elementy
  label?: string;
}

// klasa reprezentująca siatkę przestrzenną
class SpatialHash {
  // mapa przechowująca komórki siatki i obiekty w nich zawarte
  private hashTable: Map<string, Rectangle[]> = new Map();

  // tworząc siatkę decydujemy o rozmiarze komórek
  constructor(private cellSize: number) {}

  // metoda pomocnicza do sprawdzania czy dwa prostokąty się przecinają
  private intersects(a: Rectangle, b: Rectangle): boolean {
    return (
      b.x <= a.x + a.width &&
      b.x + b.width >= a.x &&
      b.y <= a.y + a.height &&
      b.y + b.height >= a.y
    );
  }

  // metoda zwracająca klucz komórki na jej podstawie współrzędnych
  private getCellKey(gridX: number, gridY: number): string {
    // klucz będzie prostym stringiem zawierającym współrzędne komórki
    return `${gridX},${gridY}`;
  }

  // metoda zwracająca zakres komórek zajmowanych przez obiekt na jednej osi
  private getCellRange(startPos: number, size: number): [number, number] {
    // wyznaczamy początek i koniec zakresu komórek
    const start = Math.floor(startPos / this.cellSize);
    const end = Math.floor((startPos + size) / this.cellSize);
    // zwracamy zakres jako parę liczb
    return [start, end];
  }

  // metoda zwracająca komórki zajmowane przez obiekt
  private getObjectCells(obj: Rectangle): string[] {
    // wyznaczamy zakres komórek zajmowanych przez obiekt na osi X
    const [minX, maxX] = this.getCellRange(obj.x, obj.width || 0);
    // oraz na osi Y
    const [minY, maxY] = this.getCellRange(obj.y, obj.height || 0);
    // tworzymy tablicę zawierającą klucze wszystkich komórek
    const cells: string[] = [];
    // iterujemy po wszystkich komórkach w zakresie
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        // dodajemy klucz komórki do tablicy
        cells.push(this.getCellKey(x, y));
      }
    }
    // zwracamy tablicę kluczy
    return cells;
  }

  // metoda dodająca obiekt do siatki
  public insert(obj: Rectangle): void {
    // wyznaczamy komórki zajmowane przez obiekt
    const cells = this.getObjectCells(obj);
    // iterujemy po wszystkich komórkach
    for (const key of cells) {
      // jeśli komórka nie istnieje, tworzymy ją
      if (!this.hashTable.has(key)) {
        this.hashTable.set(key, []);
      }
      // dodajemy obiekt do komórki
      this.hashTable.get(key)!.push(obj);
    }
  }

  // metoda zwracająca obiekty przecinające się z zadanym prostokątem
  public query(range: Rectangle): Rectangle[] {
    // tworzymy zbiór wyników
    const result = new Set<Rectangle>();
    // wyznaczamy komórki zajmowane przez zadany prostokąt
    const cells = this.getObjectCells(range);
    // iterujemy po wszystkich komórkach
    for (const key of cells) {
      // pobieramy obiekty z komórki
      const objects = this.hashTable.get(key);
      if (objects) {
        // jeśli komórka istnieje, iterujemy po wszystkich obiektach w niej zawartych
        for (const obj of objects) {
          // sprawdzamy czy obiekt przecina się z zadanym prostokątem
          if (this.intersects(obj, range)) {
            // jeśli tak, dodajemy go do zbioru wyników
            result.add(obj);
          }
        }
      }
    }
    // zwracamy tablicę wyników
    return [...result];
  }

  // metoda zwracająca zapisaną liczbę komórek w siatce
  public getCellCount(): number {
    return this.hashTable.size;
  }
}

// przykład użycia
const sh = new SpatialHash(100);

// dodawanie obiektów do drzewa
sh.insert({ x: 100, y: 200, width: 50, height: 30, label: "A" });
sh.insert({ x: 300, y: 400, width: 100, height: 80, label: "B" });
sh.insert({ x: 100, y: 300, width: 20, height: 20, label: "C" });
sh.insert({ x: 250, y: 500, width: 10, height: 10, label: "D" });
sh.insert({ x: 900, y: 900, width: 5, height: 5, label: "E" });
sh.insert({ x: 500, y: 500, width: 100, height: 100, label: "F" });
sh.insert({ x: 100, y: 100, width: 100, height: 100, label: "G" });

// w wyniku dodania tych elementów, struktura wykorzysta 13 komórek siatki
console.log(sh.getCellCount());

// wyszukiwanie w obszarze
const searchArea: Rectangle = { x: 80, y: 180, width: 100, height: 100 };
const results = sh.query(searchArea);

console.log(results); // powinno zwrócić obiekty A i G
