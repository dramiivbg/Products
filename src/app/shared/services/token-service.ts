import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  set(value: string | null): void {
    if (!this.isBrowser) return;
    if (value) localStorage.setItem('token', value);
    else localStorage.removeItem('token');
  }

  clear(): void {
    this.set(null);
  }
  
}
