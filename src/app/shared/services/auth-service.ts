import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TokenService } from './token-service';
import Swal from 'sweetalert2';
interface JwtResponse { token: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private tokenSvc = inject(TokenService);

  async check_auth() {
    return firstValueFrom(this.http.get(`${environment.apiAuth}/check-auth`));
  }

  async register(username: string, password: string): Promise<void> {
    // Define el valor de tu clientId
    const clientIdValue = 'angular-client'; // <-- Reemplaza con el valor real

    // Crea las cabeceras, añadiendo 'X-CLIENT-ID'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Opcional, pero buena práctica
      'X-CLIENT-ID': clientIdValue,       // <-- ESTO ES LO IMPORTANTE
    });
    try {
      const res = await firstValueFrom(
        this.http.post<JwtResponse>(`${environment.apiAuth}/register`, {
          username,
          password,
        },
          { headers } // <-- Pasa las cabeceras aquí)
        )
      );
    } catch (error) {
      throw error;
    }
  }



  async login(username: string, password: string): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http.post<JwtResponse>(`${environment.apiAuth}/login`, {
          username,
          password,
        })
      );
      console.log('success login =>', res.token);
      this.tokenSvc.set(res.token);
    } catch (err) {
      console.error('error login =>', err);
      throw err;
    }
  }

}
