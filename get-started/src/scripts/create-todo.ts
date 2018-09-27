// 3p
import { createConnection, getRepository } from 'typeorm';

// App
import { Todo } from '../app/entities';

export const schema = {
  additionalProperties: false,
  properties: {
    text: { type: 'string' }
  },
  required: [ 'text' ],
  type: 'object',
};

export async function main(args) {
  await createConnection();

  const todo = new Todo();
  todo.text = args.text;

  console.log(
    await getRepository(Todo).save(todo)
  );
}
