import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { catchError, map, Observable, pipe, shareReplay, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  
  public Products(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api).pipe(
      shareReplay(1) // guarda la última respuesta y la comparte
      , catchError(err => {
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  public CreateProduct(product:Product){
    return this.http.post<Product>(environment.api, product, {}).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al crear el producto'));
      })
    );
  }

  public UpdateProduct(product:Product){
    return this.http.put(environment.api, product).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al actualizar el producto'));
      })
    );
  }

  public DeleteProduct(product:Product){
    return this.http.delete(environment.api + '/'+ product.id).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('Error al eliminar el producto'));
      })
    );
  }
  
}
