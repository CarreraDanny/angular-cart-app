import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../Models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-catalog',
  standalone: true, // Muy importante para usar imports
  imports: [CommonModule, ProductCard],
  templateUrl: './catalog.html',
})
export class CatalogComponent {
  products: Product[] = [
    new Product(1, 'Laptop HP', 'Laptop de alto rendimiento', 1200),
    new Product(2, 'Mouse Logitech', 'Mouse inalámbrico ergonómico', 25),
    new Product(3, 'Teclado Mecánico', 'Retroiluminado RGB', 85),
    new Product(4, 'Monitor Samsung', 'Monitor curvo de 27 pulgadas', 350),
  ];
}
