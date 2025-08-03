import { Routes } from '@angular/router';
import { ProductPage } from './pages/Product/product';
import { CreateProduct } from './components/create-product/create-product';
import { UpdateProduct } from './components/update-product/update-product';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductPage,
    },
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
    },
    {
        path: 'products/create',
        component: CreateProduct
    },
    {
        path: 'products/update',
        component: UpdateProduct
    }
];
