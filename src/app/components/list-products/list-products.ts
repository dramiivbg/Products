import { Component, inject, input, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/productService';
import Swal from 'sweetalert2';
import { Product } from '../../shared/models/product';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-list-products',
  imports: [],
  templateUrl: './list-products.html',
  styleUrl: './list-products.scss'
})
export class ListProducts implements OnInit{

  public products = input.required<Product[]>();
  private router = inject(Router);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  ngOnInit(): void {
    console.log(this.products())
  }

  EditProduct(product:Product){
     this.router.navigate(['/products/update'], {
       state: {
        product
       }
     });
  }

  DeleteProduct(product:Product, index:number){
    Swal.fire({
      title: '¿Are you sure?',
      text: '¡This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'yes, Delete',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.authService.check_auth();
          this.productService.DeleteProduct(product);
          this.products().splice(index, 1);
          Swal.fire('Ready!', 'Product successfully eliminated.', 'success');
        } catch (error) {
          Swal.fire('ooh!', error.message, 'error');
        }
      }
    });
  }



}
