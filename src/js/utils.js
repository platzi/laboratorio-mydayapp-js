async function fetchTodos(API) {
  let todos = await localStorage.getItem(API);
  if(todos !== null) {
    return JSON.parse(todos);
  }
  await localStorage.setItem(API, '[]');
  return [];
}

async function addTodo(API, todo) {
  let todos = localStorage.getItem(API);
  todos = JSON.parse(todos);
  todos.push(todo);
  localStorage.setItem(API, JSON.stringify(todos));
}

async function deleteTodo(API, todoid) {
  let todos = localStorage.getItem(API);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id == todoid);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem(API, JSON.stringify(todos));
  }
}

async function toggleCompleteTodo(API, todoid) {
  let todos = localStorage.getItem(API);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id === todoid);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem(API, JSON.stringify(todos));
  }
}

async function editTodo(API, todoid, text) {
  let todos = localStorage.getItem(API);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id === todoid);
  if (todoIndex !== -1) {
    todos[todoIndex].title = text;
    localStorage.setItem(API, JSON.stringify(todos));
  }
}

export { fetchTodos, addTodo, editTodo, toggleCompleteTodo, deleteTodo };
