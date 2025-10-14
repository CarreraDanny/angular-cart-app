import { Injectable } from '@angular/core';
import { CartItem } from '../Models/cartItems';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: CartItem[] = [];

  getCartProducts(): CartItem[] {
    return this.cartProducts;
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartProducts.find(cartItem => cartItem.product.id === item.product.id);
    if (existingItem) {
      existingItem.cantidad += item.cantidad;
      existingItem.total += item.total;
    } else {
      this.cartProducts.push(item);
    }
  }

  removeFromCart(item: CartItem): void {
    this.cartProducts = this.cartProducts.filter(cartItem => cartItem.product.id !== item.product.id);
  }
}