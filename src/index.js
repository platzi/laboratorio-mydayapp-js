import "./css/base.css";

import { sayHello } from "./js/utils";
import { newItem } from "./js/newItem";
import { navegation } from "./js/navegationBtn";

const localArrTodo = JSON.parse(localStorage.getItem("mydayapp-js"));
window.addEventListener('DOMContentLoaded', newItem(localArrTodo, false))

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
      localStorage.setItem('mydayapp-js', JSON.stringify(todoList));
      const localArrTodo = JSON.parse(localStorage.getItem("mydayapp-js"));

      console.log('localArr2', localArrTodo);
      newItem(localArrTodo);
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
