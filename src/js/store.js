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