import { Component, inject, OnInit } from '@angular/core';
import { TokenService } from '../../shared/services/token-service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../shared/models/jwt-payload';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit{

  private tokenSvc = inject(TokenService);
  private router = inject(Router);
  isLoggedIn = false;
  userProfile: { name: string} | null = null;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenSvc.get();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      const token = this.tokenSvc.get();
      const decoded = jwtDecode<JwtPayload>(token);
      this.userProfile = { name: decoded.sub || 'Usuario' };
    } else {
      this.userProfile = null;
    }

}

onLogout(): void {
    this.tokenSvc.clear();
    this.router.navigate(['/login']);
  }

}
