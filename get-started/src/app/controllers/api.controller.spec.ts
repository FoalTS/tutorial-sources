// std
import { ok, strictEqual } from 'assert';

// 3p
import { createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { ApiController } from './api.controller';

describe('ApiController', () => {

  let controller: ApiController;

  beforeEach(() => controller = createController(ApiController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(ApiController, 'foo'), 'GET');
      strictEqual(getPath(ApiController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      ok(isHttpResponseOK(controller.foo()));
    });

  });

});
