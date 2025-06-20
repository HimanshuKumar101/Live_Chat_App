import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root', // This is the root component of the Angular application
  standalone: true, // ✅ this is required
  imports: [RouterOutlet, HeaderComponent, CommonModule], // Importing RouterOutlet to enable routing in the application
  templateUrl: './app.component.html', // The HTML template for this component
  styleUrls: ['./app.component.css'], // The CSS styles for this component
})
export class AppComponent {
  title = 'FRONTEND';
  is_header_show = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e);

        if (e.url === '/') {
          this.is_header_show = false;
        } else {
          this.is_header_show = true;
        }
      }
    });
  }
}
