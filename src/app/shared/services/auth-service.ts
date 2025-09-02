import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TokenService } from './token-service';
interface JwtResponse { token: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private readonly http = inject(HttpClient);
  private tokenSvc = inject(TokenService);

  login(username: string, password: string) {
    return this.http.post<JwtResponse>(`${environment.apiAuth}/login`, { username, password })
      .pipe(tap(res => this.tokenSvc.set(res.token)));
  }

  // Si quieres exponer lectura del token:
  getToken(): string | null {
    return this.tokenSvc.get();
  }
  
}
