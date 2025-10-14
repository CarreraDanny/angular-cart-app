import { Component, Input  } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../Models/product';
@Component({
  selector: 'app-product-card',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() product!: Product;

  addToCart() {
    console.log('Agregado al carrito:', this.product.nombre);
  }
}