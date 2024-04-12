import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '@services/user.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProfileComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  us = inject(UserService);
}
