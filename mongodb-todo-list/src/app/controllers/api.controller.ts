import {
  Context, Delete, Get, HttpResponseCreated, HttpResponseNoContent,
  HttpResponseNotFound, HttpResponseOK, Post,
  ValidateBody, ValidateParams
} from '@foal/core';

import { Todo } from '../models';

export class ApiController {

  @Get('/todos')
  async getTodos() {
    const todos = await Todo.find();
    return new HttpResponseOK(todos);
  }

  @Post('/todos')
  @ValidateBody({
    // The body request should be an object once parsed by the framework.
    // Every additional properties that are not defined in the "properties"
    // object should be removed.
    additionalProperties: false,
    properties: {
      // The "text" property of ctx.request.body should be a string if it exists.
      text: { type: 'string' }
    },
    // The property "text" is required.
    required: [ 'text' ],
    type: 'object',
  })
  async postTodo(ctx: Context) {
    const todo = new Todo();
    todo.text = ctx.request.body.text;

    await todo.save();

    return new HttpResponseCreated(todo);
  }

  @Delete('/todos/:id')
  @ValidateParams({
    properties: {
      id: { type: 'string' }
    },
    type: 'object',
  })
  async deleteTodo(ctx: Context) {
    const todo = await Todo.findById(ctx.request.params.id);
    if (!todo) {
      return new HttpResponseNotFound();
    }
    await Todo.findByIdAndDelete(ctx.request.params.id);
    return new HttpResponseNoContent();
  }

}
