import { doc } from "prettier";


export const selectors = {
  clearCompleted: document.querySelector('.clear-completed'),
  newTodo: document.querySelector('.new-todo'),
  todoList: document.querySelector('.todo-list'),
  footer: document.querySelector('.footer'),
  main: document.querySelector('.main'),
  todoCount: document.querySelector('.todo-count'),
  filters: document.querySelector('.filters'),
}

export const todoArray = JSON.parse(localStorage.getItem('mydayapp-js'));;

