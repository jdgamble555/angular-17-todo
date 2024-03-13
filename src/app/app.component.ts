import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ProfileComponent, 
    RouterModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent { }
