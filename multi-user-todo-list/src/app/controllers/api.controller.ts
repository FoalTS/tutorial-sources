import {
  Context, Delete, Get, HttpResponseCreated, HttpResponseNoContent,
  HttpResponseNotFound, HttpResponseOK, LoginRequired, Post, ValidateBody, ValidateParams
} from '@foal/core';
import { fetchUser } from '@foal/typeorm';
import { getRepository } from 'typeorm';

import { Todo, User } from '../entities';

@LoginRequired({ user: fetchUser(User) })
export class ApiController {

  @Get('/todos')
  async getTodos(ctx: Context) {
    const todos = await getRepository(Todo).find({ owner: ctx.user });
    return new HttpResponseOK(todos);
  }

  @Post('/todos')
  @ValidateBody({
    // The body request should be an object once parsed by the framework.
    type: 'object',
    properties: {
      // The "text" property of ctx.request.body should be a string if it exists.
      text: { type: 'string' }
    },
    // The property "text" is required.
    required: [ 'text' ],
    // Every additional properties that are not defined in the "properties"
    // object should be removed.
    additionalProperties: false,
  })
  async postTodo(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;
    // Make the current user the owner of the todo.
    todo.owner = ctx.user as User;
​
    await getRepository(Todo).save(todo);
​
    return new HttpResponseCreated(todo);
  }

  @Delete('/todos/:id')
  @ValidateParams({
    properties: {
      // The id should be a number. If it is not (the request.params object
      // always has string properties) the hook tries to convert it to a number
      // before returning a "400 - Bad Request".
      id: { type: 'number' }
    },
    type: 'object',
  })
  async deleteTodo(ctx: Context) {
    const todo = await getRepository(Todo).findOne({
      id: ctx.request.params.id,
      // Do not return the todo if it does not belong to the current user.
      owner: ctx.user
    });
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await getRepository(Todo).remove(todo);
    return new HttpResponseNoContent();
  }

}
