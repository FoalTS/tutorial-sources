import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  emailAlreadyTaken = false;
  emailRequired = false;
  passwordRequired = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async submit() {
    if (!this.email) {
      this.emailRequired = true;
      return;
    }
    if (!this.password) {
      this.passwordRequired = true;
      return;
    }

    // Reset errors.
    this.emailRequired = false;
    this.passwordRequired = false;
    this.emailAlreadyTaken = false;

    try {
      await this.authService.signup({ email: this.email, password: this.password });
      this.router.navigate(['']);
    } catch (error) {
      this.emailAlreadyTaken = error.error === 'email_already_taken';
      this.password = '';
    }
  }

}
