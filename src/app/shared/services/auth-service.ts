import { HttpClient } from '@angular/common/http';
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

  async check_auth(): Promise<void> {
    firstValueFrom(this.http.get(`${environment.apiAuth}/check-auth`)).catch((error) => {
      console.error('error check-auth =>', error);
      this.login("Ivan", "123456789");
    });
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
    }
  }

}
