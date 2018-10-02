import { Config, Get, render } from '@foal/core';

export class ViewController {

  @Get('/')
  index(ctx) {
    return render('./templates/index.html', {
      csrfToken: ctx.request.csrfToken(),
    }, __dirname);
  }

}
