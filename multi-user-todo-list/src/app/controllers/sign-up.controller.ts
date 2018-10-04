// 3p
import { Context, emailSchema, HttpResponseRedirect, Post, ValidateBody } from '@foal/core';
import { isCommon } from '@foal/password';
import { getRepository } from 'typeorm';

// App
import { User } from '../entities';

export class SignUpController {

  @Post('/signup')
  @ValidateBody(emailSchema)
  async signup(ctx: Context) {
    console.log('hello world');
    // Check that the password is not too common.
    if (isCommon(ctx.request.body.password)) {
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
    user.password = ctx.request.body.password;
    await getRepository(User).save(user);

    // Log the user in.
    ctx.request.session.authentication = ctx.request.session.authentication || {};
    ctx.request.session.authentication.id = user.id;

    // Redirect the user to its to-do list.
    return new HttpResponseRedirect('/');
  }

}
