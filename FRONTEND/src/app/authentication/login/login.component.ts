import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  emaill = '';
  password = '';

  private router = inject(Router);
  private userService = inject(UserService);

  login() {
    if (this.emaill && this.password) {
      const credentials = {
        email: this.emaill,
        password: this.password,
      };

      this.userService.login(credentials).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          localStorage.setItem('token', res.token);
          this.userService.setLoggedIn(true);
          this.router.navigate(['/main']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please check your credentials.');
        },
      });
    }
  }
}
