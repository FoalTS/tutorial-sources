// 3p
import {
  Context, dependency, emailSchema, Get, HttpResponseRedirect,
  logIn, logOut, Post, ValidateBody
} from '@foal/core';

// App
import { Authenticator } from '../services';

export class AuthController {
  @dependency
  authenticator: Authenticator;

  @Post('/login')
  @ValidateBody({
    additionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
    },
    required: ['email', 'password'],
    type: 'object',
  })
  async login(ctx: Context) {
    const user = await this.authenticator.authenticate(ctx.request.body);

    if (!user) {
      return new HttpResponseRedirect('/signin?bad_credentials=true');
    }

    logIn(ctx, user);

    return new HttpResponseRedirect('/');
  }

  @Get('/logout')
  logout(ctx) {
    logOut(ctx);
    return new HttpResponseRedirect('/signin');
  }
}
