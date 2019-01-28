import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async submit() {
    this.error = false;
    try {
      await this.authService.login({ email: this.email, password: this.password });
      this.router.navigate(['']);
    } catch (error) {
      this.error = true;
    }
  }

}
