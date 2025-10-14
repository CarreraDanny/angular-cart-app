import { Routes } from '@angular/router';
import { CartAppComponent } from './components/cart-app/cart-app';
import { CartComponent } from './components/cart/cart';

export const appRoutes: Routes = [
  { path: '', component: CartAppComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];