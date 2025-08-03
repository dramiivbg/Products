import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/productService';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  onSubmit(): void {
    if (this.productForm.valid) {
      try {
        this.productService.UpdateProduct(this.productForm.value);
        this.router.navigate(['/products'], {replaceUrl: true});
        Swal.fire('Ready!', 'Product successfully update.', 'success');
      } catch (error) {
        Swal.fire('ooh!', error.message, 'error');
      }
    } else {
      console.log('Formulario inválido');
      this.productForm.markAllAsTouched(); // Marca errores
    }
  }

  onBack(){
    this.router.navigate(['/products'], {replaceUrl: true});
  }


}
