// std
import { ok, strictEqual } from 'assert';

// 3p
import { createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { SignupController } from './signup.controller';

describe('SignupController', () => {

  let controller: SignupController;

  beforeEach(() => controller = createController(SignupController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(SignupController, 'foo'), 'GET');
      strictEqual(getPath(SignupController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      ok(isHttpResponseOK(controller.foo()));
    });

  });

});
