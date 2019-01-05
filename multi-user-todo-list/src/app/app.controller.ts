import { controller } from '@foal/core';

import { ApiController, AuthController, SignupController, ViewController } from './controllers';

export class AppController {
  subControllers = [
    controller('/', ViewController),
    controller('/api', ApiController),
    controller('/auth', AuthController),
    controller('/signup', SignupController)
  ];
}
