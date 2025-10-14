import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../Models/cartItems';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
})
export class CartComponent {
  cartProducts: CartItem[] = [];

  constructor(private cartService: CartService) {
    this.cartProducts = this.cartService.getCartProducts();
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
    this.cartProducts = this.cartService.getCartProducts();
  }

  getCartTotal(): number {
    return this.cartProducts.reduce((sum, item) => sum + item.total, 0);
  }

  openCartModal(modal: any): void {
    modal.open();
  }
}
