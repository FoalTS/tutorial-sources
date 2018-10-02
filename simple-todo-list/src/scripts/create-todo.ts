// 3p
import { createConnection } from 'typeorm';

// App
import { Todo } from '../app/entities';

export const schema = {
  properties: {
    text: { type: 'string' }
  },
  required: [ 'text' ],
  type: 'object',
};

export async function main(args) {
  const connection = await createConnection();

  const todo = new Todo();
  todo.text = args.text;

  console.log(
    await connection.manager.save(todo)
  );

  await connection.close();
}
