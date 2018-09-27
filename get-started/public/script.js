const app = new Vue({
  el: '#app',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        text: 'Donald Duck'
      }
    ],
    error: null
  },
  methods: {
    addNewTodo: function () {
      if (!this.newTodoText) {
        return;
      }
      this.todos.push({
        text: this.newTodoText,
        id: Math.random()
      });
      this.newTodoText = '';
    },
    deleteTodo: function (todo) {
      this.todos = this.todos.filter(td => td.id !== todo.id);
    }
  }
});

fetch('/todos')
  .then(response => {
    if (response.status >= 400) {
      app.error = {
        status: response.status,
        statusText: response.statusText,
        request: {
          method: 'GET',
          url: response.url
        }
      }
      return;
    }
    app.error = null;
  });