import "./css/base.css";

async function fetchTodos(API) {
  let todos = localStorage.getItem(API);
  if(todos !== null) {
    return JSON.parse(todos);
  }
  localStorage.setItem(API, '[]');
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
    todos[todoIndex].completed = !todos[todoIndex].completed
    localStorage.setItem(API, JSON.stringify(todos));
  }
}

async function main() {
  let todos = await fetchTodos(API);
}

const API = 'mydayapp-js';

main();