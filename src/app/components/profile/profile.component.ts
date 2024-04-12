import { Component, inject } from '@angular/core';
import { UserService } from '@services/user.service';
import { TodosComponent } from '../todos/todos.component';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    TodosComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  us = inject(UserService);
}
