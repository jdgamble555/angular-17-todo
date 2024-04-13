import { Component } from '@angular/core';
import { TodoItem, TodosService } from '@services/todos.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { AsyncPipe, CommonModule } from '@angular/common';

// https://github.com/angular/angular/issues/18877

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    TodoItemComponent,
    TodoFormComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  constructor(public ts: TodosService) { }

  identify(_index: number, item: TodoItem) {
    return item.id;
  }
}
