import "./css/base.css";

import { sayHello } from "./js/utils";
import { newItem } from "./js/newItem";
import { navegation } from "./js/navegationBtn";

let newTodo = document.querySelector(".new-todo");
const clearCompleteBtn = document.querySelector(".clear-completed");
const ul = document.querySelector(".todo-list");


export let todoList = [];
export let completedTodos = [];
export let pendingTodos = [];
// const inputList = document.querySelectorAll('.toggle')
// console.log(inputList)

newTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    if (newTodo.value != 0) {
      todoList.push({
        tarea: newTodo.value,
        completed: false,
      });
      newItem(todoList)
    } else {
      alert("Write something")
    }
  }

});

//navegacion por Hash
if (todoList.length === 0) {
  location.hash = "#/"
}
clearCompleteBtn.addEventListener("click", () => {
  todoList.filter(item => {
    if (item.completed == true) {
      todoList.splice(todoList.indexOf(item), 1)
    }
    newItem(todoList)
  })
})
window.addEventListener("hashchange", navegation)
