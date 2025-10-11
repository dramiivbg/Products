import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../shared/services/productService';
import { AuthService } from '../../../shared/services/auth-service';
import { Product } from '../../../shared/models/product';
import Swal from 'sweetalert2';
import { ListProductsUser } from '../../../components/list-products-user/list-products-user';

@Component({
  selector: 'app-product',
  imports: [ListProductsUser, FormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class ProductUserPage {
  public products:  Product[];
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public searchTerm = '';
  filteredProducts: Product[] = [];

    async ngOnInit(){
      this.getProducts();
     }
  
     onSearch(): void {
      console.log('hola')
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(term)
      );
    }
  
    getProducts(): void {
      this.productService.Products().then(products => {
        this.products = products;
        this.filteredProducts = products; 
      }).catch(err => {
        Swal.fire('ooh!', err.message, 'error');
      });
    }

}
