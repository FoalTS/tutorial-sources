// 3p
import {
  Context, Get, HttpResponseRedirect,
  logIn, logOut, Post, ValidateBody, verifyPassword
} from '@foal/core';
import { getRepository } from 'typeorm';

import { User } from '../entities';

export class AuthController {

  @Post('/login')
  // Validate the request body.
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
    const user = await getRepository(User).findOne({ email: ctx.request.body.email });

    if (!user) {
      // Redirect the user to /signin if the authentication fails.
      return new HttpResponseRedirect('/signin?bad_credentials=true');
    }

    if (!await verifyPassword(ctx.request.body.password, user.password)) {
      // Redirect the user to /signin if the authentication fails.
      return new HttpResponseRedirect('/signin?bad_credentials=true');
    }

    // Add the user to the current session.
    logIn(ctx, user);

    // Redirect the user to the home page on success.
    return new HttpResponseRedirect('/');
  }

  @Get('/logout')
  logout(ctx) {
    // Remove the user from the session.
    logOut(ctx);

    // Redirect the user to the signin page.
    return new HttpResponseRedirect('/signin');
  }
}
