// 3p
import { emailSchema, LoginController, strategy } from '@foal/core';

// App
import { Authenticator } from '../services';

export class AuthController extends LoginController {
  strategies = [
    strategy('login', Authenticator, emailSchema)
  ];

  redirect = {
    failure: '/signin?bad_credentials=true',
    logout: '/signin',
    success: '/',
  };
}
