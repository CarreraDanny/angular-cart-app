export class Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number; 
    cantidad: number;
    constructor(id: number, nombre: string, descripcion: string, precio: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio; 
        this.cantidad = 1;
    }
}
