import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/product';
import { CartItem } from '../../Models/cartItems';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

// Importar Bootstrap para manejar el modal
declare const bootstrap: any;

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-app.html',
  styleUrls: ['./cart-app.css'],
})
export class CartAppComponent {

  productos: Product[] = [];
  cartProducts: CartItem[] = [];  // Ahora usamos CartItem
  private modalRef: NgbModalRef | undefined;

  // Variable para controlar la visibilidad del carrito
  showCart: boolean = true;

  // Variable para controlar la sección actual
  currentSection: string = 'home';

  // Lista filtrada de productos
  filteredProducts: Product[] = [];

  constructor(private service: ProductService, private modalService: NgbModal) {
    this.productos = this.service.findAll();
    this.filteredProducts = this.productos; // Inicializar con todos los productos
    this.loadCartFromSession(); // Cargar productos del carrito al inicializar el componente
  }

  addToCart(product: Product) {
    const found = this.cartProducts.find(item => item.product.id === product.id);
    if (found) {
      found.cantidad++;
      found.total += product.precio; // Actualizar el total del producto existente
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `Se ha añadido otra unidad de ${product.nombre} al carrito.`,
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      this.cartProducts.push(new CartItem(product));
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${product.nombre} se ha añadido al carrito.`,
        timer: 2000,
        showConfirmButton: false
      });
    }
    this.saveCartToSession(); // Guardar el carrito en sessionStorage después de agregar
  }

  // Método para eliminar un producto del carrito
  removeFromCart(item: any): void {
    this.cartProducts = this.cartProducts.filter(cartItem => cartItem !== item);
    Swal.fire({
      icon: 'info',
      title: 'Producto eliminado',
      text: `${item.product.nombre} se ha eliminado del carrito.`,
      timer: 2000,
      showConfirmButton: false
    });
    this.saveCartToSession(); // Guardar el carrito en sessionStorage después de eliminar
  }

  // Método para calcular el total del carrito
  getCartTotal(): number {
    return this.cartProducts.reduce((sum, item) => sum + item.total, 0);
  }

  // Guardar productos del carrito en sessionStorage
  saveCartToSession(): void {
    sessionStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  loadCartFromSession(): void {
  const savedCart = sessionStorage.getItem('cartProducts');
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart) as any[];
    // Reconstruimos los objetos CartItem con Product
    this.cartProducts = parsedCart.map(item => {
      const product = new Product(
        item.product.id,
        item.product.nombre,
        item.product.descripcion,
        item.product.precio
      );
      product.cantidad = item.cantidad; // mantener la cantidad
      return new CartItem(product);
    });
  }
}

// Método para cambiar de sección
showSection(section: string): void {
  this.currentSection = section;
}

// Método para manejar la búsqueda de productos
onSearch(query: string): void {
  this.filteredProducts = this.productos.filter(product =>
    product.nombre.toLowerCase().includes(query.toLowerCase())
  );
}

// Método para abrir el modal del carrito
openCartModal(content: any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
}

// Método para abrir el diálogo del carrito
openCartDialog(content: any): void {
  this.modalRef = this.modalService.open(content, { centered: true });
}

// Método para cerrar el diálogo del carrito
closeCartDialog(): void {
  if (this.modalRef) {
    this.modalRef.close();
  }
}
}
