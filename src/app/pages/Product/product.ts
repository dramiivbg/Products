import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, NgModule, Signal, signal, WritableSignal } from '@angular/core';
import { ListProducts } from "../../components/list-products/list-products";
import { Subscription } from 'rxjs';
import { ProductService } from '../../shared/services/productService';
import { Product} from '../../shared/models/product';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-product',
  imports: [ListProducts, FormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class ProductPage {
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

  onNewProduct(): void {
    this.router.navigate(['products/create']);
  }

}
