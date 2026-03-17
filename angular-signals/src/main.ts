import 'zone.js/dist/zone';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

// tworzymy aplikację składającą się tylko z jednego komponentu
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  // zamiast tworzyć ręcznie efekt, framework sam go utworzy przez użycie sygnału w widoku
  template: `
    <div id="app">
      <div>Przycisk kliknięty: {{count()}} raz(y)</div>
      <div>
        <button (click)="handleClick()">Zwiększ licznik</button>
      </div>
    </div>
  `,
})
export class App {
  // definiujemy signal z licznikiem
  count = signal(0);

  // metoda wywoływana na kliknięciu przycisku
  handleClick() {
    // ustawiamy nową wartość w sygnale
    this.count.set(this.count() + 1);
    // alternatywnie, możemy przekazać funkcję aktualizującą wartość
    // this.count.update((count) => count + 1);
  }
}

bootstrapApplication(App);
