import { controller, Get, LoginRequired, render } from '@foal/core';
import { fetchUser } from '@foal/typeorm';

import { ApiController, AuthController, SignupController } from './controllers';
import { User } from './entities';

export class AppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/auth', AuthController),
    controller('/signup', SignupController)
  ];

  @Get('/')
  @LoginRequired({ redirect: '/signin', user: fetchUser(User) })
  index() {
    return render('./controllers/templates/index.html', {}, __dirname);
  }

  @Get('/signin')
  signin() {
    return render('./controllers/templates/signin.html', {}, __dirname);
  }

  @Get('/signup')
  signup() {
    return render('./controllers/templates/signup.html', {}, __dirname);
  }
}
