import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  async signup(newUser: NewUser): Promise<void> {
    const { token } = await this.http.post<{ token: 'string' }>('/signup', newUser).toPromise();
    localStorage.setItem('token', token);
  }

  async login(credentials: NewUser): Promise<void> {
    const { token } = await this.http.post<{ token: 'string' }>(`/api/authenticate`, credentials).toPromise();
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
