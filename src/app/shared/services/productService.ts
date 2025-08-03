import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { catchError, map, Observable, pipe, shareReplay, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly url: string = 'http://localhost:8081/sistema/api/v1/productos';
  private readonly http = inject(HttpClient);
  private products$: Observable<Product[]> | null = null;

  public Products(): Observable<Product[]> {
    this.products$ = this.http.get<Product[]>(this.url).pipe(
      shareReplay(1) // guarda la última respuesta y la comparte
      , catchError(err => {
        console.error('Error cargando productos:', err);
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
    return this.products$;
  }

  public CreateProduct(product:Product): void{
    this.http.post<Product>(this.url, product, {}).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al crear el producto'));
      })
    ).subscribe({
      next: (createdProduct) => {
        console.log('Producto creado correctamente:', createdProduct);
        // hacer algo con el producto creado
      }
    });
  }

  public UpdateProduct(product:Product): void{
    this.http.put(this.url, product).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al actualizar el producto'));
      })
    ).subscribe({
      next: (createdProduct) => {
        console.log('Producto actualizado correctamente:', createdProduct);
        // hacer algo con el producto creado
      }
    });
  }

  public DeleteProduct(product:Product): void{
    this.http.delete(this.url + '/'+ product.id).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al eliminar el producto'));
      })
    ).subscribe({
      next: (createdProduct) => {
        console.log('Producto eliminado correctamente:', createdProduct);
        // hacer algo con el producto creado
      }
    });
  }
  
}
