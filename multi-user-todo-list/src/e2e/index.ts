// std
import { ok } from 'assert';

// 3p
import { createApp, Group, Permission } from '@foal/core';
import * as request from 'supertest';
import { createConnection, getConnection } from 'typeorm';

// App
import { AppController } from '../app/app.controller';
import { Todo, User } from '../app/entities';

describe('The server', () => {

  let app;

  before(async () => {
    await createConnection({
      database: 'e2e_db.sqlite3',
      dropSchema: true,
      entities: [User, Permission, Group, Todo],
      synchronize: true,
      type: 'sqlite',
    });
    app = createApp(AppController);
  });

  after(() => getConnection().close());

  describe('on GET /api/todos requests', () => {

    it('should return a 401 status if the user did not signed in.', () => {
      return request(app)
        .get('/api/todos')
        .expect(401);
    });

    it('should return a 200 status if the user did signed in.', async () => {
      const user = new User();
      user.email = 'john@foalts.org';
      await user.setPassword('john_password');
      await getConnection().manager.save(user);

      let cookie = '';
      await request(app)
        .post('/login')
        .send({ email: 'john@foalts.org', password: 'john_password' })
        .expect(302)
        .then(data => {
          ok(Array.isArray(data.header['set-cookie']));
          cookie = data.header['set-cookie'][0];
        });

      return request(app)
        .get('/api/todos')
        .set('Cookie', cookie)
        .expect(200);
    });

  });

});
