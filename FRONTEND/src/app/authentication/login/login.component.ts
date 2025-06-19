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
  email = '';
  password = '';

  private router = inject(Router);
  private userService = inject(UserService); 

  login() {
    if (this.email && this.password) {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      this.userService.login(credentials).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          this.router.navigate(['/chatDashboard']);
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login failed. Please check your credentials.');
        },
      });
    }
  }
}
