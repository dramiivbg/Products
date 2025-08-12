import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/productService';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.scss'
})
export class UpdateProduct implements OnInit{

  private productService = inject(ProductService);
  private router = inject(Router);
  private fb =  inject(FormBuilder);
  productForm: FormGroup;
  private subscription = new Subscription();

  ngOnInit(): void {
    const product:Product = history.state.product;
    console.log(product)
    this.productForm = this.fb.group({
      id: [product.id, [Validators.required, Validators.min(1)]],
      name: [product.name, [Validators.required, Validators.maxLength(50)]],
      price: [product.price, [Validators.required, Validators.min(0)]],
      stock: [product.stock, [Validators.required, Validators.min(0)]]
    });
  }

  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.subscription = this.productService.UpdateProduct(this.productForm.value).subscribe(
        {
          next: () => {
            this.router.navigate(['/products'], { replaceUrl: true });
            Swal.fire('Ready!', 'Product successfully update.', 'success');
          }

          , error: (err) => {
            Swal.fire('ooh!', err.message, 'error');
          }
        });
    } else {
      console.log('Formulario inválido');
      this.productForm.markAllAsTouched(); // Marca errores
    }
  }

  onBack(){
    this.router.navigate(['/products'], {replaceUrl: true});
  }


}
