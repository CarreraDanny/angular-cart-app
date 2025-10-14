import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { products } from '../data/product.data'; // importamos los datos de ejemplo

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsList: Product[] = products.map(p => 
    new Product(p.id, p.name, p.description, p.price)
  );

  constructor() { }

  findAll(): Product[] {
    return this.productsList;
  }
}
