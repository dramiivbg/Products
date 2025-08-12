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
  
  public Products(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      shareReplay(1) // guarda la última respuesta y la comparte
      , catchError(err => {
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  public CreateProduct(product:Product){
    return this.http.post<Product>(this.url, product, {}).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al crear el producto'));
      })
    );
  }

  public UpdateProduct(product:Product){
    return this.http.put(this.url, product).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al actualizar el producto'));
      })
    );
  }

  public DeleteProduct(product:Product){
    return this.http.delete(this.url + '/'+ product.id).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al eliminar el producto'));
      })
    );
  }
  
}
