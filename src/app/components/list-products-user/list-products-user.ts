import { Component, inject, input } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Router } from 'express';
import { ProductService } from '../../shared/services/productService';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'app-list-products-user',
  imports: [],
  templateUrl: './list-products-user.html',
  styleUrl: './list-products-user.scss'
})
export class ListProductsUser {
  
  public products = input.required<Product[]>();

}
