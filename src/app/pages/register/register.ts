import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterPage {
  username = '';
  password = '';
  error: string | null = null;
  private auth = inject(AuthService);
  private router = inject(Router);


  onSubmit() {
    this.error = null;
    this.auth.register(this.username, this.password)
      .then(() => {
        this.router.navigate(['/login']);
      }

      ).catch(err => {
        this.error = err.error || 'Error al registrar el usuario';
        console.error(err);
      });
  }

}
