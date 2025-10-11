import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../shared/services/token-service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../shared/models/jwt-payload';
import { ProductService } from '../shared/services/productService';
import { AuthService } from '../shared/services/auth-service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const tokenSvc = inject(TokenService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const expectedRoles = route.data['roles'] as string[];

  const token = tokenSvc.get();
  console.log(token)
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
 try {
    const decoded = jwtDecode<JwtPayload>(token);
    authService.check_auth().catch(async (error) => {
     console.error('error check-auth =>', error);
     tokenSvc.clear();
     await router.navigate(['/login']);
     return false;
   });

   // Verifica roles
   const userRoles = decoded.roles || [];
   const hasRole = expectedRoles.some(role => userRoles.includes(role));

   if (!hasRole) {
     return false;
   }


   return true;
 } catch (error) {
  router.navigate(['/login']);
  return false;
 }
};
