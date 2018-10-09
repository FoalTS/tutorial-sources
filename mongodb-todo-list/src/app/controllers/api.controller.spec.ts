// std
import { ok, strictEqual } from 'assert';

// 3p
import { createController, getHttpMethod, getPath, HttpResponseOK, isHttpResponseOK } from '@foal/core';
import { Connection, createConnection } from 'typeorm';

// App
import { Todo } from '../entities';
import { ApiController } from './api.controller';

describe('ApiController', () => {

  let controller: ApiController;
  let connection: Connection;

  before(async () => connection = await createConnection({
    database: './test_db.sqlite3',
    dropSchema: true,
    entities: [ Todo ],
    synchronize: true,
    type: 'sqlite',
  }));

  after(() => connection.close());

  beforeEach(() => controller = createController(ApiController));

  describe('has a "getTodos" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(ApiController, 'getTodos'), 'GET');
      strictEqual(getPath(ApiController, 'getTodos'), '/todos');
    });

    it('should return an HttpResponseOK.', async () => {
      const todo1 = new Todo();
      todo1.text = 'Todo 1';

      const todo2 = new Todo();
      todo2.text = 'Todo 2';

      await connection.manager.save([ todo1, todo2 ]);

      const response = await controller.getTodos();
      ok(isHttpResponseOK(response), 'response should be an instance of HttpResponseOK.');

      const body = (response as HttpResponseOK).body;

      ok(Array.isArray(body), 'The body of the response should be an array.');
      strictEqual(body[0].text, 'Todo 1');
      strictEqual(body[1].text, 'Todo 2');
    });

  });

});
