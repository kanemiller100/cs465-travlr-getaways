import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formError = '';
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onLoginSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required';
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (result) => {
        this.authService.saveToken(result.token);
        this.router.navigate(['/trips']);
      },
      error: () => {
        this.formError = 'Login failed';
      }
    });
  }
}
