import { Get, LoginRequired, render } from '@foal/core';

export class ViewController {

  @Get('/')
  @LoginRequired({ redirect: '/signin' })
  index(ctx) {
    return render('./templates/index.html', {
      csrfToken: ctx.request.csrfToken(),
    }, __dirname);
  }

  @Get('/signin')
  signin(ctx) {
    return render('./templates/signin.html', {
      csrfToken: ctx.request.csrfToken(),
    }, __dirname);
  }

  @Get('/signup')
  signup(ctx) {
    return render('./templates/signup.html', {
      csrfToken: ctx.request.csrfToken(),
    }, __dirname);
  }

}
