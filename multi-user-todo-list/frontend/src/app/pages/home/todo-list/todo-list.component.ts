import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo, NewTodo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];

  @Output() addNewTodo = new EventEmitter<NewTodo>();
  @Output() deleteTodo = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  onAddNewTodo(text: string) {
    this.addNewTodo.emit({ text });
  }

  onDeleteTodo(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

}
