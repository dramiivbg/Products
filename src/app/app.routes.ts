import { Routes } from '@angular/router';
import { ProductPage } from './pages/Product/product';
import { CreateProduct } from './components/create-product/create-product';
import { UpdateProduct } from './components/update-product/update-product';
import { authGuard } from './guards/auth-guard';
import { LoginPage } from './pages/login/login';
import { ProductUserPage } from './pages/users/product/product';
import { RegisterPage } from './pages/register/register';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductPage,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },
     {
        path: 'productsUser',
        component: ProductUserPage,
        canActivate: [authGuard],
        data: { roles: ['ROLE_USER'] }
    },
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginPage,
    },
     {
        path: 'register',
        component: RegisterPage,
     },
    {
        path: 'products/create',
        component: CreateProduct,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },
    {
        path: 'products/update',
        component: UpdateProduct,
        canActivate: [authGuard],
        data: { roles: ['ROLE_ADMIN'] }
    }
];
