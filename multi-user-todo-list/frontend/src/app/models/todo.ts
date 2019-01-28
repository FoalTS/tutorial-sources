export interface NewTodo {
  text: string;
}

export interface Todo {
  id: number;
  text: string;
}

export interface ServerError {
  method: string;
  url: string;
  status: string;
  statusText: string;
}
