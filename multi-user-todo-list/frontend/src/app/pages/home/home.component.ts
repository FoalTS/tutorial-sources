import { Component, OnInit } from '@angular/core';

import { TodoService } from 'src/app/services/todo.service';
import { Todo, NewTodo } from 'src/app/models/todo';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public todos: Todo[] = [];
  public error: HttpErrorResponse = null;

  constructor(private todoService: TodoService) { }

  async ngOnInit() {
    this.error = null;
    try {
      this.todos = await this.todoService.getAll();
    } catch (error) {
      this.error = error;
    }
  }

  async addNewTodo(newTodo: NewTodo) {
    this.error = null;
    try {
      const todo = await this.todoService.save(newTodo);
      this.todos.push(todo);
    } catch (error) {
      this.error = error;
    }
  }

  async deleteTodo(todo: Todo) {
    this.error = null;
    try {
      await this.todoService.delete(todo);
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    } catch (error) {
      this.error = error;
    }
  }
}
