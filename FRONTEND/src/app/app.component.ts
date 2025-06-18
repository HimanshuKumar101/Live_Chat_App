import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',   // This is the root component of the Angular application
  imports: [RouterOutlet],  // Importing RouterOutlet to enable routing in the application
  templateUrl: './app.component.html',   // The HTML template for this component
  styleUrls: ['./app.component.css']  // The CSS styles for this component
})
export class AppComponent {
  title = 'FRONTEND';
}
