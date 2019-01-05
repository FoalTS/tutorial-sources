// 3p
import { Context, HttpResponseRedirect, logIn, Post, ValidateBody } from '@foal/core';
import { isCommon } from '@foal/password';
import { getRepository } from 'typeorm';

// App
import { User } from '../entities';

export class SignupController {

  @Post()
  @ValidateBody({
    additionalProperties: false,
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    },
    required: [ 'email', 'password' ],
    type: 'object',
  })
  async signup(ctx: Context) {
    // Check that the password is not too common.
    if (await isCommon(ctx.request.body.password)) {
      return new HttpResponseRedirect('/signup?password_too_common=true');
    }

    // Check that no user has already signed up with this email.
    let user = await getRepository(User).findOne({ email: ctx.request.body.email });
    if (user) {
      return new HttpResponseRedirect('/signup?email_already_taken=true');
    }

    // Create the user.
    user = new User();
    user.email = ctx.request.body.email;
    await user.setPassword(ctx.request.body.password);
    await getRepository(User).save(user);

    // Log the user in.
    logIn(ctx, user);

    // Redirect the user to her/his to-do list.
    return new HttpResponseRedirect('/');
  }

}
