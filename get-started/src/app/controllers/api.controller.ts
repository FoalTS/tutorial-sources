import {
  Context,
  Delete,
  Get,
  HttpResponseCreated,
  HttpResponseNoContent,
  HttpResponseNotFound,
  HttpResponseOK,
  Post
} from '@foal/core';
import { getRepository } from 'typeorm';

import { Todo } from '../entities';

export class ApiController {

  @Get('/api/todos')
  async getTodos() {
    const todos = await getRepository(Todo).find();
    return new HttpResponseOK(todos);
  }

  @Post('/api/todos')
  async postTodo(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;

    await getRepository(Todo).save(todo);

    return new HttpResponseCreated(todo);
  }

  @Delete('/api/todos/:id')
  async deleteTodo(ctx: Context) {
    const todo = await getRepository(Todo).findOne({ id: ctx.request.params.id });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await getRepository(Todo).remove(todo);
    return new HttpResponseNoContent();
  }

}
