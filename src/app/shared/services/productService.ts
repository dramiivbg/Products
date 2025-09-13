import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { catchError, firstValueFrom, map, Observable, pipe, shareReplay, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  
   public async Products(): Promise<Product[]> {
    try {
      return await firstValueFrom(
        this.http.get<Product[]>(environment.api)
      );
    } catch (err) {
      console.error('error de productos =>', err);
      throw new Error('Error al obtener productos');
    }
  }

  public async CreateProduct(product: Product): Promise<Product> {
    try {
      return await firstValueFrom(
        this.http.post<Product>(environment.api, product)
      );
    } catch (err) {
      console.error(err);
      throw new Error('Error al crear el producto');
    }
  }

  public async UpdateProduct(product: Product): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.put(environment.api, product)
      );
    } catch (err) {
      console.error(err);
      throw new Error('Error al actualizar el producto');
    }
  }

  public async DeleteProduct(product: Product): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.delete(environment.api + '/' + product.id)
      );
    } catch (err) {
      console.error(err);
      throw new Error('Error al eliminar el producto');
    }
  }
  
}
