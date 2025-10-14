import { Component, signal } from '@angular/core';
import { CartAppComponent } from './components/cart-app/cart-app'; // ✅ nombre correcto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CartAppComponent], // ✅ aquí usamos el nombre correcto
  template: `<app-cart-app></app-cart-app>`, // ✅ usamos el selector definido en el componente
  styleUrls: ['./app.css'] // ✅ plural, no "styleUrl"
})
export class App {
  protected readonly title = signal('nombre-proyecto');
}
