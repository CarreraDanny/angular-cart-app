import { Product } from './product';

export class CartItem {
  product: Product;   // Referencia al producto original
  cantidad: number;   // Cantidad de este producto en el carrito
  total: number;      // Cambiado a no readonly para permitir modificaciones

  constructor(product: Product, cantidad: number = 1) {
    this.product = product;
    this.cantidad = cantidad;
    this.total = product.precio * cantidad; // Inicializa el total
  }

  // Método opcional para recalcular el total de este item
  calcularTotal(): void {
    this.total = this.product.precio * this.cantidad;
  }
}
