// typ reprezentujący prostokąt
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  // dodatkowa informacja, aby móc zidentyfikować elementy
  label?: string;
}

// klasa reprezentująca węzeł drzewa czwórkowego
class QuadTree {
  // stała opisująca pojemność każdego z węzłów
  private static readonly CAPACITY = 4;
  // obiekty przechowywane w tym węźle
  private objects: Rectangle[] = [];
  // dzieci aktualnego węzła
  private northwest?: QuadTree;
  private northeast?: QuadTree;
  private southwest?: QuadTree;
  private southeast?: QuadTree;

  // tworząc węzeł musimy podać obszar, który ma reprezentować
  constructor(private boundary: Rectangle) {}

  // wartość pomocnicza, opisująca czy węzeł jest podzielony
  private get divided(): boolean {
    return (
      this.northwest != null &&
      this.northeast != null &&
      this.southwest != null &&
      this.southeast != null
    );
  }

  // metoda pomocnicza do sprawdzania czy dwa prostokąty się przecinają
  private intersects(a: Rectangle, b: Rectangle): boolean {
    return (
      b.x <= a.x + a.width &&
      b.x + b.width >= a.x &&
      b.y <= a.y + a.height &&
      b.y + b.height >= a.y
    );
  }

  // metoda podzielająca węzeł na 4 dzieci
  private subdivide(): void {
    // wyznaczamy współrzędne i wymiary dzieci
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;

    // tworzymy dzieci
    this.northwest = new QuadTree({ x, y, width: w, height: h });
    this.northeast = new QuadTree({ x: x + w, y, width: w, height: h });
    this.southwest = new QuadTree({ x, y: y + h, width: w, height: h });
    this.southeast = new QuadTree({ x: x + w, y: y + h, width: w, height: h });

    // przenosimy zapisane elementy do dzieci
    for (const obj of this.objects) {
      this.insertToChildren(obj);
    }
    // na koniec czyścimy tablicę obiektów w tym węźle
    this.objects = [];
  }

  // metoda pomocnicza próbująca wstawić obiekt do wszystkich dzieci
  private insertToChildren(obj: Rectangle): void {
    this.northwest!.insert(obj);
    this.northeast!.insert(obj);
    this.southwest!.insert(obj);
    this.southeast!.insert(obj);
  }

  // metoda dodająca obiekt do węzła
  public insert(obj: Rectangle): void {
    // najpierw sprawdzamy czy obiekt się przecina z obszarem węzła
    if (!this.intersects(this.boundary, obj)) {
      // jeśli nie, to nie dodajemy go do węzła
      return;
    }

    // następnie sprawdzamy czy węzeł jest podzielony
    if (this.divided) {
      // jeśli tak, to próbujemy dodać obiekt do jego dzieci
      this.insertToChildren(obj);
    } else {
      // jeśli nie, to zostają nam dwie możliwości
      if (this.objects.length < QuadTree.CAPACITY) {
        // jeśli węzeł nie jest przepełniony, to dodajemy obiekt do niego
        this.objects.push(obj);
      } else {
        // jeśli jest przepełniony, to dzielimy go i próbujemy dodać obiekt do jego dzieci
        this.subdivide();
        this.insertToChildren(obj);
      }
    }
  }

  // metoda wyszukująca obiekty w danym obszarze
  public query(range: Rectangle): Rectangle[] {
    const found = new Set<Rectangle>();
    // wykonujemy pomocniczą metodę rekurencyjną, która wypełni tablicę found
    this.queryInternal(range, found);
    // konwertujemy zbiór na tablicę i zwracamy ją
    return [...found];
  }

  // metoda pomocnicza do wyszukiwania obiektów w danym obszarze
  private queryInternal(range: Rectangle, found: Set<Rectangle>): void {
    if (!this.intersects(this.boundary, range)) {
      // jeśli obszar wyszukiwania nie przecina się z obszarem węzła, to kończymy
      return;
    }

    if (this.divided) {
      // jeśli węzeł jest podzielony, to szukamy w jego dzieciach
      this.northwest!.queryInternal(range, found);
      this.northeast!.queryInternal(range, found);
      this.southwest!.queryInternal(range, found);
      this.southeast!.queryInternal(range, found);
    } else {
      // jeśli węzeł nie jest podzielony, to sprawdzamy wszystkie obiekty w nim przechowywane
      for (const obj of this.objects) {
        if (this.intersects(range, obj)) {
          // jeśli obiekt się przecina z obszarem wyszukiwania, to dodajemy go do zbioru
          found.add(obj);
        }
      }
    }
  }

  // metoda do zliczania węzłów i elementów w drzewie
  public getStats(): { nodes: number; elements: number } {
    let nodes = 1; // liczymy aktualny węzeł
    let elements = this.objects.length;

    if (this.divided) {
      const nw = this.northwest!.getStats();
      const ne = this.northeast!.getStats();
      const sw = this.southwest!.getStats();
      const se = this.southeast!.getStats();

      nodes += nw.nodes + ne.nodes + sw.nodes + se.nodes;
      elements += nw.elements + ne.elements + sw.elements + se.elements;
    }

    return { nodes, elements };
  }
}

// przykład użycia
const boundary: Rectangle = { x: 0, y: 0, width: 1000, height: 1000 };
const qt = new QuadTree(boundary);

// dodawanie obiektów do drzewa
qt.insert({ x: 100, y: 200, width: 50, height: 30, label: "A" });
qt.insert({ x: 300, y: 400, width: 100, height: 80, label: "B" });
qt.insert({ x: 100, y: 300, width: 20, height: 20, label: "C" });
qt.insert({ x: 250, y: 500, width: 10, height: 10, label: "D" });
qt.insert({ x: 900, y: 900, width: 5, height: 5, label: "E" });
qt.insert({ x: 500, y: 500, width: 100, height: 100, label: "F" });
qt.insert({ x: 100, y: 100, width: 100, height: 100, label: "G" });

// drzewo wykorzysta 9 węzłów i przechowa 12 kopii elementów
console.log(qt.getStats());

// wyszukiwanie w obszarze
const searchArea: Rectangle = { x: 80, y: 180, width: 100, height: 100 };
const results = qt.query(searchArea);

console.log(results); // powinno zwrócić obiekty A i G
