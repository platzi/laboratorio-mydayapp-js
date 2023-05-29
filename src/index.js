/* eslint-disable prettier/prettier */
import "./css/base.css";

import { sayHello } from "./js/utils";

console.log(sayHello("Hello"));

const inputAddTodo = document.querySelector('.new-todo')
const todoList = document.querySelector('.todo-list')

console.log(inputAddTodo)

inputAddTodo.addEventListener('keydown', function(e) {
  const todoText = e.target.value.trim()

  if (e.key === 'Enter' && todoText.length > 0) {
    const listItem = document.createElement('li');

    listItem.innerHTML =
      `<div class="view">
        <input class="toggle" type="checkbox">
        <label>${todoText}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${todoText}>`

    todoList.appendChild(listItem);
    inputAddTodo.value = ''
  }
});