// std
import { ok, strictEqual } from 'assert';

// 3p
import { createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { SignUpController } from './sign-up.controller';

describe('SignUpController', () => {

  let controller: SignUpController;

  beforeEach(() => controller = createController(SignUpController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(SignUpController, 'foo'), 'GET');
      strictEqual(getPath(SignUpController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      ok(isHttpResponseOK(controller.foo()));
    });

  });

});
