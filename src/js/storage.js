async function fetch(localStorageKey) {
  let todos = localStorage.getItem(localStorageKey);
  if(todos !== null) {
    return JSON.parse(todos);
  }
  localStorage.setItem(localStorageKey, "[]");
  return [];
}

async function add(localStorageKey, todo) {
  let todos = localStorage.getItem(localStorageKey);
  todos = JSON.parse(todos);
  todos.push(todo);
  localStorage.setItem(localStorageKey, JSON.stringify(todos));
}

async function remove(localStorageKey, todoid) {
  let todos = localStorage.getItem(localStorageKey);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id == todoid);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }
}

async function toggleComplete(localStorageKey, todoid) {
  let todos = localStorage.getItem(localStorageKey);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id === todoid);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }
}

async function edit(localStorageKey, todoid, text) {
  let todos = localStorage.getItem(localStorageKey);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id === todoid);
  if (todoIndex !== -1) {
    todos[todoIndex].title = text;
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }
}

export { fetch, add, edit, toggleComplete, remove};
