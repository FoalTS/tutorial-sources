import { Authenticate, controller } from '@foal/core';

import { ApiController, AuthController, SignUpController, ViewController } from './controllers';
import { User } from './entities';

@Authenticate(User)
export class AppController {
  subControllers = [
    controller('/', ViewController),
    controller('/', ApiController),
    controller('/', AuthController),
    controller('/', SignUpController),
  ];
}
