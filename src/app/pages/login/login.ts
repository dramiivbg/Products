import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../shared/models/jwt-payload';
import { TokenService } from '../../shared/services/token-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginPage {
    username = '';
  password = '';
  error: string | null = null;
  private auth = inject(AuthService);
  private router = inject(Router);
  private tokenSvc = inject(TokenService);

    onSubmit() {
    this.error = null;
    this.auth.login(this.username, this.password )
      .then(() => {
        const token = this.tokenSvc.get();
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded?.roles?.includes('ROLE_ADMIN')) {
          this.router.navigate(['/products']);
        } else {
          this.router.navigate(['/productsUser']);
        }
      }

      ).catch(err => {
        this.error = 'Usuario o contraseña incorrectos';
        console.error(err);
      });
  }

}
