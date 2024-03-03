import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  us = inject(UserService);
}
