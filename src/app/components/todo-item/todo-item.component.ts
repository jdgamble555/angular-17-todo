import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TodoItem, TodosService } from '@services/todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {

  @Input() todo!: TodoItem;

  constructor(public ts: TodosService) { }

}
