import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { TokenService } from './token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenSvc = inject(TokenService);
  const token = tokenSvc.get();
  console.log(token)
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
