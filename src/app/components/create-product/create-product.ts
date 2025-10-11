import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/productService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.scss'
})
export class CreateProduct {
  private productService = inject(ProductService);
  private router = inject(Router);
  private authService = inject(AuthService);
  productForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [0, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }


  async onSubmit(){
    if (this.productForm.valid) {
      this.productService.CreateProduct(this.productForm.value).then(() => {
        this.router.navigate(['/products'], { replaceUrl: true });
        Swal.fire('Ready!', 'Product successfully created.', 'success');
      }).catch((err) => {
        Swal.fire('ooh!', err.message, 'error');
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
