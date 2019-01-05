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
  // Create a new connection to the database.
  const connection = await createConnection();

  // Create a new task with the text given in the command line.
  const todo = new Todo();
  todo.text = args.text;

  // Save the task in the database and then display it in the console.
  console.log(
    await connection.manager.save(todo)
  );

  // Close the connection to the database.
  await connection.close();
}
