function fetch(localStorageKey) {
  let todos = localStorage.getItem(localStorageKey);
  if(todos !== null) {
    return JSON.parse(todos);
  }
  localStorage.setItem(localStorageKey, "[]");
  return [];
}

function add(localStorageKey, todo) {
  let todos = localStorage.getItem(localStorageKey);
  todos = JSON.parse(todos);
  todos.push(todo);
  localStorage.setItem(localStorageKey, JSON.stringify(todos));
  window.dispatchEvent(new Event('storage'));
}

function remove(localStorageKey, todoid) {
  let todos = localStorage.getItem(localStorageKey);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id === todoid);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
    window.dispatchEvent(new Event('storage'));
  }
}

function toggleComplete(localStorageKey, todoid) {
  let todos = localStorage.getItem(localStorageKey);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id === todoid);
  if (todoIndex !== -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
    window.dispatchEvent(new Event('storage'));
  }
}

function edit(localStorageKey, todoid, text) {
  let todos = localStorage.getItem(localStorageKey);
  todos = JSON.parse(todos);
  let todoIndex = todos.findIndex((todo)=>todo.id === todoid);
  if (todoIndex !== -1) {
    todos[todoIndex].title = text;
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
    window.dispatchEvent(new Event('storage'));
  }
}

export { fetch, add, edit, toggleComplete, remove};
