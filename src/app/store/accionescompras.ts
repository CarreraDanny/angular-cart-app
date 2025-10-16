import { createAction, props } from '@ngrx/store';
import { Product } from '../Models/product'; // ajusta la ruta si tu clase Product está en otra carpeta

// Acción para agregar un producto al carrito
export const addToCart = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

// Acción para eliminar un producto del carrito por su ID
export const removeFromCart = createAction(
  '[Cart] Remove Product',
  props<{ id: number }>()
);
// Acción para calcular el total del carrito
export const calculateTotal = createAction('[Cart] Calculate Total');
