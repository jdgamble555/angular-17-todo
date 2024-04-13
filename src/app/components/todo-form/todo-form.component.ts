import { Component } from '@angular/core';
import { TodosService } from '@services/todos.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [],
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  constructor(public ts: TodosService) { }
}
