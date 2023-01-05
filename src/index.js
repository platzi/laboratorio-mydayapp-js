import "./css/base.css";

import { sayHello } from "./js/utils";
import { newItem } from "./js/newItem";

let newTodo = document.querySelector(".new-todo");
export let todoList = [];
// const inputList = document.querySelectorAll('.toggle')
// console.log(inputList)

newTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter")
    newItem(newTodo.value);
});
