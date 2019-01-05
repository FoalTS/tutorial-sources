import { controller } from '@foal/core';

import { ApiController, ViewController } from './controllers';

export class AppController {
  subControllers = [
    controller('/', ViewController),
    controller('/api', ApiController)
  ];
}
