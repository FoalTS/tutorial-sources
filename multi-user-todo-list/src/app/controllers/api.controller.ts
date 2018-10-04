import {
  Context,
  Delete,
  Get,
  HttpResponseCreated,
  HttpResponseNoContent,
  HttpResponseNotFound,
  HttpResponseOK,
  LoginRequired,
  Post,
  ValidateBody,
  ValidateParams
} from '@foal/core';
import { getRepository } from 'typeorm';

import { Todo, User } from '../entities';

@LoginRequired()
export class ApiController {

  @Get('/api/todos')
  async getTodos(ctx: Context) {
    const todos = await getRepository(Todo).find({ owner: ctx.user });
    return new HttpResponseOK(todos);
  }

  @Post('/api/todos')
  @ValidateBody({
    additionalProperties: false,
    properties: {
      text: { type: 'string' }
    },
    required: [ 'text' ],
    type: 'object',
  })
  async postTodo(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    todo.owner = ctx.user as User;

    await getRepository(Todo).save(todo);

    return new HttpResponseCreated(todo);
  }

  @Delete('/api/todos/:id')
  @ValidateParams({
    properties: {
      id: { type: 'number' }
    },
    type: 'object',
  })
  async deleteTodo(ctx: Context) {
    const todo = await getRepository(Todo).findOne({
      id: ctx.request.params.id,
      owner: ctx.user
    });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await getRepository(Todo).remove(todo);
    return new HttpResponseNoContent();
  }

}
