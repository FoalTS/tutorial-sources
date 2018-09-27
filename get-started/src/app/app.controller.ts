import { Authenticate, controller } from '@foal/core';

import { ApiController, ViewController } from './controllers';
import { User } from './entities';

@Authenticate(User)
export class AppController {
  subControllers = [
    controller('/', ViewController),
    controller('/', ApiController)
  ];
}
