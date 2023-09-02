export const TODOS = JSON.parse(localStorage.getItem("mydayapp-js")) || [];

export const getTodo = (id) => {
  return TODOS.find(TODO => TODO.id == id);
}

export const addTodo = (text) => {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false
  }
  TODOS.push(newTodo)
  localStorage.setItem("mydayapp-js", JSON.stringify(TODOS))
  return newTodo;
}

export const updateTodo = (id, data) => {
  const todoIndex = TODOS.findIndex(TODO => TODO.id == id);
  TODOS[todoIndex] = {
    ...TODOS[todoIndex],
    ...data
  };
  localStorage.setItem("mydayapp-js", JSON.stringify(TODOS))
  return TODOS[todoIndex];
}

export const deleteTodo = (id) => {
  const todoIndex = TODOS.findIndex(TODO => TODO.id == id);
  const deletedTodo = TODOS.splice(todoIndex, 1);
  localStorage.setItem("mydayapp-js", JSON.stringify(TODOS))
  return deletedTodo;
}