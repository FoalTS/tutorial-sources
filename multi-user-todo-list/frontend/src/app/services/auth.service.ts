import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    return true;
  }

  logout(): void {
    // localStorage.setItem('isAuthenticated', false);
    this.router.navigate(['login']);
  }
}
