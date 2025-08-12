import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, NgModule, Signal, signal, WritableSignal } from '@angular/core';
import { ListProducts } from "../../components/list-products/list-products";
import { Subscription } from 'rxjs';
import { ProductService } from '../../shared/services/productService';
import { Product} from '../../shared/models/product';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  imports: [ListProducts, FormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class ProductPage {
  public products:  Product[];
  private subscription = new Subscription();
  private productService = inject(ProductService);
  private router = inject(Router);
  public searchTerm = '';
  filteredProducts: Product[] = [];
  
   ngOnInit(): void {
     this.subscription = this.productService.Products().subscribe(
       {
         next: (products) => {
           this.products = products;
           this.filteredProducts = products;
           console.log(this.products);
         }

         , error: (err) => {
           Swal.fire('ooh!', err.message, 'error');
         }
       });
   }

   ngOnDestroy(){
    this.subscription.unsubscribe();
   }

   onSearch(): void {
    console.log('hola')
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  onNewProduct(): void {
    this.router.navigate(['products/create']);
  }

}
