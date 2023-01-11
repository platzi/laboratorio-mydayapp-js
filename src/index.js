import "./css/base.css";

import { sayHello } from "./js/utils";
import { newItem } from "./js/newItem";
import { navegation } from "./js/navegationBtn";


const localArrTodo = JSON.parse(localStorage.getItem("mydayapp-js"));
export let todoList = localArrTodo || [];
window.addEventListener('DOMContentLoaded', () => {
  if (todoList) {
    newItem(todoList, false)
    console.log('lenght', todoList);
  }
})

let newTodo = document.querySelector(".new-todo");
const clearCompleteBtn = document.querySelector(".clear-completed");
const ul = document.querySelector(".todo-list");


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
        visible: true,
      });
      localStorage.setItem('mydayapp-js', JSON.stringify(todoList));
      const localArrTodo = JSON.parse(localStorage.getItem("mydayapp-js"));

      console.log('todolist', todoList);
      newItem(todoList);
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
  const completedList = todoList.filter(element => element.completed === false)
  todoList = completedList
  localStorage.setItem('mydayapp-js', JSON.stringify(todoList));
  newItem(todoList);


})
window.addEventListener("hashchange", navegation)
