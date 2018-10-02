import { Config, Get, render } from '@foal/core';

export class ViewController {

  @Get('/')
  index(ctx) {
    return render('./templates/index.html', {
      appName: Config.get('app', 'name'),
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
