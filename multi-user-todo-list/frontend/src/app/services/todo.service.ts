import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewTodo, Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  async getAll(): Promise<Todo[]> {
    return this.http.get<Todo[]>('/api/todos').toPromise();
  }

  async save(todo: NewTodo): Promise<Todo> {
    return this.http.post<Todo>('/api/todos', todo).toPromise();
  }

  async delete(todo: Todo): Promise<void> {
    return this.http.delete<void>(`/api/todos/${todo.id}`).toPromise();
  }

}
