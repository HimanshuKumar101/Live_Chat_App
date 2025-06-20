import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  redirectToChatDashboard() {
    this.router.navigate(['/chatDashboard']);
  }

  redirectToUser() {
    this.router.navigate(['/user']);
  }
}

//yaha redirect karna ha /chatdashboard
//yaha redirect karna ha /user
