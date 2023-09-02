export const TODOS = [
  // {
  //   id,
  //   text: "Example Task",
  //   completed: false
  // }
];

export const addTodo = (text) => {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false
  }
  TODOS.push(newTodo)
  return newTodo;
}

export const updateTodo = (id, data) => {
  const todoIndex = TODOS.findIndex(TODO => TODO.id == id);
  TODOS[todoIndex] = {
    ...TODOS[todoIndex],
    ...data
  };
  return TODOS[todoIndex];
}