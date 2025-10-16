import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { addToCart, removeFromCart } from '../../store/accionescompras';
import { CartState } from '../../store/itemsreducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-app.html',
  styleUrls: ['./cart-app.css'],
})
export class CartAppComponent {

  productos: Product[] = [];
  cart$: Observable<CartState>; // Observable del estado global
  private modalRef: NgbModalRef | undefined;

  showCart: boolean = true;
  currentSection: string = 'home';
  filteredProducts: Product[] = [];

  constructor(
    private service: ProductService,
    private modalService: NgbModal,
    private store: Store<{ items: CartState }>
  ) {
    this.productos = this.service.findAll();
    this.filteredProducts = this.productos;
    this.cart$ = this.store.select('items'); // Suscripción al estado global del carrito
  }

  // Agregar producto al carrito usando Redux
  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product }));
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      text: `${product.nombre} se ha añadido al carrito.`,
      timer: 2000,
      showConfirmButton: false
    });
  }

  // Eliminar producto usando Redux
  removeFromCart(productId: number) {
    this.store.dispatch(removeFromCart({ id: productId }));
    Swal.fire({
      icon: 'info',
      title: 'Producto eliminado',
      text: `Producto eliminado del carrito.`,
      timer: 2000,
      showConfirmButton: false
    });
  }

  // Cambiar sección
  showSection(section: string): void {
    this.currentSection = section;
  }

  // Búsqueda de productos
  onSearch(query: string): void {
    this.filteredProducts = this.productos.filter(product =>
      product.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Abrir modal del carrito
  openCartModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openCartDialog(content: any): void {
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  closeCartDialog(): void {
    if (this.modalRef) this.modalRef.close();
  }

}
