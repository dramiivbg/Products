import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenSvc = inject(TokenService);
  //console.log(req)
  debugger
  const token = tokenSvc.get();
  console.log(token)
  if (token && !req.url.includes('login')) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
