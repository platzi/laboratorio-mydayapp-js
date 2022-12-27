import { v4 as uuid } from "uuid";

class Todo {
  constructor(title) {
    this.id = uuid();
    this.title = title;
    this.completed = false;
  }
}

class TodosApp {
  lsKey = "mydayapp-js";

  constructor() {
    this.loadData();
  }

  loadData() {
    if (!localStorage.getItem(this.lsKey)) {
      localStorage.setItem(this.lsKey, JSON.stringify([]));
    }

    const data = JSON.parse(localStorage.getItem(this.lsKey));

    this.todos = data;
  }

  newTodo(task) {
    const todo = new Todo(task);
    this.todos.push(todo);

    this.updateStorage();

    return todo;
  }

  updateTodo(id, title) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });

    this.updateStorage();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this.updateStorage();
  }

  markAsComplete(id) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    this.updateStorage();
  }

  filterTodos(hash) {
    let todos = null;

    switch (hash) {
      case "#/":
        todos = this.todos;
        break;

      case "#/pending":
        todos = this.todos.filter((todo) => !todo.completed);
        break;

      case "#/completed":
        todos = this.todos.filter((todo) => todo.completed);
        break;

      default:
        todos = this.todos;
        break;
    }

    return todos;
  }

  clearCompeted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(this.lsKey, JSON.stringify(this.todos));
  }
}

export default TodosApp;
