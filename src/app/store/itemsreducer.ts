import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, calculateTotal } from './accionescompras';
import { Product } from '../Models/product';

// Definir la interfaz del estado del carrito
export interface CartState {
  items: Product[];
  total: number;
}

// Estado inicial
export const initialState: CartState = {
  items: [],
  total: 0
};

// Reducer
export const cartReducer = createReducer(
  initialState,

  // Agregar producto
  on(addToCart, (state, { product }) => {
    const existing = state.items.find(item => item.id === product.id);
    let updatedItems;

    if (existing) {
      // Si el producto ya existe, aumentamos la cantidad
      updatedItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      // Si no existe, lo agregamos
      updatedItems = [...state.items, { ...product }];
    }

    const newTotal = updatedItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    return { ...state, items: updatedItems, total: newTotal };
  }),

  // Eliminar producto por ID
  on(removeFromCart, (state, { id }) => {
    const updatedItems = state.items.filter(item => item.id !== id);
    const newTotal = updatedItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    return { ...state, items: updatedItems, total: newTotal };
  }),

  // Calcular total (puede ser útil si necesitas recalcular sin agregar/eliminar)
  on(calculateTotal, (state) => {
    const newTotal = state.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    return { ...state, total: newTotal };
  })
);
